import SuperContainer from "./Container";
import React from "react";

export default ({ Scene, Container }) => class PScene extends SuperContainer {
    constructor (props) {
        super(props);
        this.spy = React.createRef();
    }

    getInstance () {
        return new Scene(this.spy.current.parentNode, this.props.options);
    }

    UNSAFE_componentWillMount () {
        this.$pencil = new Container();
    }

    componentDidMount () {
        const oldContainer = this.$pencil;
        this.$pencil = this.getInstance();
        this.$pencil.add(...oldContainer.children);
        this.$pencil.startLoop();
    }

    componentWillUnmount () {
        this.$pencil.stopLoop();
        super.componentWillUnmount();
    }

    render () {
        return <div ref={this.spy} className="pencil.js-spy" style={{display: "none"}}>
            {this.renderChildren()}
        </div>;
    }
};
