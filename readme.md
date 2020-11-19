![react-pencil.js logo](media/logo.png)

# react-pencil.js

Pencil.js ❤️ React - Build reactive 2D graphics scene in your React project


## Installation

    npm install react-pencil.js

> You need to install [`react`](https://github.com/facebook/react) (certainly with [`react-dom`](https://github.com/facebook/react/tree/master/packages/react-dom)) and [`pencil.js`](https://github.com/pencil-js/pencil.js) yourself alongside `react-pencil.js`.


## Usage

### 1. NPM (recommended)

You will need a compiler (webpack, rollup ...) configured with Babel to bundle it. Look at [the example](./examples/1.%20npm) to know how.

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


### 2. Direct `<script>` tag

For prototyping or when you don't have access to NPM. Look at [the example](./examples/2.%20Direct%20script%20tag) for a slightly more in-depth demo.

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
