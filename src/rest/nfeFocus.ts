import express, { Express, Request, Response } from "express"
import databaseHandler from "../databaseHandler"
import { getIoInstance } from "../io/socket"
import https from "https"

const router = express.Router()

router.post("/nfe/webhook", async (request: Request, response: Response) => {
    const data: NfeWebhook = request.body
    const io = getIoInstance()
    console.log(data)

    try {
        let invoice = await databaseHandler.nota.updateStatus(Number(data.ref), data.status, data.mensagem_sefaz)

        if (data.status == "autorizado") {
            invoice = await databaseHandler.nota.authorizedUpdate(data)

            databaseHandler.property.advanceNfeNumber(invoice.propriedade_id, data.numero).then(async (property) => {
                const user = await databaseHandler.user.get(property.user_id)
                io.emit("user:update", user)
            })
        }

        io.emit("nota:update", invoice)
    } catch (e) {
        console.log(e)
    }

    response.status(200)
    response.send()
})

router.get("/xml", async (request: Request, response: Response) => {
    const data = request.body
    if (typeof request.query.url !== "string") {
        return response.status(400).send("Invalid URL parameter")
    }

    const url = new URL(`https://homologacao.focusnfe.com.br/${request.query.url}`)
    https
        .get(url, (xml_response) => {
            console.log()
            response.setHeader("Content-Disposition", "attachment; filename=teste.xml")
            response.setHeader("Content-Type", "application/xml")

            xml_response.pipe(response)
        })
        .on("error", (err) => {
            console.error("Error:", err)
            response.status(500).send("Failed to fetch the XML file")
        })
})

export default router
