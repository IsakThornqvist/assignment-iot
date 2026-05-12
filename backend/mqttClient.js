import SensorReading from "./models/sensorReadingsModel"
import mqtt from 'mqtt' 
import dotenv from 'dotenv'

dotenv.config()

const mqttBroker = process.env.MQTT_BROKER
const mqttUsername = process.env.MQTT_USERNAME
const mqttPassword = process.env.MQTT_PASSWORD

const SENSOR_TOPIC = 'lnu/iot/it222hp/sensor'
const COMMAND_TOPIC = 'lnu/iot/it222hp/command/led'

let client

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

export function publishCommand(state) {
    const payload = JSON.stringify({ state: state })
    client.publish(COMMAND_TOPIC, payload)
    console.log(`Published LED command: ${payload}`)
}

export default connectMqttBroker