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

    componentDidMount () {
        if (this.props.attach && this.$pencil) {
            this.props.attach(this.$pencil);
        }
        else {
            throw new Error("Should not happen");
        }

        Object.keys(this.props)
            .filter(key => key.startsWith("on"))
            .forEach((key) => {
                this.$pencil.on(key.slice(2).toLowerCase(), this.props[key]);
            });
    }

    componentDidUpdate (prevProps, prevState, snapshot) {
        console.log("Update", this.constructor.name, this.props, prevProps);
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
