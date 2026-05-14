import SensorReading from "../models/sensorReadingsModel.js"


export class SensorController {


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