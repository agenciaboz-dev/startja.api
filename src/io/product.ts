import { Socket } from "socket.io"
import { NewProduct } from "../definitions/userOperations"
import databaseHandler from "../databaseHandler"
import { getIoInstance } from "./socket"

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
        socket.emit("product:creation:error", { error })
    }
}

export default { productList, productCreate }
