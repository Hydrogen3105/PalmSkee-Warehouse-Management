import React ,{ Component } from 'react'
import AdminService from '../../services/admin-service'

import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'

import { history } from '../../helpers/history'
import QuestionDialog from '../../dialogs/dialog.component'
import ConfirmedDialog from '../../dialogs/dialog-confirmed.component'
import { dialog_state } from '../../actions/dialog'
import { select_user } from '../../actions/admin'

class EditUser extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userId: "",
            firstName: "",
            lastName: "",
            position: "",
            address: "",
            zipCode: "",
            city: "",
            country: "",
            dob: "",
            gender: "",
            email: "",
            phone: "",
            warehouseId: "",
            allUser: [],
            loading: false,
        }

        this.onChangeUserID = this.onChangeUserID.bind(this)
        this.onChangewarehouseIdID = this.onChangewarehouseIdID.bind(this)
        this.onChangePosition = this.onChangePosition.bind(this)

        this.handleEdit= this.handleEdit.bind(this)
        this.handleBack = this.handleBack.bind(this)
        this.handleChange = this.handleChange.bind(this)
        
    }
    
    componentDidMount() {
        this.props.dispatch(dialog_state(0))
        AdminService.getAllUsers()
        .then((response) => {
            this.setState({
                allUser: response.data.payload
            })
        })
        .then(() => {
            if(this.state.userId === '' && this.props.userId !== ''){   
                const pre_selected_user = this.state.allUser.filter((user) => {return user.userId === this.props.userId} )
                let dob = pre_selected_user[0].dob
                dob = dob.slice(0,10)
                this.setState({
                    userId: this.props.userId,
                    firstName: pre_selected_user[0].firstName,
                    lastName: pre_selected_user[0].lastName,
                    position: pre_selected_user[0].position,
                    address: pre_selected_user[0].address,
                    zipCode: pre_selected_user[0].zipCode,
                    city: pre_selected_user[0].city,
                    country: pre_selected_user[0].country,
                    dob,
                    gender: pre_selected_user[0].gender,
                    email: pre_selected_user[0].email,
                    phone: pre_selected_user[0].phone,
                    warehouseId: pre_selected_user[0].warehouseId,
                })
            }
        })
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevState.userId !== this.state.userId){
            const selected_user = this.state.allUser.filter((user) => {return user.userId === this.state.userId} )
            let dob = selected_user[0].dob
            dob = dob.slice(0,10)
            this.setState({
                firstName: selected_user[0].firstName,
                lastName: selected_user[0].lastName,
                position: selected_user[0].position,
                address: selected_user[0].address,
                zipCode: selected_user[0].zipCode,
                city: selected_user[0].city,
                country: selected_user[0].country,
                dob,
                gender: selected_user[0].gender,
                email: selected_user[0].email,
                phone: selected_user[0].phone,
                warehouseId: selected_user[0].warehouseId,
            })
        }
    }

    handleChange(e) {
        const { name , value } = e.target
        this.setState({
            [name]: value
        })
    }

    onChangeUserID(e) {
        this.setState({
            userId: e.target.value 
        })
    }

    onChangewarehouseIdID(e) {
        this.setState({
            warehouseId: e.target.value 
        })
    }

    onChangePosition(e) {
        this.setState({
            position: e.target.value
        })
    }

    handleEdit(e) {
        e.preventDefault()
        this.props.dispatch(dialog_state(1))
    }

    handleBack() {
        this.props.dispatch(select_user(''))
        history.push('/manage-user')
    }

    render () {
        const { user: currentUser } = this.props   

        if(!currentUser ){
            return <Redirect to="/login" />
        }else if( currentUser.payload[0].position !== "admin"){
            return <Redirect to="/home"/>
        }
        const {userId, firstName, lastName, address, zipCode, city, country, dob, gender, email, phone, warehouseId} = this.state
        const payload_data = {userId, firstName, lastName, address, zipCode, city, country, dob, gender, email, phone, warehouseId}
        return (
            <div className="col-md-12">
                <h2>Edit User</h2>
                <div className='menu-and-button center'>
                    <div>
                        <div className="card card-container-edit-user">
                            {   this.props.dialog_state === 1 ? 
                                <QuestionDialog topic='edit-user' data={payload_data}/> :
                                this.props.dialog_state === 2 && 
                                <ConfirmedDialog topic='edit-user' />
                            }

                            <div className="form-group">
                                <FormControl>
                                    <InputLabel>Staff ID</InputLabel>
                                    <Select name="staff-id"
                                            value={this.state.userId}
                                            onChange={this.onChangeUserID}
                                            style={{ width: 250}}
                                    >
                                    { this.state.allUser.map(user => {
                                        return <MenuItem    key={user.userId} 
                                                            value={user.userId}
                                                >
                                                    <span>
                                                        <strong>{user.userId}</strong> {user.firstName} {user.lastName}
                                                    </span>
                                                </MenuItem>
                                        })}
                                    </Select>
                                </FormControl>
                            </div>

                            <div className="form-group">
                                    <label htmlFor="firstName">First Name</label>
                                <input  type="text"
                                        name="firstName"
                                        className="form-control"
                                        style={{width: 300}}
                                        value={this.state.firstName}
                                        onChange={this.handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="lastName">Last Name</label>
                                <input  type="text"
                                        name="lastName"
                                        className="form-control"
                                        style={{width: 300}}
                                        value={this.state.lastName}
                                        onChange={this.handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="address">Staff Address</label>
                                <textarea  type="text"
                                        name="address"
                                        className="form-control"
                                        style={{width: 300}}
                                        value={this.state.address}
                                        onChange={this.handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="zipCode">Zip Code</label>
                                <input  type="text"
                                        name="zipCode"
                                        className="form-control"
                                        style={{width: 300}}
                                        value={this.state.zipCode}
                                        onChange={this.handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="city">City</label>
                                <input  type="text"
                                        name="city"
                                        className="form-control"
                                        style={{width: 300}}
                                        value={this.state.city}
                                        onChange={this.handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="country">Country</label>
                                <input  type="text"
                                        name="country"
                                        className="form-control"
                                        style={{width: 300}}
                                        value={this.state.country}
                                        onChange={this.handleChange}
                                />
                            </div>
                            
                            <div className="form-group">
                                <label htmlFor="dob">Date of Birth</label>
                                <input  type="date"
                                        name="dob"
                                        className="form-control"
                                        style={{width: 300}}
                                        value={this.state.dob}
                                        onChange={this.handleChange}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input  type="email"
                                        name="email"
                                        className="form-control"
                                        placeholder="palmskee@si.com"
                                        style={{width: 300}}
                                        value={this.state.email}
                                        onChange={this.handleChange}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="phone">Phone Number</label>
                                <input  type="tel"
                                        name="phone"
                                        className="form-control"
                                        pattern="[0-9]{10}"
                                        placeholder="0827400474"
                                        style={{width: 300}}
                                        value={this.state.phone}
                                        onChange={this.handleChange}
                                />
                            </div>

                            <div className="form-group">
                                <FormControl>
                                    <InputLabel>Warehouse</InputLabel>
                                    <Select name="warehouseId"
                                            value={this.state.warehouseId}
                                            onChange={this.onChangewarehouseIdID}
                                            style={{ width: 250}}
                                    >
                                    {/* this.state.allUser.map(user => {
                                        return <MenuItem    key={user.userId} 
                                                            value={user.userId}
                                                >
                                                    <span>
                                                        <strong>{user.userId}</strong> {user.first_name} {user.last_name}
                                                    </span>
                                                </MenuItem>
                                        })*/}
                                        <MenuItem value="WH006" > <span>
                                                        <strong>WH006</strong> O-Cha warehouse
                                                    </span>
                                        </MenuItem>
                                        <MenuItem value="BK047" > <span>
                                                        <strong>BK047</strong> Thaliand 47
                                                    </span>
                                        </MenuItem>
                                    </Select>
                                </FormControl>
                            </div>

                            <div className="form-group">
                                <FormControl>
                                    <InputLabel>Position</InputLabel>
                                    <Select name="postion"
                                            style={{width: 250}}
                                            value={this.state.position}
                                            onChange={this.onChangePosition}
                                    >
                                    <MenuItem value="staff">Warehouse Staff</MenuItem>
                                    <MenuItem value="manager">Manager</MenuItem>
                                    <MenuItem value="admin">Admin</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>

                            <div className="form-group">
                                <label>Gender</label>
                                <label>
                                    <input  type="radio"
                                            name="gender"
                                            value='male'
                                            checked={this.state.gender === 'male'}
                                            onChange={this.handleChange}
                                    />
                                    Male
                                </label>
                                <label>
                                    <input  type="radio"
                                            name="gender"
                                            value='female'
                                            checked={this.state.gender === 'female'}
                                            onChange={this.handleChange}
                                    />
                                    Female
                                </label>
                                <label>
                                    <input  type="radio"
                                            name="gender"
                                            value='others'
                                            checked={this.state.gender === 'others'}
                                            onChange={this.handleChange}
                                    />
                                    Others
                                </label>
                            </div>

                        </div>
                        {/*Ending form */}
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
                                    onClick={this.handleEdit}
                            >
                                    Edit
                            </button>
                        </div>
                    </div>
                {/*Ending*/ }
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { message } = state.message
    const { user } = state.auth
    const { dialog_state } = state.dialog
    const { userId } = state.user
    return {
        user,
        message,
        dialog_state,
        userId,
    }
  }
  
  export default connect(mapStateToProps)(EditUser)