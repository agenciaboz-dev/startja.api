import express, { Express, Request, Response } from "express"
import nfeFocus from "./src/rest/nfeFocus"

export const router = express.Router()

router.use("/nfefocus", nfeFocus)
