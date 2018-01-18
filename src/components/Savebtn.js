import React from 'react';
import styles from '../style.css';
// <h1 className = "z-depth-3">Save</h1>

class Savebtn extends React.Component{
  constructor(props){
    super(props);
    this.handleSave = this.handleSave.bind(this);
  }

  handleSave(){

    console.log("SAVE");
    var http = new XMLHttpRequest();
    var url = "http://143.248.36.235:4000/api/file/save";
    http.open("POST",url, true);
    http.setRequestHeader('Content-type', "application/json");
    console.log("SAVE2");
    http.onreadystatechange = function(){
      if(http.readyState == 4 && http.status == 200) {
        alert(http.responseText);
      }
    };
    console.log(this.props.array);
    console.log(typeof this.props.array);
    http.send(JSON.stringify(this.props.array));

  }
    render(){
        return(<div className={styles.savebtn}>
          <button onClick={this.handleSave}>Save</button>
        </div>
        );
    }
}

export default Savebtn;
//get때 보내는 정보 -> 모든 draggable 위치,-> filename?

// function httpGetAsync(theUrl, callback)
// {
//     var xmlHttp = new XMLHttpRequest();
//     xmlHttp.onreadystatechange = function() {
//         if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
//             callback(xmlHttp.responseText);
//     }
//     xmlHttp.open("GET", theUrl, true); // true for asynchronous
//     xmlHttp.send(null);
// }
