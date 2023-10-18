import { PrismaClient } from "@prisma/client";
import { Socket } from "socket.io";

const prisma = new PrismaClient()

const login = async (socket: Socket, data: LoginForm) => {

    // toda a lógica de login
    const user = await prisma.user.findFirst({ where: { id: 1 } }) // arrumar
    
    if (user) {
        socket.emit('user:login:success', user)
    } else {
        socket.emit('user:login:failed')
    }
}

export default {login}