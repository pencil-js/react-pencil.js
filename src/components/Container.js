import React from "react";

export default class Container extends React.Component {
    attach (ref) {
        this.$pencil.add(ref);
    }

    UNSAFE_componentWillMount () {
        this.$pencil = this.getInstance();
    }

    componentWillUnmount () {
        this.$pencil.delete();
        this.$pencil.removeAllListener();
        this.$pencil = null;
    }

    listenForEvents (props) {
        this.$pencil.removeAllListener();

        Object.keys(props)
            .filter(key => key.startsWith("on"))
            .forEach((key) => {
                this.$pencil.on(key.slice(2).toLowerCase(), props[key]);
            });
    }

    componentDidMount () {
        if (this.props.attach && this.$pencil) {
            this.props.attach(this.$pencil);
            this.listenForEvents(this.props);
        }
        else {
            throw new Error("Should not happen");
        }
    }

    componentDidUpdate () {
        if (this.$pencil) {
            this.$pencil.position.set(this.props.position);
            this.$pencil.setOptions(this.props.options);
            this.listenForEvents(this.props);
        }
    }

    renderChildren () {
        if (this.props.children) {
            const props = {
                attach: this.attach.bind(this),
            };
            return React.Children.map(this.props.children, child => {
                if (React.isValidElement(child)) {
                    return React.cloneElement(child, props);
                }
                return child;
            });
        }

        return <></>;
    }

    render () {
        return this.renderChildren();
    }
};
