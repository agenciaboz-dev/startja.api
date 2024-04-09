import { Socket } from "socket.io";
import { NatureForm } from "../definitions/userOperations"
import databaseHandler from "../databaseHandler"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const natureList = async (socket: Socket) => {
    try {
        const natures = await databaseHandler.nature.list()
        console.log(natures)
        socket.emit("nature:list", natures) // manda só a lista
    } catch (error) {
        console.error(error)
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
        socket.emit("nature:create:error", error)
    }
}

const update = async (socket: Socket, id: number, data: NatureForm) => {
    try {
        const natureza = await databaseHandler.nature.update(id, data)
        socket.emit("nature:update:success", natureza)
        socket.broadcast.emit("nature:update", natureza)
    } catch (error) {
        socket.emit("nature:update:error", error?.toString())
        console.error("Error updating nature:", error)
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

const userToggle = async (socket: Socket, nature_id: number, user_id: number) => {
    try {
        const nature = await prisma.natureza.findUnique({ where: { id: nature_id } })
        if (nature) {
            const hidden_list = nature.hidden_by.split(",")
            let updated
            if (hidden_list.includes(user_id.toString())) {
                const new_list = hidden_list.filter((id) => id != user_id.toString())
                updated = await prisma.natureza.update({
                    where: { id: nature_id },
                    data: { hidden_by: new_list.join(",") },
                    include: databaseHandler.nature.include,
                })
            } else {
                hidden_list.push(user_id.toString())
                updated = await prisma.natureza.update({
                    where: { id: nature_id },
                    data: { hidden_by: hidden_list.join(",") },
                    include: databaseHandler.nature.include,
                })
            }

            socket.emit("nature:usertoggle", updated)
        }
    } catch (error) {
        console.log(error)
        socket.emit("nature:usertoggle:error", error)
    }
}

export default { natureCreate, natureList, toggle, update, userToggle }
