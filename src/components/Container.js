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

    listenForEvents (previousProps = {}, props) {
        const actions = {
            removeListener: previousProps,
            on: props,
        };

        Object.keys(actions).forEach((funcName) => {
            const object = actions[funcName];
            Object.keys(object)
                .filter(key => key.startsWith("on"))
                .forEach((key) => {
                    this.$pencil[funcName](key.slice(2).toLowerCase(), object[key]);
                });
        });
    }

    componentDidMount () {
        if (this.props.attach && this.$pencil) {
            this.props.attach(this.$pencil);
            this.listenForEvents(undefined, this.props);
        }
        else {
            throw new Error("Should not happen");
        }
    }

    componentDidUpdate (prevProps) {
        if (this.$pencil) {
            this.$pencil.position.set(this.props.position);
            this.$pencil.setOptions(this.props.options);
            this.listenForEvents(prevProps, this.props);
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
