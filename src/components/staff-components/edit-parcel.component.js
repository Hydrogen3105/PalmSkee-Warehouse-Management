import React , { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect , Link } from 'react-router-dom'
import { history } from '../../helpers/history'

import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'

import QuestionDialog from '../../dialogs/dialog.component'
import ConfirmedDialog from '../../dialogs/dialog-confirmed.component'
import { dialog_state } from '../../actions/dialog'

class EditParcel extends Component {
    constructor(props) {
        super(props)
        this.state = {
            width: 0,
            height: 0,
            length: 0,
            weight: 0,
            from_wh: "",
            destination: "",
            optional: "",
        }
        
        this.handleBack = this.handleBack.bind(this)
        this.handleAdd = this.handleAdd.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount() {
        this.props.dispatch(dialog_state(0))
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
                <h2>Edit Parcel of {this.props.parcel_id}</h2>
                <div className="card card-container-staff">
                    <h4>Detail</h4>
                    <div className="form-group">
                        <label htmlFor="width">Width</label>
                        <input  type="number"
                                name="width"
                                value={this.state.width}
                                onChange={this.handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="height">Height</label>
                        <input  type="number"
                                name="height"
                                value={this.state.height}
                                onChange={this.handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="length">Length</label>
                        <input  type="number"
                                name="length"
                                value={this.state.length}
                                onChange={this.handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="weight">Weight</label>
                        <input  type="number"
                                name="weight"
                                value={this.state.weight}
                                onChange={this.handleChange}
                        />
                    </div>
                    <h4>Destination</h4>
                    <div className="form-group">
                        <label htmlFor="from_wh">From</label>
                        <input  type="text"
                                name="from_wh"
                                value={this.state.from_wh}
                                onChange={this.handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <FormControl>
                            <InputLabel>To</InputLabel>
                            <Select name="destination"
                                    value={this.state.destination}
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
                    <h4>Optional</h4>
                    <div className="form-group">
                        <label htmlFor="optional">From</label>
                        <textarea   name="optional"
                                    value={this.state.optional}
                                    style={{width: 300, height: 150}}
                                    placeholder="optional"
                                    onChange={this.handleChange}
                                    
                        />
                    </div>
                </div>
                {
                    this.props.dialog_state === 1 ? 
                    <QuestionDialog topic='edit-parcel' /> :
                    this.props.dialog_state === 2 && 
                    <ConfirmedDialog topic='edit-parcel' />
                }

                <div>
                        <button className="btn btn-danger btn-block" 
                                style={{width: 100}}
                                onClick={this.handleBack}
                        >
                                Back
                        </button>
                        <button className="btn btn-primary btn-block" 
                                style={{width: 100}}
                                onClick={this.handleAdd}
                        >
                                Confirm
                        </button>
                </div>    
            </div>
        )
    }
}

function mapStateToProp(state) {
    const { user } = state.auth
    const { parcel_id } = state.parcel
    const { dialog_state } = state.dialog
    return {
        user,
        parcel_id,
        dialog_state,
    }
}


export default connect(mapStateToProp)(EditParcel)