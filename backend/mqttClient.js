import SensorReading from "./models/sensorReadingsModel"
import mqtt from 'mqtt' 
import dotenv from 'dotenv'

const mqttBroker = process.env.MQTT_BROKER
const mqttUsername = process.env.MQTT_USERNAME
const mqttPassword = process.env.MQTT_PASSWORD


function connectMqttBroker() {
    const options = {
        username: MQTT_USERNAME,
        password: mqttPassword,
        port: 3050,
        protocol: 'mqtts'

    }
    try {
        mqtt.connect(mqttBroker, options)
    }

}