import React from 'react';
import { Mypagebackground } from 'components';
import { connect } from 'react-redux';
import { getStatusRequest } from 'actions/authentication';

class Mypage extends React.Component {
    render() {
        const backerrorpage = (
          <h1>Impossible Link page! <br/> Want to log_out?</h1>
        );

        const notloginerror2 = (
          <h1>You are not user! Who are you...</h1>
        );

        let checklogin = (this.props.isLoggedIn? <Mypagebackground /> : notloginerror2);

        return (
            <div>
               {this.props.backerror? backerrorpage :  checklogin}
            </div>
        );
    }
}

Mypage.defaultProps = {
    backerror: false,
};

const mapStateToProps = (state) => {
    return{
        status: state.authentication.status,
        isLoggedIn: state.authentication.status.isLoggedIn,
        username: state.authentication.status.currentUser,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getStatusRequest: () => {
            return dispatch(getStatusRequest());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Mypage);
