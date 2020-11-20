import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";
import parcel from "./parcel"
import warehouse from './warehouse'
import report from './report'
import dialog from './dialog'
import user from './user'
import status from './status'
import currentUser from './current_user'

export default combineReducers({
  auth,
  message,
  parcel,
  warehouse,
  report,
  dialog,
  user,
  status,
  currentUser,
});