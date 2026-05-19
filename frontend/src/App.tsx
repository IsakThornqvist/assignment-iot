import { useAllSensorData } from './hooks/useSensorData'
import { useLedControl } from './hooks/useLedControl'
import SensorValue from './components/SensorValue'
import SensorChart from './components/SensorChart'
import './App.css'
import LedControls from './components/LedControls'

function App() {
  const { readings, currentTemperature, currentHumidity } = useAllSensorData()
  const { ledState, handleLedToggle } = useLedControl()

  return (
    <div>
      <h1>IoT Dashboard</h1>
      <SensorValue temperature={currentTemperature} humidity={currentHumidity} />
      <LedControls ledState={ledState} onToggle={handleLedToggle} />
      <SensorChart readings={readings} />
    </div>
  )
}

export default App