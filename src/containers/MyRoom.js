import React from 'react';
import { MyRoom1, MyRoom2, MyRoom3, MyRoom4 } from 'components';
import { connect } from 'react-redux';
import { getStatusRequest } from 'actions/authentication';
// (this.props.location.pathname === (`/${this.props.username}`+ "/1"))
class MyRoom extends React.Component{
    render() {
        let path1 = (this.props.location.pathname === ("/1")) ? <MyRoom1 /> : undefined;
        let path2 = (this.props.location.pathname === ("/2")) ? <MyRoom2 /> : undefined;
        let path3 = (this.props.location.pathname === ("/3")) ? <MyRoom3 /> : undefined;
        let path4 = (this.props.location.pathname === ("/4")) ? <MyRoom4 /> : undefined;

        return (
            <div >
                {path1}
                {path2}
                {path3}
                {path4}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return{
        status: state.authentication.status,
        isLoggedIn: state.authentication.status.isLoggedIn,
        username: state.authentication.status.currentUser
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getStatusRequest: () => {
            return dispatch(getStatusRequest());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyRoom);
