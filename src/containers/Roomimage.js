import React from 'react';
import { connect } from 'react-redux';
import { Chooseroom } from 'components';
import { getStatusRequest } from 'actions/authentication';

class Roomimage extends React.Component {
    render() {
        return (
            <div >
                <Chooseroom username ={this.props.username} />
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

export default connect(mapStateToProps, mapDispatchToProps)(Roomimage);
