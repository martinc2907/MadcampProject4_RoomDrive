import * as types from 'actions/ActionTypes';
import update from 'react-addons-update';

const initialState = {
  upload: {
    status: 'INIT'
  },
  status: {
  }
}

export default function fileupload(state, action){
    if(typeof state === "undefined")
        state = initialState;

    switch(action.type){
      case types.FILE_UPLOAD:
        return update(state, {
            upload: {
                status: { $set: 'WAITING' }
            }
        });

      case types.FILE_UPLOAD_SUCCESS:
        return update(state, {
            upload: {
                status: { $set: 'SUCCESS' }
            },

        });

      case types.FILE_UPLOAD_FAILURE:
        return update(state, {
            upload:{
                status: { $set: 'FAILURE'}
            }
        });

      default:
        return state;
    }
}
