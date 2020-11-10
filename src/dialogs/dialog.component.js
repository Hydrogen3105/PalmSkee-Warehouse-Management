import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogTitle from '@material-ui/core/DialogTitle'
import { connect } from 'react-redux'
import { dialog_state } from '../actions/dialog'
import { edit_user, delete_user } from '../actions/admin'

function QuestionDialog({ dispatch, dialog_state:state, topic, data }) {
  const [open, setOpen] = React.useState(false)
  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    state === 1 && setOpen(true)
  }, [])

  const handleClose = () => {
    dispatch(dialog_state(0))
    setOpen(false)
  }

  const handleConfirm = () => {
      const prevState = state
      setLoading(true)

      switch(topic){
        
        case 'edit-user':
            const { userId, firstName, lastName, address, zipCode, city, country, dob, gender, email, phone, warehouseId } = data
            dispatch(edit_user(userId, firstName, lastName, address, zipCode, city, country, dob, gender, email, phone, warehouseId))
                    .then(() => {
                        dispatch(dialog_state(prevState + 1))
                    })
                    .catch(() => {
                      setLoading(false)
                    })
            break
        
        case 'delete-user':
          const selected_userId = data
          dispatch(delete_user(selected_userId))
          .then(() => {
            dispatch(dialog_state(prevState + 1))
          })
          .catch(() => {
            setLoading(false)
          })
          break

        default:
           dispatch(dialog_state(prevState + 1))
           break
      }
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
        <DialogTitle id="alert-dialog-title">
          { topic === 'add' ? 'Confirm Adding Warehouse?' : topic === 'edit' ? 'Confirm Editing Warehouse?' : topic === 'delete' 
            ? 'Confirm Deleting Warehouse?' : topic === 'add-user' ? 'Confirm Adding User' : topic === 'edit-user' ? 'Confirm Editing User' : topic === 'delete-user' ? 'Confirm Deleting User' :
            topic === 'send-analysis' ? 'Confirm Sending Analysis Report?' : topic === 'send-request' ? 'Confirm Sending Request?' : topic === 'add-parcel' ? 'Confirm Adding Parcel?' 
            : topic === 'edit-parcel' ? 'Confirm Editing Parcel?' : topic === 'delete-parcel' ? 'Confirm Deleting Parcel?' :topic === 'export' ? 'Confirm Exporting Parcels?' : 
            topic === 'store' && 'Confirm Storing Parcels?'
          }
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Back
          </Button>
          <Button onClick={() => {console.log(data)}} color="primary">
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
  )
}

function mapStateToProp(state) {
    const {dialog_state} = state.dialog
    return {
        dialog_state,
    }
}

export default connect(mapStateToProp)(QuestionDialog)