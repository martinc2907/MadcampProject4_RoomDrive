import authentication from './authentication';
import fileupload from './fileupload';

import { combineReducers } from 'redux';

export default combineReducers({
    authentication, fileupload
});
