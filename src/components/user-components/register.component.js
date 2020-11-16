import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

import { connect } from "react-redux";
import { register } from "../../actions/auth";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Redirect } from "react-router-dom";

import { history } from '../../helpers/history'

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
}

const email = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
}

const vusername = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The username must be between 3 and 20 characters.
      </div>
    );
  }
}

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    )
  }
}


class Register extends Component {
  constructor(props) {
    super(props)

    this.state = {
      user_id: "",
      email: "",
      firstname: "",
      lastname: "",
      position: "",
      address: "",
      zip_code: "",
      city: "",
      country: "",
      dob: "",
      gender: "",
      phone_number: "",
      warehouse: "",
      successful: false,
    }

    this.handleRegister = this.handleRegister.bind(this)
    this.onChangePosition = this.onChangePosition.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleBack = this.handleBack.bind(this)
    this.onChangeWarehouseID = this.onChangeWarehouseID.bind(this)
  }

  handleChange (e) {
    const {name , value} = e.target
    this.setState({
        [name]: value
    })
  }

  onChangeWarehouseID(e) {(
    this.setState({
      warehouse: e.target.value
    })
  )}

  onChangePosition(e) {(
    this.setState({
      position: e.target.value
    })
  )}

  handleBack() {
    history.push('/manage-user')
  }

  handleRegister(e) {
    e.preventDefault();

    this.setState({
      successful: false,
    })

    this.form.validateAll();
    const { user_id, firstname, lastname, position, address, zip_code, city, country, dob, gender, email, phone_number, warehouse } = this.state
    if (this.checkBtn.context._errors.length === 0 && this.state.gender !== '') {
      this.props
        .dispatch(
          register(user_id, firstname, lastname, position, address, zip_code, city, country, dob, gender, email, phone_number, warehouse)
        )
        .then(() => {
          this.setState({
            successful: true,
          })
        })
        .catch(() => {
          this.setState({
            successful: false,
          })
          history.push('/manage-user')
        })
    }
  }

  render() {
    const { user: currentUser ,message } = this.props;

    if(!currentUser ){
      return <Redirect to="/login" />
    }else if(currentUser.payload[0].position !== "admin"){
      return <Redirect to="/home" />
    }

    return (
      <div className="col-md-12">
        <h4>Adding New User</h4>
        <div className="card card-container">
          <img
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="profile-img"
            className="profile-img-card"
          />

          <Form
            onSubmit={this.handleRegister}
            ref={(c) => {
              this.form = c;
            }}
          >
            {!this.state.successful && (
              <div>
                <div className="form-group">
                  <label htmlFor="user_id">Username</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="user_id"
                    value={this.state.user_id}
                    onChange={this.handleChange}
                    validations={[required, vusername]}
                  />
                </div>

                {/*<div className="form-group">
                  <label htmlFor="password">Password</label>
                  <Input
                    type="password"
                    className="form-control"
                    name="password"
                    value={this.state.password}
                    onChange={this.handleChange}
                    validations={[required, vpassword]}
                  />
                </div>*/}

                <div className="form-group">
                  <label htmlFor="firstname">First Name</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="firstname"
                    value={this.state.firstname}
                    onChange={this.handleChange}
                    validations={[required]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="lastname">Last Name</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="lastname"
                    value={this.state.lastname}
                    onChange={this.handleChange}
                    validations={[required]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="address">Staff Address</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="address"
                    value={this.state.address}
                    onChange={this.handleChange}
                    validations={[required]}
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="zip_code">Zip Code</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="zip_code"
                    value={this.state.zip_code}
                    onChange={this.handleChange}
                    validations={[required]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="city">City</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="city"
                    value={this.state.city}
                    onChange={this.handleChange}
                    validations={[required]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="country">Country</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="country"
                    value={this.state.country}
                    onChange={this.handleChange}
                    validations={[required]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="dob">Date of Birth</label>
                  <Input  type="date"
                      name="dob"
                      className="form-control"
                      value={this.state.dob}
                      onChange={this.handleChange}
                      validations={[required]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <Input  type="email"
                      name="email"
                      placeholder="palmskee@si.com"
                      className="form-control"
                      value={this.state.email}
                      onChange={this.handleChange}
                      validations={[required, email]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone_number">Phone Number</label>
                  <Input  type="tel"
                      name="phone_number"
                      pattern="[0-9]{10}"
                      placeholder="0827400474"
                      className="form-control"
                      value={this.state.phone_number}
                      onChange={this.handleChange}
                      validations={[required]}
                  />
                </div>
                
                <div className="form-group">
                        <FormControl>
                            <InputLabel>Warehouse</InputLabel>
                            <Select name="warehouse"
                                    value={this.state.warehouse}
                                    onChange={this.onChangeWarehouseID}
                                    style={{ width: 250}}
                                    validations={[required]}
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
                                <MenuItem value="WH001" > <span>
                                                <strong>WH001</strong> O-Cha Warehouse
                                            </span>
                                </MenuItem>
                                <MenuItem value="WH002" > <span>
                                                <strong>WH002</strong> O-Cha Warehouse
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
                            validations={[required]}
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
                    validations={[required]}
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
                
                <div className='button-back-comfirm'>
                  <div>
                      <button className="btn btn-primary btn-block" 
                              style={{width: 100}}
                              onClick={this.handleBack}
                      >
                          Back
                      </button>
                  </div>
                  <div className="form-group">
                    <button className="btn btn-primary btn-block"
                            style={{width: 100}}
                    >Sign Up</button>
                  </div>
                </div>
                
              </div>
            )}

            {message && (
              <div className="form-group">
                <div className={ this.state.successful ? "alert alert-success" : "alert alert-danger" } role="alert">
                  {message}
                </div>
                <button className="btn btn-primary btn-block" 
                            style={{width: 100}}
                            onClick={this.handleBack}
                    >
                        Back
                </button>
              </div>
            )}
            <CheckButton
              style={{ display: "none" }}
              ref={(c) => {
                this.checkBtn = c;
              }}
            />
          </Form>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.auth
  const { message } = state.message
  return {
    user,
    message,
  }
}

export default connect(mapStateToProps)(Register)