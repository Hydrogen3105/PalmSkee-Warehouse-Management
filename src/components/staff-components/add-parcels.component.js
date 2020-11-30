import React , { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect , Link } from 'react-router-dom'
import { Button } from '@material-ui/core'
import { history } from '../../helpers/history'

import QuestionDialog from '../../dialogs/dialog.component'
import ConfirmedDialog from '../../dialogs/dialog-confirmed.component'
import { dialog_state } from '../../actions/dialog'

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import Select from "react-validation/build/select";

import SearchService from '../../services/sender-service'
import SendersTable from './sender-table.component'

import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'

const required = (value) => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          This field is required!
        </div>
      );
    }
};

const vsize = (value) => {
    if(value > 1000) {
        return (
        <div className="alert alert-danger" role="alert">
          This field needs to be below than or equal 1000 mm!
        </div>
        )
    }else if(value < 0) {
        return (
        <div className="alert alert-danger" role="alert">
          This field needs to be over than 0!
        </div>
        )
    }
}

const vweight = (value) => {
    if(value.includes('.')){
        const sep = value.split('.')
        if(sep[1].length !== 2){
            return (
                <div className="alert alert-danger" role="alert">
                    This field needs to have just 2 digits!
                </div>
            )
        }
    }else if(value < 0) {
        return (
            <div className="alert alert-danger" role="alert">
                This field needs to be over than 0!
            </div>
        )
    }
}

class AddParcel extends Component {
    constructor(props) {
        super(props)
        this.state = {
            width: 0,
            height: 0,
            length: 0,
            weight: 0,
            fromWarehouseId: "",
            toWarehouseId: "",
            optional: "",
            senderId: "",
            isLoading: true,
            isSameLocation: false,
            allWarehouses: [],
            allSenders: []
        }
        
        this.handleBack = this.handleBack.bind(this)
        this.handleAdd = this.handleAdd.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount() {
        this.props.dispatch(dialog_state(0))
        this.setState({
            fromWarehouseId: this.props.userData.warehouseId,
        })
        SearchService.searchSender().then((response) => {
            const all_senders = response.data.payload.map((sender) => {
                return {
                    ...sender,
                    id: sender.senderId
                }
            })
            this.setState({
                allSenders: all_senders,

            })
        }).then(() => {
            SearchService.searchWarehouses().then(response => {
                this.setState({
                    allWarehouses: response.data.payload,
                    isLoading: false
                })
                },(error) => {
                    this.setState({
                        isLoading: false
                    })
                }
            )
        })
        
    }

    onSelectSender = (senderId) => {
        this.setState({
            senderId
        })
    }

    handleChange (e) {
        const {name , value} = e.target
        this.setState({
            [name]: value
        })
    }

    handleBack() {
        history.push('/parcels')
    }

    handleAdd(e) {
        e.preventDefault();
        this.setState({
            isSameLocation: false
        })
        this.form.validateAll()
        if (this.checkBtn.context._errors.length === 0 && this.state.fromWarehouseId !== this.state.toWarehouseId && this.state.fromWarehouseId !== '' && this.state.toWarehouseId !== '') {
            this.props.dispatch(dialog_state(1));
            this.setState({
                isSameLocation: false
            })
        }else if(this.state.fromWarehouseId === this.state.toWarehouseId && this.state.fromWarehouseId !== '' && this.state.toWarehouseId !== ''){
            this.setState({
                isSameLocation: true
            })
        }
    }

    render () {
        const { user: currentUser } = this.props

        if(!currentUser){
            return <Redirect to="/login"/>
        }else if(currentUser.payload[0].position !== "staff" && currentUser.payload[0].position !== "manager") {
            return <Redirect to="/home" />
        }

        const { senderId, fromWarehouseId, toWarehouseId, width, length, height, weight, optional } = this.state
        const payload_data = { senderId, fromWarehouseId, toWarehouseId, width: parseInt(width), length: parseInt(length), height: parseInt(height), weight: parseFloat(weight), optional }
        return (
            <div>
                <h2>Add New Parcel</h2>
                <div id='outer'>
                    <div className='inner'>
                        <Link to="/add-parcel">
                            <Button variant="contained" color="primary">
                                New
                            </Button>
                        </Link>
                    </div>
                    <div className='inner'>
                        <Link to="/stored-parcels">
                            <Button variant="contained" color="secondary">
                                Stored
                            </Button>
                        </Link>
                    </div>
                    <div className='inner'>
                        <Link to="/exported-parcels">
                            <Button variant="contained" color="primary">
                                Exported
                            </Button>
                        </Link>
                    </div>
                </div>

                <div className='center' style={{ display: "flex", justifyContent: "space-between", flexDirection: 'column',width: 1000 }}>
                    <div>
                        <Form   onSubmit={this.handleAdd}
                                ref={(c) => this.form = c}
                        >
                            <div className="register-card" style={{ width: 1000 }}>
                                
                                <div style={{ display: "flex", justifyContent: "space-around" }}>
                                    <div>
                                        {""}
                                        <h4>Detail</h4>
                                        <div className="form-group">
                                            <label htmlFor="width">Width</label>
                                            <Input  type="number"
                                                    name="width"
                                                    className="form-control"
                                                    value={this.state.width}
                                                    onChange={this.handleChange}
                                                    validations = {[required, vsize]}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="height">Height</label>
                                            <Input  type="number"
                                                    name="height"
                                                    className="form-control"
                                                    value={this.state.height}
                                                    onChange={this.handleChange}
                                                    validations = {[required, vsize]}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="length">Length</label>
                                            <Input  type="number"
                                                    name="length"
                                                    className="form-control"
                                                    value={this.state.length}
                                                    onChange={this.handleChange}
                                                    validations = {[required, vsize]}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="weight">Weight</label>
                                            <Input  type="number"
                                                    name="weight"
                                                    className="form-control"
                                                    value={this.state.weight}
                                                    onChange={this.handleChange}
                                                    validations = {[required, vweight]}
                                            />
                                        </div>
                                        
                                        <div className="form-group">
                                            <h4>Optional</h4>
                                            <textarea   name="optional"
                                                        value={this.state.optional}
                                                        className="form-control"
                                                        style={{width: 350, height: 150}}
                                                        placeholder="optional"
                                                        onChange={this.handleChange}
                                                        
                                            />
                                        </div>
                                        {""}
                                    </div>
                                    <div>
                                        {""}
                                        <h4>Sender</h4>
                                        <div className="form-group">
                                            <Input  type="text"
                                                    name="senderId"
                                                    className="form-control"
                                                    value={this.state.senderId}
                                                    onChange={this.handleChange}
                                                    validations = {[required]}
                                                    style={{width: 350,marginBottom: 10}}
                                            />
                                            { !this.state.isLoading && <SendersTable senders={this.state.allSenders} onSelectSender={this.onSelectSender}/>} 
                                        </div>
                                        <h4 style={{marginBottom: 15}}>Destination</h4>
                                        { this.state.fromWarehouseId === this.state.toWarehouseId && this.state.isSameLocation && 
                                                <div className="form-group">
                                                    <div className="alert alert-danger" role="alert">
                                                        Origin and Destination must not the same place!
                                                    </div>
                                                </div>
                                        }
                                        <div className="form-group">
                                            <Select name='fromWarehouseId' 
                                                    value={this.state.fromWarehouseId}
                                                    onChange={this.handleChange}
                                                    validations= {[required]}
                                                    className='form-control'
                                                    disabled
                                            >
                                                <option value={this.state.fromWarehouseId}>{this.state.fromWarehouseId}</option>
                                            </Select>
                                        </div>
                                        <div className="form-group">
                                            <Select name='toWarehouseId' 
                                                    value={this.state.toWarehouseId}
                                                    onChange={this.handleChange}
                                                    validations= {[required]}
                                                    className='form-control'
                        
                                            >
                                                <option value=''>Choose parcel's destination</option>
                                                { this.state.allWarehouses.map(warehouse => {
                                                    return <option key={warehouse.warehouseId} value={warehouse.warehouseId}>{warehouse.warehouseId} {warehouse.name}</option>
                                                })}
                                            </Select>
                                        </div>
                                        {""}
                                    </div>
                                </div>

                            </div>
                            
                            <CheckButton
                                style={{ display: "none" }}
                                ref={(c) => {
                                    this.checkBtn = c;
                                }}
                            />
                        </Form>
                        
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
                    <QuestionDialog topic='add-parcel' data={payload_data}/> :
                    this.props.dialog_state === 2 && 
                    <ConfirmedDialog topic='add-parcel' />
                }
                    
            </div>
        )
    }
}

function mapStateToProp(state) {
    const { user } = state.auth
    const { dialog_state } = state.dialog
    const { userData } = state.currentUser
    return {
        user,
        dialog_state,
        userData,
    }
}

export default connect(mapStateToProp)(AddParcel)