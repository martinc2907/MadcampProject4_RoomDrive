import React from 'react';
import styles from '../style.css';
import room7 from '../images/room7.jpg';
import room2 from '../images/room2.jpg';
import room6 from '../images/room6.jpg';
import room4 from '../images/room4.jpg';
import { Link } from 'react-router';
//<img src = {room1}/>하고싶다... 나주에 예준이 물어보기....
// <Link to ={`/${this.props.username}`+ "/1"}>
class Chooseroom extends React.Component{
    render(){
        return(
          <div className ={styles.chooseroom_box}>
            <p>Choose your room</p>
              <div className={styles.chooseroom_img}>
                  <Link to ="/1"><img className = "z-depth-5" src = {'/'+room7}/></Link>
                  <Link to ="/2"><img className = "z-depth-5" src = {'/'+room2}/></Link>
                  <Link to ="/3"><img className = "z-depth-5" src = {'/'+room6}/></Link>
                  <Link to ="/4"><img className = "z-depth-5" src = {'/'+room4}/></Link>
              </div>
          </div>
        );
    }
}

export default Chooseroom;
