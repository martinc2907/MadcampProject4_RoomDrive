import {
  FILE_UPLOAD,
  FILE_UPLOAD_SUCCESS,
  FILE_UPLOAD_FAILURE
} from './ActionTypes';
import axios from 'axios';

//각 함수에 넣을 변수들 정하면 적기!!!!
//uploadRequest()실행시, filetype= music, document, picture인지 변수 받은후, axio다르게 주기...
//roomnumber도 넘겨주기!!!!!
//filename, mimetype, size도 여기서 다시 정리해줘야 하나...?
//uploadSuccess, uploadFailure 등에 넣는 변수 변경하려면 변경하기!!
export function uploadRequest(filetype, roomnumber, username, file, formData){
  return (dispatch) => {
      dispatch(upload());

      // const postpath = '/api/file';
      // if(filetype === 'music'){
      //     const postpath = '/api/file/music';
      // }
      // else if(filetype === 'document'){
      //     const postpath = '/api/file/document';
      // }
      // else if(filetype === 'picture'){
      //     const postpath = '/api/file/picture';
      // }
      console.log(file);
      const btoafile = btoa(file);
      console.log(btoafile);
      const atobfile = atob(btoafile);
      console.log(atobfile);
      console.log(atobfile.name);
      return axios.post( '/api/file/music' , {roomnumber, username, btoafile, formData })
      .then((response) => {
          dispatch(uploadSuccess(username));
      }).catch((error) => {
          dispatch(uploadFailure());
      });
  };
}

export function upload(){
  return{
    type: FILE_UPLOAD
  };
}

export function uploadSuccess(username){
  return{
    type: FILE_UPLOAD_SUCCESS,
    username
  };
}

export function uploadFailure(){
  return{
    type: FILE_UPLOAD_FAILURE
  };
}
