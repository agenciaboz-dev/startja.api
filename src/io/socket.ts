import { Socket } from "socket.io";
import { Server as SocketIoServer } from "socket.io";
import { Server as HttpServer } from "http";
import { Server as HttpsServer } from "https";
import nota from "./nota";
import user from "./user";
import customer from "./customer";
import product from "./product";
import company from "./company";
import nature from "./nature";
import property from "./property";
import rule from "./rule";
import {
  LoginForm,
  NewCompany,
  NewNature,
  NewNota,
  NewProduct,
  NewProperty,
  NewRule,
  NewUser,
} from "../definitions/userOperations";
import focusNFe from "../api/focusNFe"
import { AxiosError } from "axios"

let io: SocketIoServer | null = null

export const initializeIoServer = (server: HttpServer | HttpsServer) => {
    io = new SocketIoServer(server, {
        cors: { origin: "*" },
        maxHttpBufferSize: 1e8
    })
}

export const getIoInstance = () => {
    if (!io) {
        throw new Error("Socket.IO has not been initialized. Please call initializeIoServer first.")
    }
    return io
}

export const handleSocket = (socket: Socket) => {
    console.log(`new connection: ${socket.id}`)

    socket.on("disconnect", () => {
        console.log(`disconnected: ${socket.id}`)
    })

    socket.on("user:login", (data: LoginForm) => user.handleLogin(socket, data))
    socket.on("user:list:all", () => user.list(socket))

    socket.on("product:list", () => product.productList(socket))
    socket.on("product:create", (data: NewProduct) => product.productCreate(socket, data))
    socket.on("product:update", (data: NewProduct, id: number) => product.update(socket, data, id))

    socket.on("user:list", () => customer.list(socket))
    socket.on("user:signup", (data: NewUser) => customer.handleSignup(socket, data))

    socket.on("company:list", () => company.companyList(socket))
    socket.on("company:create", (data: NewCompany) => company.companyCreate(socket, data))

    socket.on("nature:list", () => nature.natureList(socket))
    socket.on("nature:create", (data: NewNature) => nature.natureCreate(socket, data))

    socket.on("rule:list", () => rule.ruleList(socket))
    socket.on("rule:create", (data: NewRule) => rule.ruleCreate(socket, data))

    socket.on("property:list", () => property.propertyList(socket))
    socket.on("property:create", (data: NewProperty) => property.propertyCreate(socket, data))
    socket.on("property:update", (data: NewProperty, id: number) => property.update(socket, data, id))

    socket.on("nota:create", (data: { nota: FocusNFeInvoiceForm; emitente_id: number; destinatario_id: number; propriedade_id: number }) =>
        nota.notaCreate(socket, data.nota, data.emitente_id, data.destinatario_id, data.propriedade_id)
    )
    socket.on("nota:list", () => nota.notaList(socket))

    socket.on("focus:signup", async (data) => {
        console.log(data)
        try {
            const response = await focusNFe.signCustomer(data)
            console.log(response)
            socket.emit("focus:signup", response)
        } catch (e) {
            console.log(e)
            if (e instanceof AxiosError) {
                console.log(e.response?.data)
                socket.emit("focus:signup:error", e.response?.data)
            }
        }
    })
}
