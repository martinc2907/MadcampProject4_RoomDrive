import React from 'react';
import { Link } from 'react-router';
import styles from '../style.css';
import styles2 from '../Animation.css';
import FadeIn from 'react-fade-in';

class Authentication extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    handleChange(e) {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    handleLogin() {
        let id = this.state.username;
        let pw = this.state.password;

        this.props.onLogin(id, pw).then(
            (success) => {
                if(!success) {
                    this.setState({
                        password: ''
                    });
                }
            }
        );
    }

    handleRegister() {
        let id = this.state.username;
        let pw = this.state.password;

        this.props.onRegister(id, pw).then(
            (success) => {
                if(!success) {
                    this.setState({
                        password: ''
                    });
                }
            }
        );
    }

    handleKeyPress(e) {
        if(e.charCode ===13 ){
            if(this.props.mode) {
                this.handleLogin();
            } else {
                this.handleRegister();
            }
        }
    }

    render() {
        const inputBoxes = (
            <div>
                <div className="input-field col s12">
                    <label>Username</label>
                    <input
                    name="username"
                    type="text"
                    className="validate"
                    value={this.state.username}
                    onChange={this.handleChange}
                    />
                </div>
                <div className=" input-field col s12">
                    <label>Password</label>
                    <input
                    name="password"
                    type="password"
                    className="validate"
                    value={this.state.password}
                    onChange={this.handleChange}
                    onKeyPress={this.handleKeyPress}/>
                </div>
            </div>
        );

        const loginView = (
            <div>
                <div className={styles.auth_box_content}>
                        { inputBoxes }
                        <a onClick={this.handleLogin} className="waves-effect blue-grey darken-2 btn">SUBMIT</a>
                </div>


                <div className={styles.auth_box_footer}>
                      <div className="right" >
                      New Here? <Link to="/register"><h3>Create an account</h3></Link>
                      </div>
                </div>

            </div>
        );

        const registerView = (
           <div className={styles.auth_box_content}>
                   { inputBoxes }
                   <a onClick={this.handleRegister} className="waves-effect blue-grey darken-2 btn">CREATE</a>
           </div>
       );

        return(
              <FadeIn>
                  <div className={styles.auth_box}>
                    <div className={styles.auth_box_header}>
                        <div className="card-content">{this.props.mode ? "LOGIN" : "REGISTER"}</div>
                    </div>
                    <FadeIn>
                      <div className = "z-depth-3">{this.props.mode ? loginView : registerView }</div>
                    </FadeIn>
                  </div>
              </FadeIn>
        );
    }

}

Authentication.propTypes = {
    mode: React.PropTypes.bool,
    onLogin: React.PropTypes.func,
    onRegister: React.PropTypes.func
};

Authentication.defaultProps = {
    mode: true,
    onLogin: (id, pw) => { console.error("onLogin not defined"); },
    onRegister: (id, pw) => { console.error("onRegister not defined"); }
};

export default Authentication;
