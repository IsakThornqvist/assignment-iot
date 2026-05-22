/**
 * Sensor value component.
 *
 * Renders the humidity and temperature value
 *
 * @author Isak Thörnqvist
 * @version 1.0.0
 */
interface SensorValueProps {
    temperature: number | null
    humidity: number | null

}


/**
 * Component for showing sensor values
 * @param {SensorValueProps} props - Component props.
 */
const SensorValue = ({ temperature, humidity }: SensorValueProps) => {


return (

<div>

    <p> Current Temperature: {temperature ?? 'No data'} </p>
    <p> Current Humidity: {humidity ?? 'No data'} </p>

</div>

)
}


export default SensorValue