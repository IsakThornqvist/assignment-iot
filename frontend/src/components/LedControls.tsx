

interface LedControlsProps {
    ledState: boolean,
    onToggle: () => void
}




const LedControls = ({ ledState, onToggle }: LedControlsProps) => {



    return (
        <div>

        <button onClick={onToggle}> {ledState ? 'Turn Off' : 'Turn On'} </button>


        </div>
    )
}


export default LedControls