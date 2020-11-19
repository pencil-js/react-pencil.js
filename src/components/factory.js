import PComponent from "./PComponent";

const map = {
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

const classes = {};
Object.keys(map).forEach((className) => {
    const pName = `P${className}`;
    classes[pName] = (Pencil) => class extends PComponent {
        getInstance () {
            const props = ["position", ...map[className], "options"].map(p => this.props[p]);
            return new Pencil[className](...props);
        }
        componentDidUpdate (...args) {
            super.componentDidUpdate(...args);
            if (this.$pencil) {
                map[className].forEach((p) => this.$pencil[p] = this.props[p]);
            }
        }
    };
});

export default classes;
