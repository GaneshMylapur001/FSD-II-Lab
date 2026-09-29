
import React, { useState } from "react";

function App() {
    const [message, setMessage] = useState(
        "Waiting for button click..."
    );

    function handleClick() {
        setMessage("Button clicked successfully!");
    }

    return (
        <div>
            <h1>Button Click Event</h1>

            <button onClick={handleClick}>
                Click Me
            </button>

            <p>{message}</p>
        </div>
    );
}

export default App;