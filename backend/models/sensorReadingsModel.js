import mongoose from "mongoose"

const sensorReadingsSchema = new mongoose.Schema({
    temperature: {
        type: Number,
        required: true
    },
    humidity: {
        type: Number,
        required: true
    },
    timestamp: {
        type: Number,
        required: true
    }
}, { timestamps: true })

const SensorReading = mongoose.model('SensorReadings', sensorReadingsSchema)

export default SensorReading