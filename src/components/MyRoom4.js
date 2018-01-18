import React from 'react';
import styles from '../style.css';
import { Draggable, Savebtn, Uploadfile } from 'components';
import room4 from '../images/room4.jpg';

class MyRoom4 extends React.Component{
    render(){
        return(
          <div className={styles.myroom_box}>
              <Uploadfile rnumber = {4}/>
              <img className={styles.myroom_background} src = {'/'+room4}/>
              <Draggable filetype='music' />
              <Savebtn />
          </div>
        );
    }
}

export default MyRoom4;
