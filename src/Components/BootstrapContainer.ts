import Bootstrap, { Props } from "Components/Bootstrap";
import { connect, MapDispatchToProps, MapStateToProps } from "react-redux";
import { ping } from "Actions";
import StoreState from "Types/StoreState";
import { uiBootstrap as dataKey } from "Constants/dataKeys";

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