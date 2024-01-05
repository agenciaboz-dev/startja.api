import express, { Express, Request, Response } from "express"
import databaseHandler from "../databaseHandler"
import { getIoInstance } from "../io/socket"
const router = express.Router()

router.post("/nfe/webhook", async (request: Request, response: Response) => {
    const data: NfeWebhook = request.body
    const io = getIoInstance()
    console.log(data)

    try {
        let invoice = await databaseHandler.nota.updateStatus(Number(data.ref), data.status, data.mensagem_sefaz)

        if (data.status == "autorizado") {
            invoice = await databaseHandler.nota.authorizedUpdate(data)
        }

        io.emit("nota:update", invoice)
    } catch (e) {
        console.log(e)
    }

    response.status(200)
})

export default router
