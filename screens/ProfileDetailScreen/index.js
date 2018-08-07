import { connect } from "react-redux";
import Container from "./container";
import {actionCreators as userActions} from "../../redux/modules/user";


const mapDispatchtoProps = (dispatch, ownProps) => {
    return {
        getProfile: (username) => {
            dispatch(userActions.getProfile(username));
        }
    }
};

export default connect(null,mapDispatchtoProps)(Container);