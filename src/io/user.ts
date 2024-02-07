import { Socket } from "socket.io";
import { LoginForm } from "../definitions/userOperations";
import databaseHandler from "../databaseHandler";
import { Customer } from "@prisma/client"

const handleLogin = async (socket: Socket, data: LoginForm) => {
    const admin = await databaseHandler.user.loginAdmin(data)

    if (admin) {
        // Successfully logged in as an admin
        socket.emit("admin:login:success", admin)
    } else {
        // Admin login failed, try customer login
        const customer = await databaseHandler.user.loginCustomer(data)

        if (customer) {
            // Successfully logged in as a customer
            socket.emit("user:login:success", customer)
        } else {
            // Both login attempts failed
            socket.emit("user:login:failed", { error: "Credenciais inválidas." })
        }
    }
}

const list = async (socket: Socket) => {
    try {
        const { admin, customer } = await databaseHandler.user.list()
        socket.emit("user:list", { admin, customer })
    } catch (error) {
        console.error(`Error fetching user list`)
        socket.emit("user:list:error", { error })
    }
}

const update = async (socket: Socket, id: number, data: Partial<Customer>) => {
    console.log(data)
    try {
        const user = await databaseHandler.user.update(id, data)
        socket.emit("user:update:success")
        socket.emit("user:update", user)
    } catch (error) {
        console.log(error)
        socket.emit("user:update:error", error?.toString())
    }
}

export default { handleLogin, list, update }
