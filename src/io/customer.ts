import { PrismaClient } from "@prisma/client"
import { Socket } from "socket.io"

const prisma = new PrismaClient()

const signup = async (socket: Socket, data: CustomerSignupForm) => {
    // const customer = await prisma.customer.create({
    //     data: {
    //         name: data.name,
    //         email: data.email,
    //         register_date: new Date().getTime()
    // }})
}

export default { signup }