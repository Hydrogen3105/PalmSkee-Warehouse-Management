import React, { Component } from "react"
import { Redirect } from "react-router-dom"
import { connect } from "react-redux"

import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'

import { history } from '../../helpers/history'
import { dialog_state } from '../../actions/dialog'
import QuestionDialog from '../../dialogs/dialog.component'
import ComfirmedDialog from '../../dialogs/dialog-confirmed.component'

import AdminService from '../../services/admin-service'

class AddWarehouse extends Component {
    constructor(props){
        super(props)
        this.state = {
            allUser: [],
            warehouse_name: "",
            warehouse_address: "",
            warehouse_zip: "",
            warehouse_city: "",
            warehouse_country: "",
            capacity: 0,
            contact: "",
            number_staffs: 0,
            manager_id: "",
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleAdd = this.handleAdd.bind(this)
    }
 
    componentDidMount() {
        this.props.dispatch(dialog_state(0))
        AdminService.getAllUsers().then(response => {
            this.setState({
                allUser: response.data.payload
            })
        })
    }

    handleChange(e) {
        const { name, value } = e.target
        this.setState({
            [name]: value
        })
    }

    handleBack() {
        history.push('/manage-warehouse')
    }

    handleAdd () {
        this.props.dispatch(dialog_state(1))
    }

    render () {
        const { user: currentUser } = this.props
        const { position } = currentUser.payload[0]

        if(!currentUser) {
            return <Redirect to='/login' />
        }
        else if(position !== 'admin'){
            return <Redirect to='/home' />
        }

        const allManagers= this.state.allUser.filter(user => user.position === 'manager')

        return (
            <div>
                <h3>Adding New Warehouse</h3>
                <div className='menu-and-button center'>
                    <div className="card card-container-edit-user">
                        <form>
                            <h4>Detail</h4>
                            <div className='form-group'>
                                <h5>Warehouse name</h5>
                                <input  type='text'
                                        name='warehouse_name'
                                        value={this.state.warehouse_name}
                                        onChange={this.handleChange}
                                        className='form-control'
                                />
                            </div>

                            <div className='form-group'>
                                <h5>Warehouse Address</h5>
                                <textarea type='text'
                                        style= {{width: 300}}
                                        name='warehouse_address'
                                        placeholder='Address Detail...'
                                        value={this.state.warehouse_address}
                                        onChange={this.handleChange}
                                        className='form-control'
                                />
                                <br />
                                <input  type='text'
                                        name='warehouse_zip'
                                        style= {{width: 300}}
                                        placeholder='Zip Code'
                                        value={this.state.warehouse_zip}
                                        onChange={this.handleChange}
                                        className='form-control'
                                />
                                <br />
                                <input  type='text'
                                        name='warehouse_city'
                                        style= {{width: 300}}
                                        placeholder='City'
                                        value={this.state.warehouse_city}
                                        onChange={this.handleChange}
                                        className='form-control'
                                />
                                <br />
                                <input  type='text'
                                        name='warehouse_country'
                                        style= {{width: 300}}
                                        placeholder='Country'
                                        value={this.state.warehouse_country}
                                        onChange={this.handleChange}
                                        className='form-control'
                                />
                            </div>

                            <div className='form-group'>
                                <h5>Warehouse capacity</h5>
                                <input  type='number'
                                        name='capacity'
                                        value={this.state.capacity}
                                        onChange={this.handleChange}
                                        className='form-control'
                                />
                            </div>

                            <div className='form-group'>
                                <h5>Warehouse contact</h5>
                                <input  type='tel'
                                        name='contact'
                                        pattern="[0-9]{10}"
                                        placeholder="0827400474"
                                        value={this.state.contact}
                                        onChange={this.handleChange}
                                        className='form-control'
                                />
                            </div>

                            <div className='form-group'>
                                <h5>Number of Staffs</h5>
                                <input  type='number'
                                        name='number_staffs'
                                        value={this.state.number_staffs}
                                        onChange={this.handleChange}
                                        className='form-control'
                                />
                            </div>

                            <div className="form-group">
                                <FormControl>
                                    <InputLabel>Manager</InputLabel>
                                    <Select name="manager_id"
                                            value={this.state.manager_id}
                                            onChange={this.handleChange}
                                            style={{ width: 300}}
                                    >
                                    { 
                                        allManagers.map(user => {
                                        return <MenuItem    key={user.user_id} 
                                                            value={user.user_id}
                                                >
                                                    <span>
                                                        <strong>{user.user_id}</strong> {user.first_name} {user.last_name}
                                                    </span>
                                                </MenuItem>
                                        })
                                    }
                                    </Select>
                                </FormControl>
                            </div>
                        </form>
                        {   this.props.dialog_state === 1 ? 
                            <QuestionDialog topic='add' /> :
                            this.props.dialog_state === 2 && 
                            <ComfirmedDialog topic='add' />
                        }

                    </div>

                    <div className='button-back-comfirm'>
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
                                Add
                            </button>
                        </div>
                    </div>
                </div>
                
                
            </div>
        )
    }
}

function mapStateToProp(state) {
    const { user } = state.auth
    const { dialog_state } = state.dialog
    return {
        user,
        dialog_state,
    }
}

export default connect(mapStateToProp)(AddWarehouse)