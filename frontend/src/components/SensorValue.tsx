// import type { SensorReading } from "../types/index.ts"


interface SensorValueProps {
    temperature: number | null
    humidity: number | null

}


const SensorValue = ({ temperature, humidity }: SensorValueProps) => {


return (

<div>

    <p> Current Temperature: {temperature} </p>
    <p> Current Humidity: {humidity} </p>

</div>

)
}


export default SensorValue