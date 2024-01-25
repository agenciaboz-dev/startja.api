import { Socket } from "socket.io";
import { NewNota } from "../definitions/userOperations";
import databaseHandler from "../databaseHandler";
import { getIoInstance } from "./socket";
import focusNFe from "../api/focusNFe"
import { PrismaClientUnknownRequestError } from "@prisma/client/runtime/library"
import { AxiosError } from "axios"
import user from "../databaseHandler/user"

const notaList = async (socket: Socket) => {
    try {
        const nota = await databaseHandler.nota.list()
        socket.emit("nota:list:success", nota)
    } catch (error) {
        console.error("Error retrieving nota list", error)
        socket.emit("nota:list:error")
    }
}

const notaCreate = async (
    socket: Socket,
    data: FocusNFeInvoiceForm,
    emitente_id: number,
    destinatario_id: number,
    propriedade_id: number,
    nature_id: number
) => {
    console.log(data)
    try {
        const invoice = await databaseHandler.nota.create(data, emitente_id, destinatario_id, propriedade_id, nature_id)
        const focus_data = focusNFe.buildInvoice(data)
        const invoice_response = await focusNFe.emitInvoice(focus_data, invoice.id.toString())
        console.log(invoice_response.data)
        socket.emit("nota:create:response", invoice_response.data)

        await databaseHandler.nota.updateStatus(invoice.id, invoice_response.data.status)
        const customer = await user.get(invoice.emitente_id)
        socket.emit("user:update", customer)
    } catch (error) {
        console.log(error)
        if (error instanceof PrismaClientUnknownRequestError) {
            socket.emit("nota:create:error", "erro criando nota no banco de dados, verifique o log da api")
            return
        }

        if (error instanceof AxiosError) {
            socket.emit("nota:create:error", error.response?.data.mensagem || "erro sei que la da focusnfe, verifique log da api")
            if (error.response?.data.erros) {
                console.log(error.response?.data.erros)
            }
            return
        }

        socket.emit("nota:create:error", "erro sei que la")
    }
}

export default {
  notaCreate,
  notaList,
};
