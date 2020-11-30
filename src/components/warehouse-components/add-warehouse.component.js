import React, { Component } from "react"
import { Redirect } from "react-router-dom"
import { connect } from "react-redux"

import { history } from '../../helpers/history'
import { dialog_state } from '../../actions/dialog'
import QuestionDialog from '../../dialogs/dialog.component'
import ComfirmedDialog from '../../dialogs/dialog-confirmed.component'

import AdminService from '../../services/admin-service'

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import Select from "react-validation/build/select";

const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

class AddWarehouse extends Component {
    constructor(props) {
        super(props)
        this.state = {
            allUser: [],
            name: "",
            address: "",
            zipCode: "",
            city: "",
            country: "",
            coordinates: { lat: "", lng: "" },
            phone: "",
            number_staffs: 0,
            status: "",
            type: "",
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
        if (name === 'coordinatesLat') {
            this.setState({
                coordinates: {
                    ...this.state.coordinates,
                    lat: value
                }
            })
        }
        else if (name === 'coordinatesLng') {
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

    handleAdd(e) {
        e.preventDefault()

        this.form.validateAll()
        if (this.checkBtn.context._errors.length === 0) {
            this.props.dispatch(dialog_state(1))
        }

    }

    render() {
        const { user: currentUser } = this.props
        const { position } = currentUser.payload[0]

        if (!currentUser) {
            return <Redirect to='/login' />
        }
        else if (position !== 'admin') {
            return <Redirect to='/home' />
        }

        const allManagers = this.state.allUser.filter(user => user.position === 'manager')

        return (
            <div>
                <h3>Adding New Warehouse</h3>
                <div className='menu-and-button center'>
                    <div className="card card-container-edit-user">
                        <Form onSubmit={this.handleAdd}
                            ref={(c) => this.form = c}
                        >
                            <h4>Detail</h4>
                            <div className='form-group'>
                                <h5>Warehouse name</h5>
                                <Input type='text'
                                    name='name'
                                    value={this.state.name}
                                    onChange={this.handleChange}
                                    className='form-control'
                                    validations={[required,]}
                                />
                            </div>

                            <div className='form-group'>
                                <h5>Warehouse Address</h5>
                                <Input type='text'
                                    style={{ width: 300 }}
                                    name='address'
                                    placeholder='Address Detail...'
                                    value={this.state.address}
                                    onChange={this.handleChange}
                                    className='form-control'
                                    validations={[required,]}
                                />
                                <br />
                                <Input type='text'
                                    name='zipCode'
                                    style={{ width: 300 }}
                                    placeholder='Zip Code'
                                    value={this.state.zipCode}
                                    onChange={this.handleChange}
                                    className='form-control'
                                    validations={[required,]}
                                />
                                <br />
                                <Input type='text'
                                    name='city'
                                    style={{ width: 300 }}
                                    placeholder='City'
                                    value={this.state.city}
                                    onChange={this.handleChange}
                                    className='form-control'
                                />
                                <br />
                                <Input type='text'
                                    name='country'
                                    style={{ width: 300 }}
                                    placeholder='Country'
                                    value={this.state.country}
                                    onChange={this.handleChange}
                                    className='form-control'
                                    validations={[required,]}
                                />
                            </div>

                            <div className='form-group'>
                                <h5>Coordinate</h5>
                                <Input type='number'
                                    name='coordinatesLat'
                                    placeholder="latitude"
                                    value={this.state.coordinates.lat}
                                    onChange={this.handleChange}
                                    style={{ marginBottom: 10 }}
                                    className='form-control'
                                    validations={[required,]}
                                />
                                <Input type='number'
                                    name='coordinatesLng'
                                    placeholder="longtitude"
                                    value={this.state.coordinates.lng}
                                    onChange={this.handleChange}
                                    className='form-control'
                                    validations={[required,]}
                                />
                            </div>

                            <div className='form-group'>
                                <h5>Warehouse contact</h5>
                                <input type='tel'
                                    name='phone'
                                    pattern="[0-9]{10}"
                                    placeholder="0827400474"
                                    value={this.state.phone}
                                    onChange={this.handleChange}
                                    className='form-control'
                                    validations={[required,]}
                                />
                            </div>

                            <div className='form-group'>
                                <h5>Type of Warehouse</h5>
                                <Select
                                    name='type'
                                    value={this.state.type}
                                    onChange={this.handleChange}
                                    className='form-control'
                                    validations={[required,]}
                                >
                                    <option value="">Choose Warehouse type</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                </Select>
                            </div>

                            <div className='form-group'>
                                <label>Status
                                <Select
                                        name='status'
                                        value={this.state.status}
                                        onChange={this.handleChange}
                                        className='form-control'
                                        validations={[required,]}
                                    >
                                        <option value="">Choose Warehouse status</option>
                                        <option value="open">Open</option>
                                        <option value="close">Close</option>
                                    </Select>
                                </label>
                            </div>

                            <div className="form-group">
                                <label>Manager
                                    <Select name="manager_id"
                                        value={this.state.manager_id}
                                        onChange={this.handleChange}
                                        style={{ width: 300 }}
                                        className="form-control"
                                        validations={[required,]}
                                    >
                                        <option value=''>Choose Warehouse Manager</option>
                                        {
                                            allManagers.map(user => {
                                                return (
                                                    <option key={user.userId} value={user.userId}>
                                                        {user.userId} {user.firstName} {user.lastName}
                                                    </option>
                                                )
                                            })
                                        }
                                    </Select>
                                </label>
                            </div>
                            <CheckButton
                                style={{ display: "none" }}
                                ref={(c) => {
                                    this.checkBtn = c;
                                }}
                            />
                        </Form>
                        {this.props.dialog_state === 1 ?
                            <QuestionDialog topic='add'
                                data={{
                                    name: this.state.name, address: this.state.address,
                                    zipCode: this.state.zipCode, city: this.state.city,
                                    country: this.state.country, phone: this.state.phone,
                                    type: this.state.type,
                                    status: this.state.status, managerId: this.state.manager_id,
                                    coordinates: this.state.coordinates
                                }} /> :
                            this.props.dialog_state === 2 &&
                            <ComfirmedDialog topic='add' />
                        }

                    </div>

                    <div className='button-back-comfirm'>
                        <div>
                            <button className="btn btn-danger btn-block"
                                style={{ width: 100 }}
                                onClick={this.handleBack}
                            >
                                Back
                            </button>
                        </div>
                        <div>
                            <button className="btn btn-primary btn-block"
                                style={{ width: 100 }}
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