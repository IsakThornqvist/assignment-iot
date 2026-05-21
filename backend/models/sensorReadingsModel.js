/**
 * Sensor reading model.
 *
 * Defines the MongoDB schema and model for storing
 * time-series sensor data received from the Wokwi device.
 *
 * @author Isak Thörnqvist
 * @version 1.0.0
 */

import mongoose from "mongoose"

/**
 * Mongoose schema for a sensor reading.
 * Automatically adds createdAt and updatedAt timestamps.
 */
const sensorReadingsSchema = new mongoose.Schema({
    /**
     * Temperature reading in Celsius from the DHT22 sensor.
     */
    temperature: {
        type: Number,
        required: true
    },
    /**
     * Relative humidity percentage from the DHT22 sensor.
     */
    humidity: {
        type: Number,
        required: true
    },
    /**
     * Unix timestamp in seconds elapsed since device boot,
     * as reported by the Wokwi ESP32.
     */
    timestamp: {
        type: Number,
        required: true
    }
}, { timestamps: true })

/**
 * Mongoose model for sensor readings.
 * Maps to the 'sensorreadings' collection in MongoDB.
 */
const SensorReading = mongoose.model('SensorReadings', sensorReadingsSchema)

export default SensorReading