import { useEffect, useState } from "react"
import type { SensorReading } from "../types/index"
import axios from 'axios'
import mqtt from 'mqtt'



export function useAllSensorData () {
    const [readings, setReadings] = useState<SensorReading[]>([])
    
    const [currentTemperature, setTemperature] = useState<number | null>(null)

    const [currentHumidity, setHumidity] = useState<number | null>(null)


useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/readings`)
            setReadings(response.data.reverse())
        } catch (error) {
            console.error(error)
        }
    }
    fetchData()
}, [])

useEffect(() => {
    const client = mqtt.connect(import.meta.env.VITE_MQTT_BROKER, {
        username: import.meta.env.VITE_MQTT_USERNAME,
        password: import.meta.env.VITE_MQTT_PASSWORD,
        clientId: `dashboard_${Math.random().toString(16).slice(2)}`
    })

    client.on("connect", () => {
        client.subscribe("lnu/iot/it222hp/sensor")
    })

client.on("message", (topic, message) => {
    console.log("Live message received:", message.toString())
    const payload = JSON.parse(message.toString())
    const newReading = {
        ...payload,
        createdAt: new Date().toISOString()
    }
    setTemperature(payload.temperature)
    setHumidity(payload.humidity)
    setReadings(prev => [...prev, newReading])
})

    client.on("error", (error) => {
        console.error(error)
    })

    return () => {
        client.end()
    }
}, [])

return { readings, currentTemperature, currentHumidity}
}