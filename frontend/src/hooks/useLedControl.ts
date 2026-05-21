/**
 * LED control hook.
 *
 * Manages the LED state and sends toggle commands
 * to the Wokwi device via the Express backend.
 *
 * @author Isak Thörnqvist
 * @version 1.0.0
 */

import { useState } from "react"
import axios from 'axios'

/**
 * Provides the current LED state and a toggle function
 * that publishes a command to the Wokwi device.
 *
 * @returns {{ ledState: boolean, handleLedToggle: () => Promise<void> }}
 */
export function useLedControl() {
    const [ledState, setLedState] = useState<boolean>(false)

    /**
     * Toggles the LED state and sends the new state
     * to the backend via HTTP POST.
     */
    async function handleLedToggle() {
        try {
            const nextState = !ledState
            setLedState(nextState)
            await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/command/led`, { state: nextState })
        } catch (error) {
            console.error("Failed to toggle LED", error)
        }
    }

    return { ledState, handleLedToggle }
}