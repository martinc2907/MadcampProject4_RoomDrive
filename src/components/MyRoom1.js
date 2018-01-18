import React from 'react';
import ReactDOM from 'react-dom';
import styles from '../style.css';
import { Draggable, Savebtn, Uploadfile, Getbtn } from 'components';
import room7 from '../images/room7.jpg';
// <Uploadfile rnumber = {1}/>
//Uploadfile: inputValue -> name & path -> p
//if click=1 -> means we click button to show icon! -> <Draggable /> call
class MyRoom1 extends React.Component{

    constructor(props){
      super(props);
      this.state = {
          inputValue: "",
          path: "",
          filetype: "",
          objectlist: [],
          array: []
      };
      this.handlechangeValue = this.handlechangeValue.bind(this);
      this.handleGetobject = this.handleGetobject.bind(this);
      this.handlePositionChange= this.handlePositionChange.bind(this);
    }

    handlechangeValue( name, p, ftype){
      this.setState({
          inputValue: name,
          path: p,
          filetype: ftype
      });
    }

    handleGetobject(objectList){
        this.setState({
            objectlist : objectList
        });
    }

    handlePositionChange(i, top, left){
      //set state of objectlist. update ith object's position.
      var temp = this.state.objectlist;
      temp[i].leftpos = left;
      temp[i].toppos = top;

      console.log(top);
      console.log(left);
      console.log(temp);
      this.setState({
        objectlist: temp
      });

    }

    render(){

        return(
          <div className={styles.myroom_box}>
              <img className={styles.myroom_background} src = {'/'+room7}/>
              <Uploadfile rnumber = {1} onchangeValue={this.handlechangeValue}/>
              <Getbtn onGetobject={this.handleGetobject}/>

              {this.state.objectlist.map((x,i) => {
                console.log(i);
                var temp = x.path;
                temp = temp.replace('public', '');
                return <Draggable func ={this.handlePositionChange} index = {i} filetype={x.filetype} url={"143.248.36.235:4000"+temp} leftpos={x.leftpos} toppos={x.toppos}/>
              ;})
            }
            <Savebtn array = {this.state.objectlist}/>
          </div>
        );
    }
}
// inputValue: "",
// path: ""
export default MyRoom1;
