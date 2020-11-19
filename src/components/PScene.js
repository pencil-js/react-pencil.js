import SuperContainer from "./Container";
import React from "react";

const mirroredProps = ["cursorPosition", "fps", "width", "height", "center", "size"];
const mirroredFunctions = ["setImageSmoothing", "getRandomPosition", "getImageData", "toImage"];

export default ({ Scene, Container }) => {
    const PScene = class extends SuperContainer {
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
    }

    mirroredProps.forEach((prop) => {
        Object.defineProperty(PScene.prototype, prop, {
            get () {
                return this.$pencil[prop];
            },
            set (value) {
                this.$pencil[prop] = value;
            }
        });
    });
    mirroredFunctions.forEach((funcName) => {
        PScene.prototype[funcName] = function (...args) {
            return this.$pencil[funcName](...args);
        };
    });

    return PScene;
};
