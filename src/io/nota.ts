import { Socket } from "socket.io";
import { NewNota } from "../definitions/userOperations";
import databaseHandler from "../databaseHandler";
import { getIoInstance } from "./socket";
import focusNFe from "../api/focusNFe"

const notaList = async (socket: Socket) => {
    try {
        const nota = await databaseHandler.nota.list()
        socket.emit("nota:list:success", nota)
    } catch (error) {
        console.error("Error retrieving nota list", error)
        socket.emit("nota:list:error")
    }
}

const notaCreate = async (socket: Socket, data: FocusNFeInvoiceForm, emitente_id: number) => {
    console.log(data)
    try {
        const invoice = await databaseHandler.nota.create(data, emitente_id)
        const focus_data = focusNFe.buildInvoice(data)
        const invoice_response = await focusNFe.emitInvoice(focus_data, invoice.id.toString())
        console.log(invoice_response.data)
        socket.emit("nota:create:response", invoice_response.data)

        await databaseHandler.nota.updateStatus(invoice.id, invoice_response.data.status)
    } catch (error) {
        console.log(error)
        socket.emit("nota:create:error", error)
    }
}

export default {
  notaCreate,
  notaList,
};
