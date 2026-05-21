/**
 * LED control component.
 *
 * Renders a button that toggles the LED on the
 * simulated Wokwi device on or off.
 *
 * @author Isak Thörnqvist
 * @version 1.0.0
 */

interface LedControlsProps {
    /** Current LED state. true = on, false = off. */
    ledState: boolean
    /** Callback function triggered when the button is clicked. */
    onToggle: () => void
}

/**
 * Button component for controlling the Wokwi LED.
 *
 * @param {LedControlsProps} props - Component props.
 */
const LedControls = ({ ledState, onToggle }: LedControlsProps) => {
    return (
        <div>
            <button onClick={onToggle}>
                {ledState ? 'Turn Off' : 'Turn On'}
            </button>
        </div>
    )
}

export default LedControls