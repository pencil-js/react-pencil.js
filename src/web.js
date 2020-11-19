import install from "./install";

const global = self;

const errors = [];
if (!global.React) {
    errors.push(`React should be installed before react-pencil.js using a <script> tag like:
<script src="https://unpkg.com/react/umd/react.development.js"></script>`);
}
if (!global.Pencil) {
    errors.push(`Pencil.js should be installed before react-pencil.js using a <script> tag like:
<script src="https://unpkg.com/pencil.js"></script>`);
}

if (errors.length) {
    errors.forEach(message => console.error(message));
}
else {
    global.ReactPencil = install(global.Pencil);
}
