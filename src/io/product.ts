import { Socket } from "socket.io"
import { NewProduct } from "../definitions/userOperations"
import databaseHandler from "../databaseHandler"
import { getIoInstance } from "./socket"
import { Prisma } from "@prisma/client"

const prismaError = (error: unknown) => {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // The .code property can be accessed in a type-safe manner
        if (error.code === "P2002") {
            if (error.meta?.target == "Product_codigo_externo_key") {
                return { error: "já existe um produto cadastrado com esse código." }
            }
        }
    }
}

const productList = async (socket: Socket) => {
    try {
        const product = await databaseHandler.product.list()
        socket.emit("product:list", product)
    } catch (error) {
        console.error(`Error fetching product list`)
        socket.emit("product:list:error", { error })
    }
}

const productCreate = async (socket: Socket, data: NewProduct) => {
    try {
        const product = await databaseHandler.product.create(data)
        socket.emit("product:creation:successful", product)

        const io = getIoInstance()
        io.emit("product:new", product)
    } catch (error) {
        console.error(`Error creating product`, error)
        const error_message = prismaError(error)
        socket.emit("product:creation:error", { error: error_message || error?.toString() })
    }
}

const update = async (socket: Socket, data: NewProduct, id: number) => {
    try {
        const product = await databaseHandler.product.update(data, id)
        socket.emit("product:update:successful", product)

        const io = getIoInstance()
        io.emit("product:new", product)
    } catch (error) {
        console.error(`Error updating the product`, error)
        const error_message = prismaError(error)
        socket.emit("product:update:error", { error: error_message || error?.toString() })
    }
}

export default { productList, productCreate, update }
