import React from 'react';
import { Header, Mypagebackground} from 'components';
import { Mypage } from 'containers';
import { connect } from 'react-redux';
import { getStatusRequest, logoutRequest } from 'actions/authentication';
import { browserHistory } from 'react-router';

/* reallogout: 실제 logout이 아닌, 파일 업로드후 redirect로 /username/roomnumber를 하면 username과 isLoggedIn정보를 제대로 받지
못해서 맨 처음 메인 화면 페이지로 튕겨버림. 로그인이 되어있었던 정보가 없어져서 다시 로그인을 해야 하는 불편함이 존재.
이를 방지 위해 'reallogout'변수 선언, 실제로 only logout 버튼을 눌렀을 경우에만 튕기도록 만들예정
reallogout=1일 경우가 정말 logout을 한 경우!*/
class App extends React.Component {

    constructor(props){
        super(props);
        this.state = {
          reallogout: 0
        }
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout() {
        this.props.logoutRequest().then(
            () => {
                Materialize.toast('Good Bye!', 2000);

                let loginData = {
                    isLoggedIn: false,
                    username: ''
                };
                browserHistory.push('/');
                document.cookie = 'key='+ btoa(JSON.stringify(loginData));
                this.setState({
                    reallogout: 1
                });
            }
        );
    }

    componentDidMount() {
      // get cookie by name
      function getCookie(name) {
          var value = "; " + document.cookie;
          var parts = value.split("; " + name + "=");
          if (parts.length == 2) return parts.pop().split(";").shift();
      }

      // get loginData from cookie
      let loginData = getCookie('key');

      // if loginData is undefined, do nothing
      if(typeof loginData === "undefined") return;

      // decode base64 & parse json
      loginData = JSON.parse(atob(loginData));

      // if not logged in, do nothing
      if(!loginData.isLoggedIn) return;

      // page refreshed & has a session in cookie,
      // check whether this cookie is valid or not
      this.props.getStatusRequest().then(
          () => {
              console.log(this.props.status);
              // if session is not valid
              if(!this.props.status.valid) {
                  // logout the session
                  loginData = {
                      isLoggedIn: false,
                      username: ''
                  };

                  document.cookie='key=' + btoa(JSON.stringify(loginData));

                  // and notify
                  let $toastContent = $('<span style="color: #FFB4BA">Your session is expired, please log in again</span>');
                  Materialize.toast($toastContent, 4000);

              }
            }
        );
    }


    render() {

        let isNotNullpage = (this.props.location.pathname === "/")? <Mypage backerror={true}/>: undefined; //login후, 억지로 /home링크로 돌아올경우

        return(
          <div>
              <Header username={this.props.currentUser}
                      isLoggedIn={this.props.status.isLoggedIn}
                      onLogout={this.handleLogout}
                      pathname = {this.props.location.pathname}
                      />

                    { this.props.status.isLoggedIn ? <Mypagebackground /> : <h10><p>ROOM DRIVER</p></h10>}
              {this.props.children}
          </div>
        );
    }
}

const mapStateToProps = (state) => {
    return{
        status: state.authentication.status,
        isLoggedIn: state.authentication.status.isLoggedIn,
        currentUser: state.authentication.status.currentUser
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getStatusRequest: () => {
            return dispatch(getStatusRequest());
        },
        logoutRequest: () => {
            return dispatch(logoutRequest());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
