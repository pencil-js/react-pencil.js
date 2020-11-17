# react-pencil.js

Pencil.js ❤️ React - Build reactive 2D graphics scene in your React project


## Installation

    npm install react-pencil.js

> You need to install [`react`](https://github.com/facebook/react) and [`pencil.js`](https://github.com/pencil-js/pencil.js) yourself alongside `react-pencil.js`.


## Usage

### NPM

You will need a compiler (webpack, rollup ...) configured with Babel to bundle it.

```js
import React from "react";
import ReactDOM from "react-dom";
import ReactPencil from "react-pencil.js";

const { PScene, PCircle } = ReactPencil;

function App () {
    return <PScene>
        <PCircle  radius={100} />
    </PScene>;
}

ReactDOM.render(
    <App />,
    document.getElementById("root"),
);
```


### Direct `<script>` tag

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Example</title>
</head>
<body>
<!-- React and ReactDOM script tag -->
<!-- Switch these to "production.min.js" when deploying -->
<script src="https://unpkg.com/react/umd/react.development.js"></script>
<script src="https://unpkg.com/react-dom/umd/react-dom.development.js"></script>
<!-- Pencil.js script tag -->
<script src="https://unpkg.com/pencil.js"></script>
<!-- react-pencil.js script tag -->
<script src="https://unpkg.com/react-pencil.js"></script>
<script>
    const { PScene, PCircle } = ReactPencil;

    ReactDOM.render(
        React.createElement(PScene, null,
            React.createElement(PCircle, {
                position: [200, 200],
                radius: 100,
                options: {
                    fill: "red",
                },
                draggable: true,
            }),
        ),
        document.body,
    );
</script>
</body>
</html>
```


## License

[MIT](license)
