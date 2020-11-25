import React, { Component } from "react"
import { Redirect } from "react-router-dom"
import { connect } from "react-redux"

import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'

import WarehouseService from '../../services/warehouse-service'

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
            name: "",
            address: "",
            zipCode: "",
            city: "",
            country: "",
            coordinates:{lat:"",lng:""},
            phone: "",
            number_staffs: 0,
            status:"",
            type:"",
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
        if(name === 'coordinatesLat'){
            this.setState({
                coordinates: {
                    ...this.state.coordinates,
                    lat: value
                }
            })
        }
        else if(name === 'coordinatesLng'){
            this.setState({
                coordinates: {
                    ...this.state.coordinates,
                    lng: value
                }
            })
        }
        else {
            this.setState({
                [name]: value
            })
        } 
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
                                        name='name'
                                        value={this.state.name}
                                        onChange={this.handleChange}
                                        className='form-control'
                                />
                            </div>

                            <div className='form-group'>
                                <h5>Warehouse Address</h5>
                                <textarea type='text'
                                        style= {{width: 300}}
                                        name='address'
                                        placeholder='Address Detail...'
                                        value={this.state.address}
                                        onChange={this.handleChange}
                                        className='form-control'
                                />
                                <br />
                                <input  type='text'
                                        name='zipCode'
                                        style= {{width: 300}}
                                        placeholder='Zip Code'
                                        value={this.state.zipCode}
                                        onChange={this.handleChange}
                                        className='form-control'
                                />
                                <br />
                                <input  type='text'
                                        name='city'
                                        style= {{width: 300}}
                                        placeholder='City'
                                        value={this.state.city}
                                        onChange={this.handleChange}
                                        className='form-control'
                                />
                                <br />
                                <input  type='text'
                                        name='country'
                                        style= {{width: 300}}
                                        placeholder='Country'
                                        value={this.state.country}
                                        onChange={this.handleChange}
                                        className='form-control'
                                />
                            </div>

                            <div className='form-group'>
                                <h5>Coordinate</h5>
                                <input  type='number'
                                        name='coordinatesLat'
                                        placeholder="latitude"
                                        value={this.state.coordinates.lat}
                                        onChange={this.handleChange}
                                        className='form-control'
                                />
                                <input  type='number'
                                        name='coordinatesLng'
                                        placeholder="longtitude"
                                        value={this.state.coordinates.lng}
                                        onChange={this.handleChange}
                                        className='form-control'
                                />
                            </div>

                            <div className='form-group'>
                                <h5>Warehouse contact</h5>
                                <input  type='tel'
                                        name='phone'
                                        pattern="[0-9]{10}"
                                        placeholder="0827400474"
                                        value={this.state.phone}
                                        onChange={this.handleChange}
                                        className='form-control'
                                />
                            </div>

                            <div className='form-group'>
                                <h5>Type of Warehouse</h5>
                                <Select 
                                        name='type'
                                        value={this.state.type}
                                        onChange={this.handleChange}
                                        className='form-control'
                                ><MenuItem value="1" > <span>
                                                 1
                                            </span>
                                </MenuItem>
                                <MenuItem value="2" > <span>
                                                 2
                                            </span>
                                </MenuItem>
                                </Select>
                            </div>

                            <div className='form-group'>
                                <h5>Status</h5>
                                <Select 
                                        name='status'
                                        value={this.state.status}
                                        onChange={this.handleChange}
                                        className='form-control'
                                ><MenuItem value="open" > <span>
                                                 Open
                                            </span>
                                </MenuItem>
                                <MenuItem value="close" > <span>
                                                 Close
                                            </span>
                                </MenuItem>
                                </Select>
                            </div>

                            <div className="form-group">
                                <FormControl>
                                    <h5>Manager</h5>
                                    <Select name="manager_id"
                                            value={this.state.manager_id}
                                            onChange={this.handleChange}
                                            style={{ width: 300}}
                                            className="form-control"
                                    >
                                    { 
                                        allManagers.map(user => {
                                        return <MenuItem    key={user.userId} 
                                                            value={user.userId}
                                                >
                                                    <span>
                                                        <strong>{user.userId}</strong> {user.firstName} {user.lastName}
                                                    </span>
                                                </MenuItem>
                                        })
                                    }
                                    </Select>
                                </FormControl>
                            </div>
                        </form>
                        {   this.props.dialog_state === 1 ? 
                            <QuestionDialog topic='add' 
                                            data={{name:this.state.name,address:this.state.address,
                                            zipCode:this.state.zipCode,city:this.state.city,
                                            country:this.state.country,phone:this.state.phone,
                                            type:this.state.type,
                                            status:this.state.status,managerId:this.state.manager_id,
                                            coordinates:this.state.coordinates}} /> :
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