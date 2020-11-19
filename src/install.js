import componentsDefinition from "./components";

export default (Pencil) => {
    const components = {};
    Object.keys(componentsDefinition).forEach((key) => {
        components[key] = componentsDefinition[key](Pencil);
    });
    return components;
};
