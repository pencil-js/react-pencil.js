const { writeFile } = require("fs").promises;
const { promise: clean } = require("delete");

const component = (classe, props) => `import PComponent from "../PComponent";

export default ({ ${classe} }) => class P${classe} extends PComponent {
    getInstance () {
        const {
            ${["position", ...props, "options"].join(",\n            ")},
        } = this.props;
        return new ${classe}(${["position", ...props, "options"].join(", ")});
    }
    componentDidUpdate (...args) {
        super.componentDidUpdate(...args);
        ${props.length ? `if (this.$pencil) {
            ${props.map(prop => `this.$pencil.${prop} = this.props.${prop}`).join(";\n            ")}
        }` : ""}
    }
}`;

const exporter = list => `${list.map((classe) => `import P${classe} from "./P${classe}"`).join(";\n")}

export {
${list.map(classe => `    P${classe}`).join(",\n")}
};
`;

const classes = {
    // Path: ["instructions", "isClosed"], // FIXME: find a way to declare instructions
    Heart: ["radius"],
    Line: ["points"],
    Spline: ["points", "tension"],
    Polygon: ["points"],
    RegularPolygon: ["nbSides", "radius"],
    Star: ["radius", "nbBranches", "bevelRatio"],
    Triangle: ["radius"],
    Rectangle: ["width", "height"],
    Image: ["url"],
    Square: ["size"],
    Arc: ["width", "height", "startAngle", "endAngle"],
    Ellipse: ["width", "height"],
    Circle: ["radius"],
    Text: ["text"],
    Button: [],
    Checkbox: [],
    Knob: [],
    Slider: [],
    ProgressBar: [],
    ProgressPie: [],
    Select: ["items"],
};

const targetDir = "./src/components/generated";

(async () => {
    await clean(`${targetDir}/*.js`);

    const promises = Object.keys(classes).map(async (pencilClass) => {
        const code = component(pencilClass, classes[pencilClass]);
        await writeFile(`${targetDir}/P${pencilClass}.js`, code);
        return pencilClass;
    });

    Promise.all(promises).then(async (files) => {
        const code = exporter(files);
        await writeFile(`${targetDir}/index.js`, code);

        console.log(`Successfully wrote ${files.length} files.`);
    });
})();
