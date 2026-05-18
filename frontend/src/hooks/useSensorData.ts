import { useEffect, useState } from "react"
import { SensorReading } from "../types"
import axios from 'axios'
import mqtt from 'mqtt'

interface SensorResponse {
    allReadings: SensorReading[]
}

export function useAllSensorData () {
    const [readings, setReadings] = useState<SensorReading[]>([])
    
    const [currentTemperature, setTemperature] = useState<number | null>(null)

    const [currentHumidity, setHumidity] = useState<number | null>(null)


    
}