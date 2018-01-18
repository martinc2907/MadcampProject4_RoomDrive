import React from 'react';
import styles from '../style.css';
import { Draggable, Savebtn, Uploadfile } from 'components';
import room6 from '../images/room6.jpg';

class MyRoom3 extends React.Component{
    render(){
        return(
          <div className={styles.myroom_box}>
              <Uploadfile rnumber = {3}/>
              <img className={styles.myroom_background} src = {'/'+room6}/>
              <Draggable filetype='picture' />
              <Savebtn />
          </div>
        );
    }
}

export default MyRoom3;
