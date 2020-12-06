import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import { red } from '@material-ui/core/colors';
import { ColorButton, GreyButton } from '../styles/material-style'
import { connect } from "react-redux";
import { dialog_state } from "../actions/dialog";
import { edit_user, delete_user, select_user } from "../actions/admin";
import { register } from '../actions/auth'
import {
  delete_parcel,
  edit_parcel,
  edit_status,
  add_parcel,
} from "../actions/parcel";
import { SET_MESSAGE } from "../actions/types";
import {
  add_warehouse,
  delete_warehouse,
  edit_warehouse,
  select_warehouse,
} from "../actions/warehouses";

function QuestionDialog({
  dispatch,
  dialog_state: state,
  topic,
  data,
  message,
}) {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    state === 1 && setOpen(true);
  }, []);

  const handleClose = () => {
    dispatch(dialog_state(0));
    setOpen(false);
  };

  const handleConfirm = () => {
    const prevState = state;
    setLoading(true);

    switch (topic) {
      case 'add-user':
        var {
          userId,
          firstName,
          position,
          lastName,
          address,
          zipCode,
          city,
          country,
          dob,
          gender,
          email,
          phone,
          warehouseId,
        } = data;
        dispatch(
          register(
            userId,
            firstName,
            lastName,
            position,
            address,
            zipCode,
            city,
            country,
            dob,
            gender,
            email,
            phone,
            warehouseId
          )
        )
          .then(() => {
            dispatch(dialog_state(prevState + 1));
          })
          .catch(() => {
            setLoading(false);
          });
        break;
      case "edit-user":
        var {
          userId,
          firstName,
          lastName,
          address,
          zipCode,
          city,
          country,
          dob,
          gender,
          email,
          phone,
          warehouseId,
        } = data;
        dispatch(
          edit_user(
            userId,
            firstName,
            lastName,
            address,
            zipCode,
            city,
            country,
            dob,
            gender,
            email,
            phone,
            warehouseId
          )
        )
          .then(() => {
            dispatch(dialog_state(prevState + 1));
            dispatch(select_user(""));
          })
          .catch(() => {
            setLoading(false);
          });
        break;

      case "delete-user":
        var selected_userId = data;
        dispatch(delete_user(selected_userId))
          .then(() => {
            dispatch(dialog_state(prevState + 1));
          })
          .catch(() => {
            setLoading(false);
          });
        break;

      case "add-parcel":
        var {
          senderId,
          fromWarehouseId,
          toWarehouseId,
          width,
          length,
          height,
          weight,
          optional,
        } = data;
        dispatch(
          add_parcel(
            senderId,
            fromWarehouseId,
            toWarehouseId,
            width,
            length,
            height,
            weight,
            optional
          )
        )
          .then(
            () => {
              dispatch(dialog_state(prevState + 1));
            },
            (error) => {
              const message =
                (error.response &&
                  error.response.data &&
                  error.response.data.success) ||
                error.message ||
                error.toString();

              dispatch({
                type: SET_MESSAGE,
                payload: message,
              });
            }
          )
          .catch(() => {
            setLoading(false);
          });
        break;

      case "edit-parcel":
        dispatch(edit_parcel(data.parcelId, data.optional))
          .then(() => {
            dispatch(dialog_state(prevState + 1));
          })
          .catch(() => {
            setLoading(false);
          });

        break;

      case 'delete-parcel':
        const deleted_parcel = data.parcels
        deleted_parcel.map((parcelId) => {
          dispatch(delete_parcel(parcelId))
            .then(() => {
              dispatch(dialog_state(prevState + 1))
            })
            .catch(() => {
              setLoading(false)
            })
        })
        break

      case 'store':
        var { status, updateBy, parcels } = data
        dispatch(edit_status(status, updateBy, parcels)).then(() => {
          dispatch(dialog_state(prevState + 1))
        })
          .catch(() => {
            setLoading(false)
          })
        break

      case 'export':
        dispatch(edit_status(data.status, data.updateBy, data.parcels)).then(() => {
          dispatch(dialog_state(prevState + 1))
        })
          .catch(() => {
            setLoading(false)
          })
        break

      case "add":
        var {
          name,
          address,
          zipCode,
          country,
          city,
          coordinates,
          phone,
          type,
          managerId,
          status,
        } = data;
        dispatch(
          add_warehouse(
            name,
            address,
            zipCode,
            country,
            city,
            coordinates,
            phone,
            type,
            managerId,
            status
          )
        )
          .then(() => {
            dispatch(dialog_state(prevState + 1));
          })
          .catch(() => {
            setLoading(false);
          });
        break;

      case "delete":
        var select_warehouse = data;
        dispatch(delete_warehouse(select_warehouse))
          .then(() => {
            dispatch(dialog_state(prevState + 1));
          })
          .catch(() => {
            setLoading(false);
          });

        break;

      case "edit":
        var {
          warehouseId,
          name,
          address,
          zipCode,
          country,
          city,
          coordinates,
          phone,
          type,
          managerId,
          status,
        } = data;
        dispatch(
          edit_warehouse(
            warehouseId,
            name,
            address,
            zipCode,
            country,
            city,
            coordinates,
            phone,
            type,
            managerId,
            status
          )
        )
          .then(() => {
            dispatch(dialog_state(prevState + 1));
            dispatch(select_warehouse(""));
          })
          .catch(() => {
            setLoading(false);
          });
        break;

      default:
        dispatch(dialog_state(prevState + 1));
        setOpen(false);
        break;
    }
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth={true}
        maxWidth={'xs'}
      >

        <DialogTitle id="alert-dialog-title" style={{ textAlign: "center" }}>
          <div style={{ display: "flex", flexDirection: 'column' }}>
            <div style={{marginBottom: 15}}>
              <ErrorOutlineIcon style={{ textAlign: "center", color: red[900], width: 100, height: 'auto'}} />
            </div>
            <div>
              <strong>
                {topic === "add"
                  ? "Confirm Adding Warehouse ?"
                  : topic === "edit"
                    ? "Confirm Editing Warehouse ?"
                    : topic === "delete"
                      ? "Confirm Deleting Warehouse ?"
                      : topic === "add-user"
                        ? "Confirm Adding User ?"
                        : topic === "edit-user"
                          ? "Confirm Editing User ?"
                          : topic === "delete-user"
                            ? "Confirm Deleting User ?"
                            : topic === "send-analysis"
                              ? "Confirm Sending Analysis Report ?"
                              : topic === "send-request"
                                ? "Confirm Sending Request ?"
                                : topic === "add-parcel"
                                  ? "Confirm Adding Parcel ?"
                                  : topic === "edit-parcel"
                                    ? "Confirm Editing Parcel ?"
                                    : topic === "delete-parcel"
                                      ? "Confirm Deleting Parcel ?"
                                      : topic === "export"
                                        ? "Confirm Exporting Parcels ?"
                                        : topic === "store" && "Confirm Storing Parcels ?"}
              </strong>
            </div>
          </div>


        </DialogTitle>
        <DialogActions style={{ display: "flex", justifyContent: "space-around" }}>
          <GreyButton onClick={handleClose} color="primary">
            Back
          </GreyButton>
          <ColorButton onClick={handleConfirm} color="primary" autoFocus>
            Confirm
            {loading && (
              <span className="spinner-border spinner-border-sm"></span>
            )}
          </ColorButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}

function mapStateToProp(state) {
  const { dialog_state } = state.dialog;
  const { userId } = state.user;
  const { message } = state.message;
  return {
    dialog_state,
    userId,
    message,
  };
}

export default connect(mapStateToProp)(QuestionDialog);
