// Load dependencies
import React from "react";
import ReactDOM from "react-dom";
import ReactPencil from "react-pencil.js";

// Extract components from ReactPencil
const { PScene, PStar } = ReactPencil;

// Main function
function App () {
    // Options for the scene
    const sceneOptions = {
        fill: "#73e0fa",
    };
    // Shared options for the stars
    const starsOptions = {
        fill: "#fa134f",
        shadow: {
            position: [5, 5],
            blur: 10,
            color: "#000",
        },
    };

    // Create a ref for later use
    const scene = React.createRef();
    // Create a state (empty array) to edit it later
    const [positions, setPos] = React.useState([...new Array(30)]);

    // Create all stars
    const stars = positions.map((_, i) => <PStar
        key={i} // List item need a key
        position={positions[i]} // Use the state position
        radius={100}
        options={{
            rotation: Math.random(), // Random rotation
            ...starsOptions, // Common options
        }}
        draggable // Enable draggable
        onClick={() => console.log(`Clicked on star n${i}`)} // Event listener
    />);

    // Will be triggered when references are ready
    React.useEffect(() => {
        // Update position using the scene reference
        setPos(positions.map(() => scene.current.$pencil.getRandomPosition()));
    }, []);

    // Create the scene with stars as children
    return <PScene ref={scene} options={sceneOptions}>
        {stars}
    </PScene>
}

// Render the main function
ReactDOM.render(
    <App />,
    document.getElementById("app"),
);
