import Container from "./Container";

export default class PComponent extends Container {
    getInstance () {
        throw new Error("Component should not be directly instantiate.")
    }

    componentDidMount () {
        super.componentDidMount();

        if (this.props.draggable) {
            this.$pencil.draggable();
        }
    }
}
