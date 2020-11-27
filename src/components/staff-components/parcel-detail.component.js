import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import { history } from "../../helpers/history";
import { select_parcel } from "../../actions/parcel";

import ParcelService from "../../services/parcel-service";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";

import ParcelLabel from "./parcel-detail.components/parcel-pdf.component";
import ParcelData from "./parcel-detail.components/parcel-data.component";

class ParcelDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      parcel: {},
    };

    this.handleBack = this.handleBack.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  componentDidMount() {
    ParcelService.getParcelById(this.props.parcelId).then((response) => {
      this.setState({
        parcel: response.data.payload[0],
        isLoading: false,
      });
    });
  }

  handleBack() {
    this.props.dispatch(select_parcel(""));
    history.push("/parcels");
  }

  handleEdit() {
    history.push("/edit-parcel");
  }

  render() {
    const { user: currentUser } = this.props;

    if (!currentUser) {
      return <Redirect to="/login" />;
    } else if (
      currentUser.payload[0].position !== "staff" &&
      currentUser.payload[0].position !== "manager"
    ) {
      return <Redirect to="/home" />;
    }

    return (
      <div className="col-md-12">
        <h2 style={{marginBottom: 15}}>Parcel Detail {this.props.parcelId} </h2>
        <div style={{display: "flex",flexDirection: "column"}}>
            <div
            style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                width: 1100
            }}
            >
                <div>
                    <div>
                        <ParcelData data={this.state.parcel} />
                    </div>
                </div>
                <div className="parcel-detail  parcel-detail-sizing">
                    {   !this.state.isLoading && this.state.parcel.labelPath ? (
                            <ParcelLabel labelPath={this.state.parcel.labelPath} />
                        ) : (
                            "Does not have label"
                        )
                    }
                </div>
            </div>
            <div style={{display: "flex", justifyContent: "space-between", width: 1060}}>
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
        
        

        {this.state.isLoading && (
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
        )}
      </div>
    );
  }
}

function mapStateToProp(state) {
  const { user } = state.auth;
  const { parcelId } = state.parcel;
  return {
    user,
    parcelId,
  };
}

export default connect(mapStateToProp)(ParcelDetail);
