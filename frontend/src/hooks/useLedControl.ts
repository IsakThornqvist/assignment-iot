import { useState } from "react"
import axios from 'axios'


export function useLedControl () {
    const [ledState, setLedState] = useState<boolean>(false)

    async function handleLedToggle() {
        try {
            const nextState = ledState !== true
            setLedState(nextState)
            await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/command/led`, { state: nextState })
        } catch (error) {
            console.error("Failed to toggle LED", error)
        }

    }
    return { ledState, handleLedToggle }
    

}