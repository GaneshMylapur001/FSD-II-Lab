
import React, { useState } from "react";

function App() {
    const [isVisible, setIsVisible] = useState(false);

    function toggleMessage() {
        setIsVisible(!isVisible);
    }

    return (
        <div>
            <h1>Conditional Rendering</h1>

            <button onClick={toggleMessage}>
                {isVisible ? "Hide Message" : "Show Message"}
            </button>

            {isVisible && (
                <p>Hello! This component is rendered conditionally.</p>
            )}
        </div>
    );
}

export default App;