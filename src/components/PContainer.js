import React from "react";

export default ({ Container }) => class PContainer extends React.Component {
    on (...args) {
        this.$pencil.on(...args);
    }

    getInstance () {
        return new Container(this.props.position);
    }

    attach (ref) {
        this.$pencil.add(ref);
    }

    UNSAFE_componentWillMount () {
        this.$pencil = this.getInstance();
    }

    componentWillUnmount () {
        this.$pencil.delete();
    }

    componentDidMount () {
        if (this.props.attach && this.$pencil) {
            this.props.attach(this.$pencil);
        }
        else {
            throw new Error("Should not happen");
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
