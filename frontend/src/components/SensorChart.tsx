/**
 * Sensor chart component.
 *
 * Renders a real-time line chart visualising temperature
 * and humidity readings over time using Recharts.
 *
 * @author Isak Thörnqvist
 * @version 1.0.0
 */

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import type { SensorReading } from '../types/index'

interface SensorChartProps {
    /** Array of sensor readings to plot on the chart. */
    readings: SensorReading[]
}

/**
 * Line chart displaying temperature and humidity over time.
 *
 * @param {SensorChartProps} props - Component props.
 */
const SensorChart = ({ readings }: SensorChartProps) => {
    return (
        <ResponsiveContainer width="100%" height={400}>
            <LineChart
                data={readings}
                margin={{ top: 5, right: 0, left: 0, bottom: 5 }}
            >
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis
                    dataKey="createdAt"
                    stroke="#888"
                    tickFormatter={(value) => new Date(value).toLocaleTimeString()}
                />
                <YAxis stroke="#888" />
                <Tooltip
                    contentStyle={{ backgroundColor: '#1a1a1a', borderColor: '#444' }}
                    labelFormatter={(value) => new Date(value).toLocaleTimeString()}
                />
                <Legend />
                <Line
                    type="monotone"
                    dataKey="temperature"
                    stroke="#ff6b6b"
                    dot={false}
                />
                <Line
                    type="monotone"
                    dataKey="humidity"
                    stroke="#4ecdc4"
                    dot={false}
                />
            </LineChart>
        </ResponsiveContainer>
    )
}

export default SensorChart