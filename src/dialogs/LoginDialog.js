import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import UserService from "../services/user.service";

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
    if ((newPassword === confirmPassword) && (newPassword !== password)) {
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
    } else {
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
              <span style={{color: "red"}}>Both passwords mismatched</span>
            </DialogContentText> :
            samePasswordError && 
            <DialogContentText>
              <span style={{color: "red"}}>Password is same with old password, please change</span>
            </DialogContentText>
          }
          <TextField
            autoFocus
            margin="dense"
            label="Password"
            type="password"
            name="new"
            value={newPassword}
            onChange={(event) => {
              setNewPassword(event.target.value);
            }}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            label="Confirm Password"
            type="password"
            name="confirm"
            value={confirmPassword}
            onChange={(event) => {
              setConfirmPassword(event.target.value);
            }}
            fullWidth
          />
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
