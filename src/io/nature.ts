import { Socket } from "socket.io";
import { NatureForm } from "../definitions/userOperations"
import databaseHandler from "../databaseHandler"

const natureList = async (socket: Socket) => {
    try {
        const natures = await databaseHandler.nature.list()
        console.log(natures)
        socket.emit("nature:list", natures) // manda só a lista
    } catch (error) {
        console.error(`Error fetching nature list`)
        socket.emit("nature:list:error", { error })
    }
}

const natureCreate = async (socket: Socket, data: NatureForm) => {
    try {
        const natureza = await databaseHandler.nature.create(data)
        socket.emit("nature:creation:success", natureza)
        socket.broadcast.emit("nature:update", natureza)
    } catch (error) {
        console.error("Error creating nature:", error)
        socket.emit("nature:error", error)
    }
}

const toggle = async (socket: Socket, id: number) => {
    try {
        const natureza = await databaseHandler.nature.toggle(id)
        socket.emit("nature:toggle:success", natureza)
        socket.broadcast.emit("nature:update", natureza)
    } catch (error) {
        socket.emit("nature:update:error", error?.toString())
        console.error("Error updating nature:", error)
    }
}

export default { natureCreate, natureList, toggle }
