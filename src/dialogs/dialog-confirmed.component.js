import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogTitle from '@material-ui/core/DialogTitle'
import { connect } from 'react-redux'
import { dialog_state } from '../actions/dialog'

function ComfirmedDialog({ dispatch, dialog_state:state, topic }) {
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    state === 2 && setOpen(true)
  }, [])

  const handleClose = () => {
    dispatch(dialog_state(0))
    window.location.reload()
    setOpen(false)
  }

  const handleConfirm = () => {
      const prevState = state
      dispatch(dialog_state(prevState + 1))
      window.location.reload()
      setOpen(false)
  }

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{topic === 'add' ? 'Completed Adding Warehouse' : topic === 'edit' ? 'Completed Editing Warehouse' : topic === 'delete' 
        ? 'Completed Deleting Warehouse' : topic === 'add-user' ? 'Completed Adding User' : topic === 'edit-user' ? 'Completed Editing User' : 
        topic === 'delete-user' ? 'Completed Deleting User' : topic === 'send-analysis' ? 'Completed Sending Analysis Report' : topic === 'send-request' ? 'Completed Sending Request' : 
        topic === 'add-parcel' ? 'Completed Adding Parcel' : topic === 'edit-parcel' ? 'Completed Editing Parcel' : topic === 'delete-parcel' ? 'Completed Deleting Parcel' : 
        topic === 'export' ? 'Completed Exporting Parcels' : topic === 'store' && 'Completed Storing Parcels'
        }
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleConfirm} color="primary" autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

function mapStateToProp(state) {
    const {dialog_state} = state.dialog
    return {
        dialog_state,
    }
}

export default connect(mapStateToProp)(ComfirmedDialog)