import { Socket } from "socket.io"
import { NewCompany } from "../definitions/userOperations"
import databaseHandler from "../databaseHandler"
import { getIoInstance } from "./socket"

const companyList = async (socket: Socket) => {
    try {
        const company = await databaseHandler.company.list()
        socket.emit("company:list", company)
    } catch (error) {
        console.error(`Error fetching company list`)
        socket.emit("company:list:error", { error })
    }
}

const companyCreate = async (socket: Socket, data: NewCompany) => {
    try {
        const company = await databaseHandler.company.create(data)
        socket.broadcast.emit("company:new", company)
        socket.emit("company:creation:success", company)
        const user = await databaseHandler.user.get(company.customerId)
        const io = getIoInstance()
        io.emit("user:update", user)
        console.log(user)
    } catch (error) {
        console.error(`Error creating company`, error)
        socket.emit("company:creation:error", { error })
    }
}

const update = async (socket: Socket, data: NewCompany, id: number) => {
    try {
        const company = await databaseHandler.company.update(data, id)
        socket.emit("company:creation:success", company)
        const user = await databaseHandler.user.get(company.customerId)
        const io = getIoInstance()
        io.emit("user:update", user)
        console.log(user)
    } catch (error) {
        console.error(`Error creating company`, error)
        socket.emit("company:creation:error", { error })
    }
}

export default { companyCreate, companyList, update }
