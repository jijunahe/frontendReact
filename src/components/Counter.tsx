import React, { useState } from "react";

const Counter: React.FC = () => { // Correcto: asignación de la función
    const [count, setCount] = useState(0);

    return (
        <div>
            <h1>Contador: {count}</h1>
            <button onClick={() => setCount(count + 1)}>Incrementar</button>
        </div>
    );
};

export default Counter;