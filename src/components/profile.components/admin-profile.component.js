import React from "react";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
//import { LightBlueButton, BlueButton, PurpleButton, useStyles } from '../../styles/material-style'

function AdminProfile({ user }) {
  return (
    <div>
      <div>
        <div className="admin-profile" style={{width: 300}}>
          <div style={{ textAlign: "center", marginBottom: 15 }}>
            <h4> {user.payload[0].userId} </h4>
            <h5> {user.payload[0].firstName} </h5>
            <p> {user.payload[0].position === "admin" && "System Admin"} </p>
          </div>
        </div>
        <div className="item-manage-user">
          <Link to="/manage-user">
            <Button variant="contained" style={{width: 300}}>
              Manage User
            </Button>
          </Link>
        </div>
        <div className="item-manage-user">
          <Link to="/manage-warehouse">
            <Button variant="contained" style={{width: 300}}>
              Manage Warehouse
            </Button>
          </Link>
        </div>
        <div className="item-manage-user">
          <Link to="/reports">
            <Button variant="contained" style={{width: 300}}>
              View Requests
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AdminProfile;
