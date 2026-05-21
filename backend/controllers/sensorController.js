/**
 * Sensor controller.
 *
 * Handles incoming HTTP requests for retrieving
 * sensor readings stored in MongoDB.
 *
 * @author Isak Thörnqvist
 * @version 1.0.0
 */

import SensorReading from "../models/sensorReadingsModel.js"

/**
 * Controller class for sensor reading operations.
 */
export class SensorController {

    /**
     * Retrieves the 50 most recent sensor readings from the database,
     * sorted by creation date in descending order.
     *
     * @param {import('express').Request} req - Express request object.
     * @param {import('express').Response} res - Express response object.
     * @param {import('express').NextFunction} next - Express next middleware function.
     * @returns {Promise<void>} JSON array of sensor readings.
     */
    async getReadings(req, res, next) {
        try {
            const readings = await SensorReading.find()
                .sort({ createdAt: -1 })
                .limit(50)
            
            res.json(readings)
        } catch (error) {
            next(error)
        }
    }
}