/**
 * MQTT client.
 *
 * Manages the connection to the HiveMQ broker, subscribes to
 * incoming sensor data, persists readings to MongoDB, and
 * publishes LED commands back to the Wokwi device.
 *
 * @author Isak Thörnqvist
 * @version 1.0.0
 */

import SensorReading from "./models/sensorReadingsModel.js"
import mqtt from 'mqtt'
import dotenv from 'dotenv'

dotenv.config()

const mqttBroker = process.env.MQTT_BROKER
const mqttUsername = process.env.MQTT_USERNAME
const mqttPassword = process.env.MQTT_PASSWORD

/** MQTT topic for incoming sensor data from the Wokwi device. */
const SENSOR_TOPIC = 'lnu/iot/it222hp/sensor'

/** MQTT topic for outgoing LED commands to the Wokwi device. */
const COMMAND_TOPIC = 'lnu/iot/it222hp/command/led'

/** Shared MQTT client instance used across connect and publish functions. */
let client

/**
 * Connects to the HiveMQ MQTT broker and sets up event listeners
 * for incoming sensor data. Saves each valid reading to MongoDB.
 */
function connectMqttBroker() {
    const options = {
        username: mqttUsername,
        password: mqttPassword,
        port: 8883,
        protocol: 'mqtts'
    }

    client = mqtt.connect(mqttBroker, options)

    client.on('connect', () => {
        console.log('Connected to MQTT broker')
        client.subscribe(SENSOR_TOPIC, (err) => {
            if (err) {
                console.error('Subscribe error:', err)
            } else {
                console.log(`Subscribed to ${SENSOR_TOPIC}`)
            }
        })
    })

    client.on('message', async (topic, message) => {
        try {
            const payload = JSON.parse(message.toString())
            const reading = new SensorReading({
                temperature: payload.temperature,
                humidity: payload.humidity,
                timestamp: payload.timestamp
            })
            await reading.save()
            console.log('Saved reading:', reading)
        } catch (error) {
            console.error('Error handling message:', error)
        }
    })

    client.on('error', (error) => {
        console.error('MQTT error:', error)
    })
}

/**
 * Publishes an LED command to the Wokwi device via MQTT.
 *
 * @param {boolean} state - true to turn the LED on, false to turn it off.
 */
export function publishCommand(state) {
    const payload = JSON.stringify({ state: state })
    client.publish(COMMAND_TOPIC, payload)
    console.log(`Published LED command: ${payload}`)
}

export default connectMqttBroker