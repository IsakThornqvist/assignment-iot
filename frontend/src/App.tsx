import { useAllSensorData } from './hooks/useSensorData'
import SensorValue from './components/SensorValue'
import SensorChart from './components/SensorChart'
import './App.css'

function App() {
  const { readings, currentTemperature, currentHumidity } = useAllSensorData()

  return (
    <div>
      <h1>IoT Dashboard</h1>
      <SensorValue temperature={currentTemperature} humidity={currentHumidity} />
      <SensorChart readings={readings} />
    </div>
  )
}

export default App