import React , { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect , Link } from 'react-router-dom'
import { history } from '../../helpers/history'

import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'

import QuestionDialog from '../../dialogs/dialog.component'
import ConfirmedDialog from '../../dialogs/dialog-confirmed.component'
import { dialog_state } from '../../actions/dialog'

import { edit_parcel } from '../../actions/parcel'
import ParcelService from '../../services/parcel-service'

class EditParcel extends Component {
    constructor(props) {
        super(props)
        this.state = {
            toWarehouseId: "",
            lastestStatus: "",
            optional: "",
            isLoading: true,
        }
        
        this.handleBack = this.handleBack.bind(this)
        this.handleAdd = this.handleAdd.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount() {
        this.props.dispatch(dialog_state(0))
        ParcelService.getPacelById(this.props.parcelId)
        .then((response) => {
            this.setState({
                parcel: response.data.payload[0],
                isLoading: false,
            })
        }).then(() => {
            const { toWarehouseId, lastestStatus, optional } = this.state.parcel
            this.setState({
                toWarehouseId,
                lastestStatus,
                optional
            })
        })
    }

    handleChange (e) {
        const {name , value} = e.target
            this.setState({
                [name]: value
            })
    }

    handleBack() {
        history.push('/parcel-detail')
    }

    handleAdd() {
        this.props.dispatch(dialog_state(1))
    }
    
    render () {
        const {user: currentUser } = this.props

        if(!currentUser) {
            return <Redirect to='/login' />
        }
        else if(currentUser.payload[0].position !== 'staff' && currentUser.payload[0].position !== 'manager'){
            return <Redirect to='/home' />
        }

        return (
            <div className="col-md-12">
                <h2>Edit Parcel of {this.props.parcelId}</h2>
                <div className='menu-and-button center'>
                    <div>
                        <div className="card card-container-staff">
                            <h4>Detail</h4>
                            <br />
                            <div className="form-group">
                                <FormControl>
                                    <InputLabel>Destination</InputLabel>
                                    <Select name="toWarehouseId"
                                            value={this.state.toWarehouseId}
                                            onChange={this.handleChange}
                                            style={{ width: 250}}
                                    >
                                    {/* this.state.allUser.map(user => {
                                        return <MenuItem    key={user.user_id} 
                                                            value={user.user_id}
                                                >
                                                    <span>
                                                        <strong>{user.user_id}</strong> {user.first_name} {user.last_name}
                                                    </span>
                                                </MenuItem>
                                        })*/}
                                        <MenuItem value="WH112">WH112 O-Koi</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                            <div className="form-group">
                                <FormControl>
                                    <InputLabel>Status</InputLabel>
                                    <Select name="lastestStatus"
                                            value={this.state.lastestStatus}
                                            onChange={this.handleChange}
                                            style={{ width: 250}}
                                    >
                                        <MenuItem value="stored">Stored</MenuItem>
                                        <MenuItem value="exported">Exported</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                            <h4>Optional</h4>
                            <div className="form-group">
                                <label htmlFor="optional">From</label>
                                <textarea   name="optional"
                                            className='form-control'
                                            value={this.state.optional}
                                            style={{width: 300, height: 150}}
                                            placeholder="optional"
                                            onChange={this.handleChange}
                                            
                                />
                            </div>
                        </div>
                    </div>
                    
                    <div className="button-back-comfirm">
                        <div>
                            <button className="btn btn-danger btn-block" 
                                    style={{width: 100}}
                                    onClick={this.handleBack}
                            >
                                Back
                            </button>
                        </div>
                        <div>
                            <button className="btn btn-primary btn-block" 
                                    style={{width: 100}}
                                    onClick={this.handleAdd}
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
                { this.state.isLoading && (
                    <Dialog
                    open={this.state.isLoading}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">
                            <span className="spinner-border spinner-border-sm"></span>
                            Loading...
                        </DialogTitle>
                    </Dialog>
                    )
                }
                 
                {
                    this.props.dialog_state === 1 ? 
                    <QuestionDialog topic='edit-parcel' /> :
                    this.props.dialog_state === 2 && 
                    <ConfirmedDialog topic='edit-parcel' />
                }
                {/*Ending*/}    
            </div>
        )
    }
}

function mapStateToProp(state) {
    const { user } = state.auth
    const { parcelId } = state.parcel
    const { dialog_state } = state.dialog
    return {
        user,
        parcelId,
        dialog_state,
    }
}


export default connect(mapStateToProp)(EditParcel)