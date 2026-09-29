import React, { useState } from "react";

function Counter() {
    const [count, setCount] = useState(0);

    function increment() {
        setCount(count + 1);
    }

    return (
        <div>
            <h1>Counter</h1>
            <h2>{count}</h2>

            <button onClick={increment}>
                Click to Increase
            </button>
        </div>
    );
}

export default Counter;