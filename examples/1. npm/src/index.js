import React from "react";
import ReactDOM from "react-dom";
import ReactPencil from "react-pencil.js";

const { PScene, PStar } = ReactPencil;

function App () {
    const sceneOptions = {
        fill: "#73e0fa",
    };
    const starsOptions = {
        fill: "#fa134f",
        shadow: {
            position: [5, 5],
            blur: 10,
            color: "#000",
        },
    };

    const scene = React.createRef();
    const [positions, setPos] = React.useState([...new Array(30)]);

    const stars = positions.map((_, i) => <PStar
        key={i}
        position={positions[i]}
        radius={100}
        options={{
            rotation: Math.random(),
            ...starsOptions,
        }}
        draggable
        onClick={() => console.log(`Clicked on star n${i}`)}
    />);

    React.useEffect(() => {
        setPos(positions.map(() => scene.current.$pencil.getRandomPosition()));
    }, []);

    return <PScene ref={scene} options={sceneOptions}>
        {stars}
    </PScene>
}

ReactDOM.render(
    <App />,
    document.getElementById("app"),
);
