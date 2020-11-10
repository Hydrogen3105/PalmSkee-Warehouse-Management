import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";
import parcel from "./parcel"
import warehouse from './warehouse'
import report from './report'
import dialog from './dialog'

export default combineReducers({
  auth,
  message,
  parcel,
  warehouse,
  report,
  dialog
});