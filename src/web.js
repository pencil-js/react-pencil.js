import install from "./install";

const errors = [];
if (!window.React) {
    errors.push(`React should be installed before react-pencil.js using a <script> tag like:
<script src="https://cdn.jsdelivr.net/npm/react"></script>`);
}
if (!window.Pencil) {
    errors.push(`Pencil.js should be installed before react-pencil.js using a <script> tag like:
<script src="https://unpkg.com/vue-pencil.js"></script>`);
}

if (errors.length) {
    errors.forEach(message => console.error(message));
}
else {
    install(window.Pencil);
}
