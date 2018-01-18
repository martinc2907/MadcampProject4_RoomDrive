import React from 'react';
import styles from '../style.css';
import { Draggable } from 'components';
// <h1 className = "z-depth-3">Save</h1>
var List = [];
class Getbtn extends React.Component{

    constructor(props){
      super(props);
      this.state = {
          objectlist: []
      };
      this.handleGet = this.handleGet.bind(this);
    }
    // // <Draggable filetype='picture' url={this.state.path} leftpos={"35%"}/>
    //     objectList.forEach(function(object, index) {
    //       // console.log(object);
    //       // this.props.onGetobject()
    //       // <Draggable filetype={object.filetype} url={object.path} leftpos={object.leftpos} toppos={object.toppos} />
    //     });


    handleGet() {
      var req = new XMLHttpRequest();
      req.responseType = "json";
      req.open('GET', "http://143.248.36.235:4000/api/file/get", true );
      var objectList = [];

      req.onload = () => {
        //req.send(null);
        objectList = req.response; // JSON Array 가 올 거고.
        //List = objectList;
        // objectList.forEach(function(object,index){
        //   console.log(object);
        // });
        console.log(objectList + "FUCKSHIT");
        this.props.onGetobject(objectList);
        console.log(objectList + "inside handleget");
      }


      req.send(null);
    }



    render(){
        return(
            <div className={styles.getbtn}>
              <button onClick={this.handleGet}>GET</button>
            </div>
        );
    }
}

export default Getbtn;
//get때 보내는 정보 -> 모든 draggable 위치,-> filename?
