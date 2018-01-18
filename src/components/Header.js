import React from 'react';
import {Uploadfile} from 'components';
import { Link } from 'react-router';
import styles from '../style.css';
import { connect } from 'react-redux';
import { uploadRequest } from 'actions/fileupload';
import { browserHistory } from 'react-router';
import infoblack from '../images/info.jpg';

//Uploadfile component를 위한 handle함수 Header에서 만들기( Header에서 Uploadfile을 부르기 때문...! )

class Header extends React.Component {

    constructor(props){
        super(props);
        this.handleUpload = this.handleUpload.bind(this);
    }

    handleUpload(filetype, roomnumber, id, file, formData) {
        Materialize.toast("FILE!", 6000);
        Materialize.toast(file, 6000);
        Materialize.toast(file.name, 6000);
        return this.props.uploadRequest(filetype, roomnumber, id, file, formData).then(
            () => {
                if(this.props.status === "SUCCESS") {
                    let uploadfilesData = {

                    }; //reducers에 status넣을 것 추가후, 사용가능!

                    Materialize.toast('Upload SUCCESS!', 2000);
                    browserHistory.push(`${this.props.pathname}`); //제대로 작동할지 의문......!! 다시 꼭 check!
                    return true;
                } else {
                    let $toastContent = $('<span style="color: #FFB4BA">Fail to Upload');
                    Materialize.toast($toastContent, 2000);
                    return false;
                }
            }
        );
    }

    render() {

        const loginButton = (
            <li>
                <Link to="/login">
                    LOGIN
                </Link>
            </li>
        );

        const logoutButton = (
            <li>
                <a onClick={this.props.onLogout}>LOGOUT</a>
                <br/>
                <a>Hello, {this.props.username}!</a>
            </li>
        );
// (this.props.pathname === (`/${this.props.username}`+ "/1")) ?
        // let path1 = (this.props.pathname === ("/1")) ? (<li><Uploadfile rnumber = {1} onUpload={this.handleUpload} username={this.props.username} /></li>) : undefined;
        // let path2 = (this.props.pathname === ("/2")) ? (<li><Uploadfile rnumber = {2} onUpload={this.handleUpload} username={this.props.username}/></li>) : undefined;
        // let path3 = (this.props.pathname === ("/3")) ? (<li><Uploadfile rnumber = {3} onUpload={this.handleUpload} username={this.props.username}/></li>) : undefined;
        // let path4 = (this.props.pathname === ("/4")) ? (<li><Uploadfile rnumber = {4} onUpload={this.handleUpload} username={this.props.username}/></li>) : undefined;
// <Link to = {`/${this.props.username}`+ "/roomimage"} >
        const headerlists = (
          <div>
            <li><Link to = "/roomimage" >Choose Room</Link></li>
          </div>
        );

        const madebyinfo = (
          <ul className={styles.demo}>
              <li>
                  <figure>
                      <img src = {'/'+infoblack} alt=""/>
                      <figcaption>
                          <h2> Information</h2>
                          <h6>
                            Make your own room and save your files! Enjoy decorating your own room! <br /> <br /> <br/> <br /> Made by younseo. 찬쥬찬쥬
                          </h6>
                      </figcaption>
                  </figure>
              </li>
          </ul>
        );

        // const uploadlists = (
        //     <div>
        //         {path1}
        //         {path2}
        //         {path3}
        //         {path4}
        //     </div>
        // );
//(this.props.isLoggedIn)? `/${this.props.username}` : "/";
        const mypagepath = (this.props.isLoggedIn)? `/${this.props.username}` : "/";
// Link to={mypagepath} -> Link to="/"로 변경!
        // <p>{this.props.pathname}</p>
        // madebyinfo

        // <ul className ={styles.box_layout_whenroomchosen}>
        //     {uploadlists}
        // </ul>
        return (
          <box className = "z-depth-5">
                  <Link to="/" className={styles.box_logo}>ROOM_DRIVER <br/> <div className={styles.box_semilogo}>Make your own Room!</div>
                  </Link>

                  <ul className = {styles.box_layout_whenlogin}>
                      {this.props.isLoggedIn ? headerlists : madebyinfo}
                  </ul>

                  <ul className={styles.box_layout}>
                    {this.props.isLoggedIn ? logoutButton : loginButton }
                 </ul>
        </box>
        );
    }
}

Header.propTypes = {
    isLoggedIn: React.PropTypes.bool,
    onLogout: React.PropTypes.func,
    pathname: React.PropTypes.string,
    username: React.PropTypes.string
};

Header.defaultProps = {
    isLoggedIn: false,
    onLogout: () => { console.error("logout function not defined");}
};

const mapStateToProps = (state) => {
  return{
      status: state.fileupload.upload.status
  };
};

const mapDispatchToProps = (dispatch) => {
    return {
        uploadRequest: (filetype, roomnumber, id, filename, mimetype, size ) => {
            return dispatch(uploadRequest(filetype, roomnumber, id, filename, mimetype, size))
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
