import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import type { SensorReading } from '../types/index'




interface SensorChartProps {

    readings: SensorReading[]

}

const SensorChart = ({ readings }: SensorChartProps) => {
    

return (
    <ResponsiveContainer width="100%" height={400}>
<LineChart
      data={readings}
      margin={{
        top: 5,
        right: 0,
        left: 0,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-3)" />
      <XAxis dataKey="createdAt" stroke="var(--color-text-3)" />
      <YAxis width="auto" stroke="var(--color-text-3)" />
      <Tooltip
        cursor={{
          stroke: 'var(--color-border-2)',
        }}
        contentStyle={{
          backgroundColor: 'var(--color-surface-raised)',
          borderColor: 'var(--color-border-2)',
        }}
      />
      <Legend />
      <Line
        type="monotone"
        dataKey="temperature"
        stroke="var(--color-chart-1)"
        dot={{
          fill: 'var(--color-surface-base)',
        }}
        activeDot={{ r: 8, stroke: 'var(--color-surface-base)' }}
      />
      <Line
        type="monotone"
        dataKey="humidity"
        stroke="var(--color-chart-2)"
        dot={{
          fill: 'var(--color-surface-base)',
        }}
        activeDot={{ stroke: 'var(--color-surface-base)' }}
      />
    </LineChart>
    </ResponsiveContainer>

    
)
}

export default SensorChart


