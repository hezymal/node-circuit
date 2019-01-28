import { connect, MapDispatchToProps, MapStateToProps } from "react-redux";
import { ping } from "actions";
import { uiBootstrap as dataKey } from "constants/dataKeys";
import StoreState from "types/StoreState";
import Circuit, { Props } from "./Circuit";

interface IOwnProps {}

const mapStateToProps: MapStateToProps<Partial<Props>, IOwnProps, StoreState> = (state, ownProps) => {
    return {
    };
};

const mapDispatchToProps: MapDispatchToProps<Partial<Props>, IOwnProps> = (dispatch, ownProps) => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Circuit);