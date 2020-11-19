import SuperContainer from "./Container";

export default ({ Container }) => class PContainer extends SuperContainer {
    getInstance () {
        const {
            position,
            options,
        } = this.props;
        return new Container(position, options);
    }
};
