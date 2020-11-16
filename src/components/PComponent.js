import PContainer from "./PContainer";

export default (Pencil) => class PComponent extends PContainer(Pencil) {
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
