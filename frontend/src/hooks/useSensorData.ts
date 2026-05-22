/**
 * Sensor data hook.
 *
 * Fetches historical sensor readings from the backend on mount
 * and subscribes to live updates via MQTT over WebSocket.
 *
 * @author Isak Thörnqvist
 * @version 1.0.0
 */

import { useEffect, useState } from "react"
import type { SensorReading } from "../types/index"
import axios from 'axios'
import mqtt from 'mqtt'

/**
 * Provides historical and live sensor readings along with
 * the most recent temperature and humidity values.
 *
 * @returns {{ readings: SensorReading[], currentTemperature: number | null, currentHumidity: number | null }}
 */
export function useAllSensorData() {
    const [readings, setReadings] = useState<SensorReading[]>([])
    const [currentTemperature, setTemperature] = useState<number | null>(null)
    const [currentHumidity, setHumidity] = useState<number | null>(null)

    /** Fetch historical readings from the backend REST API on mount. */
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

    /** Connect to HiveMQ via WebSocket and subscribe to live sensor updates. */
    useEffect(() => {
        const client = mqtt.connect(import.meta.env.VITE_MQTT_BROKER, {
            username: import.meta.env.VITE_MQTT_USERNAME,
            password: import.meta.env.VITE_MQTT_PASSWORD,
            clientId: `dashboard_${Math.random().toString(16).slice(2)}`
        })

        client.on("connect", () => {
            client.subscribe("lnu/iot/it222hp/sensor")
        })

        client.on("message", (_topic, message) => {
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

        /** Disconnect MQTT client on component unmount. */
        return () => {
            client.end()
        }
    }, [])

    return { readings, currentTemperature, currentHumidity }
}