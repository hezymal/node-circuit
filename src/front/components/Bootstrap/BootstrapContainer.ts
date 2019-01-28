import { connect, MapDispatchToProps, MapStateToProps } from "react-redux";
import { ping } from "actions";
import { uiBootstrap as dataKey } from "constants/dataKeys";
import StoreState from "types/StoreState";
import Bootstrap, { Props } from "./Bootstrap";

interface IOwnProps {}

const mapStateToProps: MapStateToProps<Partial<Props>, IOwnProps, StoreState> = (state, ownProps) => {
    return {
        value: state.ui.bootstrap.value,
    };
};

const mapDispatchToProps: MapDispatchToProps<Partial<Props>, IOwnProps> = (dispatch, ownProps) => {
    return {
        ping: () => dispatch(ping(dataKey)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Bootstrap);