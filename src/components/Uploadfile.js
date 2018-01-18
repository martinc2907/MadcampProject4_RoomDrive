import React from 'react';
import styles from '../style.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FontIcon from 'material-ui/FontIcon';
import {blue500, red500, greenA200} from 'material-ui/styles/colors';
import {Draggable} from 'components';

//filetype, roomnumber, id, filename, mimetype, size
//id: Header에서 this.props.username넘겨줌!
//roomnumber: Header에서 this.props.rnumber넘겨줌!
class Uploadfile extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            ftype: "",
            file: "",
            inputValue: "",
            path: ""
        };
        this.handleUpload = this.handleUpload.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.updateMusic = this.updateMusic.bind(this);
        this.updatePicture = this.updatePicture.bind(this);
        this.updateDocument = this.updateDocument.bind(this);
    }

    updateMusic(evt){
      var temp = evt.target.value;
      temp = temp.replace("C:\\fakepath\\", "");
      var pathAddend = "143.248.36.235:4000/music/";
      var realpath = pathAddend + temp;
      this.props.onchangeValue(temp,realpath,'music');
      this.setState({
        inputValue: temp,
        path: realpath
      });
      console.log("CHECK" + this.state.path);
      this.props.onchangeValue(temp, realpath, 'music');

      // console.log(temp);
      // console.log(realpath);
    }

    updateDocument(evt){
      var temp = evt.target.value;
      temp = temp.replace("C:\\fakepath\\", "");
      var pathAddend = "143.248.36.235:4000/document/";
      var realpath = pathAddend + temp;
      this.props.onchangeValue(temp, realpath, 'document');
      this.setState({
        inputValue: temp,
        path: realpath
      });
      console.log("CHECK" + this.state.path);
      this.props.onchangeValue(temp, realpath, 'document');
      // console.log(temp);
      // console.log(realpath);
    }

    updatePicture(evt){
      var temp = evt.target.value;
      temp = temp.replace("C:\\fakepath\\C:", "");
      var pathAddend = "143.248.36.235:4000/picture/";
      var realpath = pathAddend + temp;
      this.props.onchangeValue(temp, realpath, 'picture');
      this.setState({
        inputValue: temp,
        path: realpath
      });
      console.log("CHECK" + this.state.path);
      this.props.onchangeValue(temp, realpath, 'picture');
      // console.log(temp);
      // console.log(realpath);
    }

//       Materialize.toast( e.target.name , 2000);
    handleChange(e) {
       let nextState = {};
       nextState[this.state.ftype] = e.target.name;
       this.setState({
          ftype: e.target.name,
          file: e.target.files[0]
       });

       Materialize.toast(e.target.name);
    }

    handleUpload(){
      let filetype = this.state.ftype;
      let file = this.state.file;
      let roomnumber = this.props.rnumber;
      let id = this.props.username;

      let formData = new FormData();
      formData.append('filename', file.name);
      formData.append('mimetype', file.type);
      formData.append('size', file.size);

      this.props.onUpload( filetype, roomnumber, id, file, formData);
    }

    render(){

      // const musicBox = (
      //   <div className={styles.uploadfile_box} name="music" encType="multipart/form-data" noValidate>
      //     <input className={styles.uploadfile_box_upload} readOnly="Music" type="file" name="music" onChange={this.handleChange}/>
      //     <button className={styles.uploadfile_box_music} >Music</button>
      //     <div className = {styles.uploadfile_submit}><button onClick={this.handleUpload}> MUSIC </button></div>
      //   </div>
      // );
      //
      // const documentBox = (
      //   <div className={styles.uploadfile_box} name="document" encType="multipart/form-data" noValidate>
      //     <input className={styles.uploadfile_box_upload} readOnly="Document" type="file" name="document" onChange={this.handleChange}/>
      //     <button className={styles.uploadfile_box_document} >Document</button>
      //     <div className = {styles.uploadfile_submit}><button onClick={this.handleUpload}> DOCU </button></div>
      //   </div>
      // );
      //
      // const pictureBox = (
      //   <div className={styles.uploadfile_box} name="picture" encType="multipart/form-data" noValidate>
      //     <input className={styles.uploadfile_box_upload} readOnly="Picture" type="file" name="picture" onChange={this.handleChange}/>
      //     <button className={styles.uploadfile_box_picture} >Picture</button>
      //     <div className = {styles.uploadfile_submit}><button onClick={this.handleUpload}> PICTU </button></div>
      //   </div>
      // );

      return(
          <div className ={styles.uploadfile_header}>
            <form className={styles.uploadfile_box} method="post" action="/api/file/music" encType="multipart/form-data" noValidate>
              <input className={styles.uploadfile_box_upload} readOnly="Music" type="file" name="music" onChange = {evt => this.updateMusic(evt)} value = {this.state.inputValue}/>
              <button disabled className={styles.uploadfile_box_music}>Music</button>
              <div className = {styles.uploadfile_submit}><button type="submit"> MUSIC </button></div>
            </form>

            <form className={styles.uploadfile_box} method="post" action="/api/file/picture" encType="multipart/form-data" noValidate>
              <input className={styles.uploadfile_box_upload} readOnly="Picture" type="file" name="picture" onChange = {evt => this.updatePicture(evt)} value = {this.state.inputValue} />
              <button disabled className={styles.uploadfile_box_picture}>Picture</button>
              <div className = {styles.uploadfile_submit}><button type="submit"> PICTU </button></div>
            </form>

            <form className={styles.uploadfile_box} method="post" action="/api/file/document" encType="multipart/form-data" noValidate>
              <input className={styles.uploadfile_box_upload} readOnly="Documents" type="file" name="music"  onChange = {evt => this.updateDocument(evt)} value = {this.state.inputValue}/>
              <button disabled className={styles.uploadfile_box_document}>Documents</button>
              <div className = {styles.uploadfile_submit}><button type="submit"> DOCU </button></div>
            </form>


          </div>
      );
    }
}
Uploadfile.propTypes = {
    rnumber: React.PropTypes.number,
    username: React.PropTypes.string
};

export default Uploadfile;
