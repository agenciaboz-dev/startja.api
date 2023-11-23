import { Socket } from "socket.io"
import { LoginForm } from "../definitions/userOperations"
import databaseHandler from "../databaseHandler"

const handleLogin = async (socket: Socket, data: LoginForm) => {
    const admin = await databaseHandler.user.loginAdmin(data)

    if (admin) {
        socket.emit("admin:login:success", admin)
    } else {
        const customer = await databaseHandler.user.loginCustomer(data)
        if (customer) {
            socket.emit("customer:login:success", customer)
        } else {
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

export default { handleLogin, list }
