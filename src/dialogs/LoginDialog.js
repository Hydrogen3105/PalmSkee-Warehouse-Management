import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import UserService from "../services/user.service";
import { textFieldStyle } from '../styles/material-style'

import { login_status } from "../actions/auth";
import { clearMessage } from "../actions/message";
import { connect } from "react-redux";

function LoginDialog({ isOpen, dispatch, userId, password }) {
  const [open, setOpen] = React.useState(false);
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [error,setError] = React.useState(false);
  const [samePasswordError, setSamePasswordError] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)
  const [blankNew, setBlankNew] = React.useState(false)
  const [blankConfirmNew, setBlankConfirmNew] = React.useState(false)

  React.useEffect(() => {
    if (isOpen) {
      setOpen(true);
    }
  }, []);

  const handleClose = () => {
    dispatch(login_status(""));
    dispatch(clearMessage());
    setOpen(false);
  };

  const onChangePassword = () => {
    setError(false)
    setSamePasswordError(false)
    setIsLoading(true)
    setBlankNew(false)
    setBlankConfirmNew(false)

    if ((newPassword === confirmPassword) && (newPassword !== password) && (newPassword !== "") && (confirmPassword !== "")) {
      const oldPassword = password;
      UserService.changePassword(userId, oldPassword, newPassword)
      .then(() => {
        setIsLoading(false)
        handleClose()
        window.location.reload()
      })
      .catch(() => {
        setIsLoading(false)
      })
    } else if((newPassword === confirmPassword) && (newPassword === password)){
      setIsLoading(false)
      setSamePasswordError(true)
    } else if( newPassword === "" && confirmPassword === ""){
      setIsLoading(false)
      setBlankNew(true)
      setBlankConfirmNew(true)
    } else if(newPassword === ""){
      setIsLoading(false)
      setBlankNew(true)
    } else if(confirmPassword === ""){
      setIsLoading(false)
      setBlankConfirmNew(true)
    } else if(newPassword !== confirmPassword){
      setIsLoading(false)
      setError(true)
    } 
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        className="dialog"
      >
        <DialogTitle id="form-dialog-title">
          Please enter your password 
        </DialogTitle>
        <DialogContent>
          {
            error ? 
            <DialogContentText>
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                    Both password mismatched!
                </div>
              </div>
            </DialogContentText> :
            samePasswordError && 
            <DialogContentText>
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                    This new password is samw as previous password!
                </div>
              </div>
            </DialogContentText>
          }
          <div className='form-group'>
            <label>Password
              <input  type="password"
                      name="new"
                      className="form-control"
                      value={newPassword}
                      onChange={(event) => {
                        setNewPassword(event.target.value);
                      }}
              />
            </label>
            {
              newPassword === "" && blankNew &&
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                    This field is required!
                </div>
              </div>
            }
            <label>Confirm Password
              <input  type="password"
                      name="confirm"
                      className="form-control"
                      value={confirmPassword}
                      onChange={(event) => {
                        setConfirmPassword(event.target.value);
                      }}
              />
            </label>
            {
              confirmPassword === "" && blankConfirmNew &&
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  This field is required!
                </div>
              </div>
            }
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={onChangePassword} color="primary">
              {isLoading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default connect()(LoginDialog);
