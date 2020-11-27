import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import { history } from "../../helpers/history";
import { dialog_state } from "../../actions/dialog";
import QuestionDialog from "../../dialogs/dialog.component";
import ComfirmedDialog from "../../dialogs/dialog-confirmed.component";

import AdminService from "../../services/admin-service";
import warehouseService from "../../services/warehouse-service";
import { select_warehouse } from "../../actions/warehouses";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

class EditWarehouse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allUser: [],
      allWarehouse: [],
      name: "",
      address: "",
      zipCode: "",
      country: "",
      city: "",
      coordinates: { lat: "", lng: "" },
      phone: "",
      type: "",
      managerId: "",
      status: "",
      loading: true,
      warehouseId: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.onChangewarehouseId = this.onChangewarehouseId.bind(this);
  }

  //   componentDidMount() {
  //     this.props.dispatch(dialog_state(0));

  //   }

  componentDidMount() {
    this.props.dispatch(dialog_state(0));
    warehouseService
      .getAllWarehouses()
      .then(
        (response) => {
          this.setState({
            allWarehouse: response.data.payload,
          });
        },
        (error) => {
          this.setState({
            loading: false,
          });
        }
      )
      .then(() => {
        AdminService.getAllUsers().then(
          (response) => {
            this.setState({
              allUser: response.data.payload,
              loading: false,
            });
          },
          (error) => {
            this.setState({
              loading: false,
            });
          }
        );
      });
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.warehouseId !== this.state.warehouseId) {
      const selected_warehouse = this.state.allWarehouse.filter((warehouse) => {
        return warehouse.warehouseId === this.state.warehouseId;
      });
      console.log(selected_warehouse);
      this.setState({
        warehouseId: selected_warehouse[0].warehouseId,
        name: selected_warehouse[0].name,
        address: selected_warehouse[0].address.address,
        zipCode: selected_warehouse[0].address.zipCode,
        city: selected_warehouse[0].address.city,
        country: selected_warehouse[0].address.country,
        coordinates: selected_warehouse[0].address.coordinates,
        type: selected_warehouse[0].type,
        phone: selected_warehouse[0].phone,
        managerId: selected_warehouse[0].managerId,
        status: selected_warehouse[0].status,
        loading: false,
      });
    }
  }

  handleChange(e) {
    const { name, value } = e.target;
    if (name === "coordinatesLat") {
      this.setState({
        coordinates: {
          ...this.state.coordinates,
          lat: value,
        },
      });
    } else if (name === "coordinatesLng") {
      this.setState({
        coordinates: {
          ...this.state.coordinates,
          lng: value,
        },
      });
    } else {
      this.setState({
        [name]: value,
      });
    }
  }

  onChangewarehouseId(e) {
    this.setState({
      warehouseId: e.target.value,
    });
  }

  handleBack() {
    history.push("/manage-warehouse");
  }

  handleEdit() {
    this.props.dispatch(dialog_state(1));
  }

  render() {
    const { user: currentUser } = this.props;
    const { position } = currentUser.payload[0];

    if (!currentUser) {
      return <Redirect to="/login" />;
    } else if (position !== "admin") {
      return <Redirect to="/home" />;
    }

    const allManagers = this.state.allUser.filter(
      (user) => user.position === "manager"
    );

    const {
      warehouseId,
      name,
      address,
      zipCode,
      country,
      city,
      coordinates,
      phone,
      type,
      managerId,
      status,
    } = this.state;

    const payload_data = {
      warehouseId,
      name,
      address,
      zipCode,
      country,
      city,
      coordinates: {
        lat: parseFloat(coordinates.lat),
        lng: parseFloat(coordinates.lng),
      },
      phone,
      type: parseInt(type),
      managerId,
      status,
    };

    return (
      <div>
        <h1>Editing New Warehouse</h1>
        <div className="menu-and-button center">
          <div className="card card-container-edit-user">
            <form>
              <h4>Detail</h4>
              <div className="form-group">
                <h5>Choose Warehouse</h5>
                <select
                  name="warehouseId"
                  value={this.state.warehouseId}
                  onChange={this.handleChange}
                  className="form-control"
                  style={{ width: 300 }}
                >
                  <option value="">Choose Warehouse for editing</option>
                  {this.state.allWarehouse.map((warehouse) => {
                    return (
                      <option
                        key={warehouse.warehouseId}
                        value={warehouse.warehouseId}
                      >
                        {warehouse.warehouseId} {warehouse.name}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className="form-group">
                <h5>Warehouse Name</h5>
                <input
                  type="text"
                  style={{ width: 300 }}
                  name="name"
                  placeholder="Warehouse Name"
                  value={this.state.name}
                  onChange={this.handleChange}
                  className="form-control"
                />
              </div>

              <div className="form-group">
                <h5>Warehouse Address</h5>
                <textarea
                  type="text"
                  style={{ width: 300 }}
                  name="address"
                  placeholder="Warehouse Address"
                  value={this.state.address}
                  onChange={this.handleChange}
                  className="form-control"
                />
                <br />
                <input
                  type="text"
                  name="zipCode"
                  placeholder="Zipcode"
                  style={{ width: 300 }}
                  value={this.state.zipCode}
                  onChange={this.handleChange}
                  className="form-control"
                />
                <br />
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  style={{ width: 300 }}
                  value={this.state.city}
                  onChange={this.handleChange}
                  className="form-control"
                />
                <br />
                <input
                  type="text"
                  name="country"
                  placeholder="Country"
                  style={{ width: 300 }}
                  value={this.state.country}
                  onChange={this.handleChange}
                  className="form-control"
                />
              </div>

              <div className="form-group">
                <h5>Coordinates</h5>
                <input
                  type="number"
                  name="coordinatesLat"
                  placeholder="Latitude"
                  value={this.state.coordinates.lat}
                  onChange={this.handleChange}
                  className="form-control"
                  style={{ marginBottom: 10 }}
                />
                <input
                  type="number"
                  name="coordinatesLng"
                  placeholder="Longtitude"
                  value={this.state.coordinates.lng}
                  onChange={this.handleChange}
                  className="form-control"
                />
              </div>

              <div className="form-group">
                <h5>Warehouse contact</h5>
                <input
                  type="tel"
                  name="phone"
                  pattern="[0-9]{10}"
                  placeholder="0827400474"
                  value={this.state.phone}
                  onChange={this.handleChange}
                  className="form-control"
                />
              </div>

              <div className="form-group">
                <h5>Type of Warehouse</h5>
                <select
                  name="type"
                  value={this.state.type}
                  onChange={this.handleChange}
                  className="form-control"
                >
                  <option value="">Choose Warehouse type</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                </select>
              </div>

              <div className="form-group">
                <h5>Status</h5>
                <select
                  name="status"
                  value={this.state.status}
                  onChange={this.handleChange}
                  className="form-control"
                >
                  <option value="">Choose Warehouse status</option>
                  <option value="open">Open</option>
                  <option value="close">Close</option>
                </select>
              </div>

              <div className="form-group">
                <h5> Manager </h5>
                <select
                  name="manager_id"
                  value={this.state.manager_id}
                  onChange={this.handleChange}
                  style={{ width: 300 }}
                  className="form-control"
                >
                  {allManagers.map((user) => {
                    return (
                      <option key={user.userId} value={user.userId}>
                        {user.userId} {user.firstName} {user.lastName}
                      </option>
                    );
                  })}
                </select>
              </div>
            </form>
            {this.props.dialog_state === 1 ? (
              <QuestionDialog topic="edit" data={payload_data} />
            ) : (
              this.props.dialog_state === 2 && <ComfirmedDialog topic="edit" />
            )}
          </div>
          <div className="button-back-comfirm">
            <div>
              <button
                className="btn btn-danger btn-block"
                style={{ width: 100 }}
                onClick={this.handleBack}
              >
                Back
              </button>
            </div>
            <div>
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
      </div>
    );
  }
}

function mapStateToProp(state) {
  const { user } = state.auth;
  const { dialog_state } = state.dialog;
  return {
    user,
    dialog_state,
  };
}

export default connect(mapStateToProp)(EditWarehouse);
