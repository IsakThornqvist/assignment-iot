import { publishCommand } from "../mqttClient.js"

export class LedController {


async sendLedCommand(req, res, next) {
    try {
        const state = req.body.state
        publishCommand(state)
            res.json( { success: true })
    } catch (error) {
        next(error)
    }
}


}