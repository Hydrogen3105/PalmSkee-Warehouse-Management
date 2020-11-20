import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import { connect } from "react-redux";
import { dialog_state } from "../actions/dialog";
import { edit_user, delete_user, select_user } from "../actions/admin";
import { /*edit_parcel, , delete_parcel*/ add_parcel } from "../actions/parcel";
import { add_warehouse } from "../actions/warehouses";

function QuestionDialog({ dispatch, dialog_state: state, topic, data }) {
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
          .then(() => {
            dispatch(dialog_state(prevState + 1));
          })
          .catch(() => {
            setLoading(false);
          });
        break;

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

      /*
          case 'edit-parcel':
            const edited_parcel = data
            dispatch(edit_parcel())
            .then(() => {
              dispatch(dialog_state(prevState + 1))
            })
            .catch(() => {
              setLoading(false)
            })
          
            case 'delete-parcel':
              const deleted_parcel = data
              dispatch(add_parcel())
              .then(() => {
                dispatch(dialog_state(prevState + 1))
              })
              .catch(() => {
                setLoading(false)
              })*/

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
      >
        <DialogTitle id="alert-dialog-title">
          {topic === "add"
            ? "Confirm Adding Warehouse?"
            : topic === "edit"
            ? "Confirm Editing Warehouse?"
            : topic === "delete"
            ? "Confirm Deleting Warehouse?"
            : topic === "add-user"
            ? "Confirm Adding User"
            : topic === "edit-user"
            ? "Confirm Editing User"
            : topic === "delete-user"
            ? "Confirm Deleting User"
            : topic === "send-analysis"
            ? "Confirm Sending Analysis Report?"
            : topic === "send-request"
            ? "Confirm Sending Request?"
            : topic === "add-parcel"
            ? "Confirm Adding Parcel?"
            : topic === "edit-parcel"
            ? "Confirm Editing Parcel?"
            : topic === "delete-parcel"
            ? "Confirm Deleting Parcel?"
            : topic === "export"
            ? "Confirm Exporting Parcels?"
            : topic === "store" && "Confirm Storing Parcels?"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Back
          </Button>
          <Button
            onClick={() => {
              console.log(data);
            }}
            color="primary"
          >
            Data
          </Button>
          <Button onClick={handleConfirm} color="primary" autoFocus>
            Confirm
            {loading && (
              <span className="spinner-border spinner-border-sm"></span>
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

function mapStateToProp(state) {
  const { dialog_state } = state.dialog;
  const { userId } = state.user;
  return {
    dialog_state,
    userId,
  };
}

export default connect(mapStateToProp)(QuestionDialog);
