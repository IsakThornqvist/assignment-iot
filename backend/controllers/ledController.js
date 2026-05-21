/**
 * LED controller.
 *
 * Handles incoming HTTP requests for controlling
 * the LED on the simulated Wokwi device via MQTT.
 *
 * @author Isak Thörnqvist
 * @version 1.0.0
 */

import { publishCommand } from "../mqttClient.js"

/**
 * Controller class for LED device commands.
 */
export class LedController {

    /**
     * Sends an LED toggle command to the Wokwi device via MQTT.
     *
     * @param {import('express').Request} req - Express request object. Expects `state` (boolean) in the request body.
     * @param {import('express').Response} res - Express response object.
     * @param {import('express').NextFunction} next - Express next middleware function.
     */
    async sendLedCommand(req, res, next) {
        try {
            const state = req.body.state
            publishCommand(state)
            res.json({ success: true })
        } catch (error) {
            next(error)
        }
    }
}