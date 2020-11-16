import PContainer from "./PContainer";
import React from "react";

export default (Pencil) => class PScene extends PContainer(Pencil) {
    constructor (props) {
        super(props);
        this.canvas = React.createRef();
    }

    getInstance () {
        const { parentNode } = this.canvas.current;
        return new Pencil.Scene(parentNode, this.props.options);
    }

    UNSAFE_componentWillMount () {
        this.$pencil = new Pencil.Container();
    }

    componentDidMount () {
        const oldContainer = this.$pencil;
        this.$pencil = this.getInstance();
        this.$pencil.add(...oldContainer.children);
        this.$pencil.startLoop();
    }

    componentWillUnmount () {
        this.$pencil.stopLoop();
    }

    render () {
        return <div ref={this.canvas}>
            {this.renderChildren()}
        </div>;
    }
}
