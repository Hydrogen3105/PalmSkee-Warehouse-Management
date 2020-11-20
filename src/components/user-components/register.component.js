import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import Select from "react-validation/build/select";
import { isEmail } from "validator";

import { connect } from "react-redux";
import { register } from "../../actions/auth";
import { Link } from "react-router-dom"
import { Button } from '@material-ui/core'
import { Redirect } from "react-router-dom";

import { history } from "../../helpers/history";
import AdminProfile from "../profile.components/admin-profile.component";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const email = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

const vusername = (value) => {
  if (value.length < 3 || value.length > 30) {
    return (
      <div className="alert alert-danger" role="alert">
        The username must be between 3 and 30 characters.
      </div>
    );
  }
};


class Register extends Component {
  constructor(props) {
    super(props);

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
      isGenderMissing: false,
    };

    this.handleRegister = this.handleRegister.bind(this);
    this.onChangePosition = this.onChangePosition.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.onChangeWarehouseID = this.onChangeWarehouseID.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }

  onChangeWarehouseID(e) {
    this.setState({
      warehouse: e.target.value,
    });
  }

  onChangePosition(e) {
    this.setState({
      position: e.target.value,
    });
  }

  handleBack() {
    history.push("/manage-user");
  }

  handleRegister(e) {
    e.preventDefault();

    this.setState({
      successful: false,
    });
    this.setState({
      isGenderMissing: false,
    });

    this.form.validateAll();
    const {
      user_id,
      firstname,
      lastname,
      position,
      address,
      zip_code,
      city,
      country,
      dob,
      gender,
      email,
      phone_number,
      warehouse,
    } = this.state;
    if (
      this.checkBtn.context._errors.length === 0 &&
      this.state.gender !== ""
    ) {
      this.props
        .dispatch( 
          register(
            user_id,
            firstname,
            lastname,
            position,
            address,
            zip_code,
            city,
            country,
            dob,
            gender,
            email,
            phone_number,
            warehouse
          )
        )
        .then(() => {
          this.setState({
            successful: true,
          });
        })
        .catch(() => {
          this.setState({
            successful: false,
          });
          history.push("/manage-user");
        });
    }else if(this.state.gender === ''){
      this.setState({
        isGenderMissing: true
      })
    }
  }

  render() {
    const { user: currentUser, message } = this.props;

    if (!currentUser) {
      return <Redirect to="/login" />;
    } else if (currentUser.payload[0].position !== "admin") {
      return <Redirect to="/home" />;
    }

    return (
      <div className="col-md-12">
        <h4>Adding New User</h4>
        <div id="outer">
          <div className="inner">
            <Link to="/register">
              <Button variant="contained">Add User</Button>
            </Link>
          </div>
          <div className="inner">
            <Link to="/edit-user">
              <Button variant="contained">Edit User</Button>
            </Link>
          </div>
          <div className="inner">
            <Link to="/delete-user">
              <Button variant="contained">Delete User</Button>
            </Link>
          </div>
          <div className="inner">
            <button
              className="btn btn-danger btn-block"
              style={{ width: 150 }}
              onClick={() => console.log(this.state.allUser)}
            >
              Data
            </button>
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
                onSubmit={this.handleRegister}
                ref={(c) => {
                  this.form = c;
                }}
              >
                {!this.state.successful && (
                  <div>
                    <div className="form-group">
                      <label htmlFor="user_id" className="label-form">
                        Username
                      </label>
                      <Input
                        type="text"
                        className="form-control"
                        name="user_id"
                        value={this.state.user_id}
                        onChange={this.handleChange}
                        validations={[required, vusername]}
                        style={{ width: 250 }}
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
                    <div style={{ display: "flex" }}>
                      <div className="form-group" style={{ marginRight: 40 }}>
                        <label htmlFor="firstname" className="label-form">
                          First Name
                        </label>
                        <Input
                          type="text"
                          className="form-control"
                          name="firstname"
                          value={this.state.firstname}
                          onChange={this.handleChange}
                          validations={[required]}
                          style={{ width: 250 }}
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="lastname" className="label-form">
                          Last Name
                        </label>
                        <Input
                          type="text"
                          className="form-control"
                          name="lastname"
                          value={this.state.lastname}
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
                          <label htmlFor="zip_code" className="label-form">
                            Zip Code
                          </label>
                          <Input
                            type="text"
                            className="form-control"
                            name="zip_code"
                            value={this.state.zip_code}
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
                        validations={[required, email]}
                        style={{ width: 250 }}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="phone_number" className="label-form">
                        Phone Number
                      </label>
                      <Input
                        type="tel"
                        name="phone_number"
                        pattern="[0-9]{10}"
                        placeholder="0827400474"
                        className="form-control"
                        value={this.state.phone_number}
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
                            name="warehouse"
                            className="form-control"
                            value={this.state.warehouse}
                            onChange={this.onChangeWarehouseID}
                            style={{ width: 250 }}
                            validations={[required]}
                          >
                            <option value="">Choose warehouse</option>
                            <option value="WH001">WH001 O-Cha Warehouse</option>
                            <option value="WH002">WH002 Cha-O Warehouse</option>
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
                      { this.state.gender === '' && this.state.isGenderMissing && 
                        <div className="form-group">
                          <div className="alert alert-danger" role="alert">
                            This field is required
                          </div>
                      </div>
                      }
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
                        >
                          Sign Up
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {message && (
                  <div className="form-group">
                    <div
                      className={
                        this.state.successful
                          ? "alert alert-success"
                          : "alert alert-danger"
                      }
                      role="alert"
                    >
                      {message}
                    </div>
                    <button
                      className="btn btn-primary btn-block"
                      style={{ width: 100 }}
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
  const { user } = state.auth;
  const { message } = state.message;
  return {
    user,
    message,
  };
}

export default connect(mapStateToProps)(Register);
