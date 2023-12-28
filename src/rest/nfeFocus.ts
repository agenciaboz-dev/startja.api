import express, { Express, Request, Response } from "express"
import databaseHandler from "../databaseHandler"
import { getIoInstance } from "../io/socket"
const router = express.Router()

router.post("/nfe/webhook", async (request: Request, response: Response) => {
    const data: NfeWebhook = request.body
    const io = getIoInstance()
    console.log(data)

    let invoice = await databaseHandler.nota.updateStatus(Number(data.ref), data.status)

    if (data.status == "autorizado") {
        invoice = await databaseHandler.nota.authorizedUpdate(data)
    }

    io.emit("nota:update", invoice)

    response.status(100)
})

export default router
