import React, { Component } from "react";
import AdminService from "../../services/admin-service";

import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import Select from "react-validation/build/select";
import { isEmail } from "validator";
import { Link } from 'react-router-dom'
import AdminProfile from '../profile.components/admin-profile.component'


import { history } from "../../helpers/history";
import QuestionDialog from "../../dialogs/dialog.component";
import ConfirmedDialog from "../../dialogs/dialog-confirmed.component";
import { dialog_state } from "../../actions/dialog";
import { select_user } from "../../actions/admin";

import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'

import SearchService from '../../services/sender-service'
import { BlueButton, GreenButton, ColorButton} from '../../styles/material-style'

const required = (value) => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          This field is required!
        </div>
      );
    }
  };
  
  const is_email = (value) => {
    if (!isEmail(value)) {
      return (
        <div className="alert alert-danger" role="alert">
          This is not a valid email.
        </div>
      );
    }
  };
  

class EditUser extends Component {
  constructor(props) {
    super(props);
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
      loading: true,
      isGenderMissing: false,
      allWarehouse: [],
    };

    this.onChangeUserID = this.onChangeUserID.bind(this);
    this.onChangewarehouseIdID = this.onChangewarehouseIdID.bind(this);
    this.onChangePosition = this.onChangePosition.bind(this);

    this.handleEdit = this.handleEdit.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(dialog_state(0));
    AdminService.getAllUsers()
      .then((response) => {
        this.setState({
          allUser: response.data.payload,
          
        });
      })
      .then(() => {
        SearchService.searchWarehouses().then(response =>{
          this.setState({
            allWarehouse: response.data.payload,
            loading: false,
          })
        })
      })
      .then(() => {
        if (this.state.userId === "" && this.props.userId !== "") {
          const pre_selected_user = this.state.allUser.filter((user) => {
            return user.userId === this.props.userId;
          });
          let dob = pre_selected_user[0].dob;
          dob = dob.slice(0, 10);
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
            loading: false
          });
        }
      })
      .catch(() => {
        this.setState({
          loading: false,
        })
      })
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.userId !== this.state.userId) {
      const selected_user = this.state.allUser.filter((user) => {
        return user.userId === this.state.userId;
      });
      let dob = selected_user[0].dob;
      dob = dob.slice(0, 10);
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
        loading: false
      });
    }
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }

  onChangeUserID(e) {
    this.setState({
      userId: e.target.value,
    });
  }

  onChangewarehouseIdID(e) {
    this.setState({
      warehouseId: e.target.value,
    });
  }

  onChangePosition(e) {
    this.setState({
      position: e.target.value,
    });
  }

  handleEdit(e) {
    e.preventDefault();
    this.setState({
        isGenderMissing: false
    })

    this.form.validateAll()
    if (this.checkBtn.context._errors.length === 0 && this.state.gender !== "") {
        this.props.dispatch(dialog_state(1));
        this.setState({
            isGenderMissing: false
        })
    }else if(this.state.gender === ''){
        this.setState({
            isGenderMissing: true
        })
    }
  }

  handleBack() {
    this.props.dispatch(select_user(""));
    history.push("/manage-user");
  }

  render() {
    const { user: currentUser} = this.props;

    if (!currentUser) {
      return <Redirect to="/login" />;
    } else if (currentUser.payload[0].position !== "admin") {
      return <Redirect to="/home" />;
    }
    const {
      userId,
      firstName,
      lastName,
      address,
      zipCode,
      city,
      country,
      dob,
      gender,
      email,
      phone,
      warehouseId,
    } = this.state;
    const payload_data = {
      userId,
      firstName,
      lastName,
      address,
      zipCode,
      city,
      country,
      dob,
      gender,
      email,
      phone,
      warehouseId,
    };
    
    return (
      <div className="col-md-12">
        <h4>Editing User</h4>
        {   this.props.dialog_state === 1 ? 
                      <QuestionDialog topic='edit-user' data={payload_data}/> :
                      this.props.dialog_state === 2 && 
                      <ConfirmedDialog topic='edit-user' />
        }
        { this.state.loading && (
                        <Dialog
                        open={this.state.loading}
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
        <div id="outer">
          <div className="inner">
            <Link to="/register">
              <BlueButton variant="contained" style={{ width: 150 }}>Add User</BlueButton>
            </Link>
          </div>
          <div className="inner">
            <Link to="/edit-user">
              <GreenButton variant="contained" style={{ width: 150 }}>Edit User</GreenButton>
            </Link>
          </div>
          <div className="inner">
            <Link to="/delete-user">
              <ColorButton variant="contained" style={{ width: 150 }}>Delete User</ColorButton>
            </Link>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            {""}
            <div className="register-card" style={{ width: 650 }}>
              <img
                src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                alt="profile-img"
                className="profile-img-card"
                style={{ marginBottom: 15 }}
              />

              <Form
                onSubmit={this.handleEdit}
                ref={(c) => {
                  this.form = c;
                }}
              >
                {!this.state.successful && (
                  <div>
                    <div className="form-group">
                      <label htmlFor="userId" className="label-form">
                        Staff ID
                      </label>
                      <Select   name="userId"
                                value={this.state.userId}
                                onChange={this.onChangeUserID} 
                                className='form-control'
                                validations={[required]}
                                style={{width: 250}}
                      >
                          <option value=''>Choose Staff ID</option>
                        {
                            this.state.allUser.map(user => {
                                return <option key={user.userId} value={user.userId} > {user.userId} {user.firstName} {user.lastName}</option>
                            })
                        }
                      </Select>
                    </div>

                    <div style={{ display: "flex" }}>
                      <div className="form-group" style={{ marginRight: 40 }}>
                        <label htmlFor="firstName" className="label-form">
                          First Name
                        </label>
                        <Input
                          type="text"
                          className="form-control"
                          name="firstName"
                          value={this.state.firstName}
                          onChange={this.handleChange}
                          validations={[required]}
                          style={{ width: 250 }}
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="lastName" className="label-form">
                          Last Name
                        </label>
                        <Input
                          type="text"
                          className="form-control"
                          name="lastName"
                          value={this.state.lastName}
                          onChange={this.handleChange}
                          validations={[required]}
                          style={{ width: 250 }}
                        />
                      </div>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <div>
                        <div className="form-group">
                          <label htmlFor="address">Staff Address</label>
                          <Input
                            type="text"
                            className="form-control"
                            name="address"
                            value={this.state.address}
                            onChange={this.handleChange}
                            validations={[required]}
                            style={{ width: 540, height: 60 }}
                          />
                        </div>
                      </div>
                      <div style={{ display: "flex" }}>
                        <div className="form-group">
                          <label htmlFor="zipCode" className="label-form">
                            Zip Code
                          </label>
                          <Input
                            type="text"
                            className="form-control"
                            name="zipCode"
                            value={this.state.zipCode}
                            onChange={this.handleChange}
                            validations={[required]}
                            style={{ width: 160, marginRight: 30 }}
                          />
                        </div>

                        <div className="form-group">
                          <label htmlFor="city" className="label-form">
                            City
                          </label>
                          <Input
                            type="text"
                            className="form-control"
                            name="city"
                            value={this.state.city}
                            onChange={this.handleChange}
                            validations={[required]}
                            style={{ width: 160, marginRight: 30 }}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="country" className="label-form">
                            Country
                          </label>
                          <Input
                            type="text"
                            className="form-control"
                            name="country"
                            value={this.state.country}
                            onChange={this.handleChange}
                            validations={[required]}
                            style={{ width: 160 }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="dob" className="label-form">
                        Date of Birth
                      </label>
                      <Input
                        type="date"
                        name="dob"
                        className="form-control"
                        value={this.state.dob}
                        onChange={this.handleChange}
                        validations={[required]}
                        style={{ width: 250 }}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="email" className="label-form">
                        Email
                      </label>
                      <Input
                        type="email"
                        name="email"
                        placeholder="palmskee@si.com"
                        className="form-control"
                        value={this.state.email}
                        onChange={this.handleChange}
                        validations={[required, is_email]}
                        style={{ width: 250 }}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="phone" className="label-form">
                        Phone Number
                      </label>
                      <Input
                        type="tel"
                        name="phone"
                        pattern="[0-9]{10}"
                        placeholder="0827400474"
                        className="form-control"
                        value={this.state.phone}
                        onChange={this.handleChange}
                        validations={[required]}
                        style={{ width: 250 }}
                      />
                    </div>

                    <div style={{ display: "flex" }}>
                      <div className="form-group" style={{ marginRight: 40 }}>
                        <label>
                          Warehouse
                          <Select
                            name="warehouseId"
                            className="form-control"
                            value={this.state.warehouseId}
                            onChange={this.onChangewarehouseIdID}
                            style={{ width: 250 }}
                            validations={[required]}
                          >
                            <option value="">Choose warehouse</option>
                            {this.state.allWarehouse.map(warehouse => {
                              return <option key={warehouse.warehouseId} value={warehouse.warehouseId}>{warehouse.warehouseId}{" "}{warehouse.name}</option>
                            })}
                          </Select>
                        </label>
                      </div>

                      <div className="form-group">
                        <label>
                          Postion
                          <Select
                            name="position"
                            className="form-control"
                            value={this.state.position}
                            onChange={this.onChangePosition}
                            style={{ width: 250 }}
                            validations={[required]}
                          >
                            <option value="">Choose position</option>
                            <option value="staff">Warehouse Staff</option>
                            <option value="manager">Manager</option>
                            <option value="admin">System Admin</option>
                          </Select>
                        </label>
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Gender</label>
                      {this.state.gender === "" && this.state.isGenderMissing && (
                        <div className="form-group">
                          <div className="alert alert-danger" role="alert">
                            This field is required
                          </div>
                        </div>
                      )}
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "flex-start",
                        }}
                      >
                        <div>
                          <label style={{ marginRight: 5 }}>
                            <input
                              type="radio"
                              name="gender"
                              value="male"
                              checked={this.state.gender === "male"}
                              onChange={this.handleChange}
                              validations={[required]}
                            />
                            Male
                          </label>
                        </div>
                        <div>
                          <label style={{ marginRight: 5 }}>
                            <input
                              type="radio"
                              name="gender"
                              value="female"
                              checked={this.state.gender === "female"}
                              onChange={this.handleChange}
                            />
                            Female
                          </label>
                        </div>
                        <div>
                          <label style={{ marginRight: 5 }}>
                            <input
                              type="radio"
                              name="gender"
                              value="others"
                              checked={this.state.gender === "others"}
                              onChange={this.handleChange}
                            />
                            Others
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="button-back-comfirm">
                      <div>
                        <button
                          className="btn btn-primary btn-block"
                          style={{ width: 100 }}
                          onClick={this.handleBack}
                        >
                          Back
                        </button>
                      </div>
                      <div className="form-group">
                        <button
                          className="btn btn-primary btn-block"
                          style={{ width: 100 }}
                          onClick={this.handleEdit}
                        >
                          Edit
                        </button>
                      </div>
                    </div>
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
            {/** */}
          </div>
          <div>
            <AdminProfile user={currentUser} />
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { message } = state.message;
  const { user } = state.auth;
  const { dialog_state } = state.dialog;
  const { userId } = state.user;
  return {
    user,
    message,
    dialog_state,
    userId,
  };
}

export default connect(mapStateToProps)(EditUser);
