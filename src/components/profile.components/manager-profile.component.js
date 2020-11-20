import React from "react";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";

function ManagerProfile({ user }) {
  return (
    <div>
        <div>
            <div className="admin-profile" style={{width: 300}}>
                <div style={{ textAlign: "center" }}>
                    <h4> {user.payload[0].userId} </h4>
                    <h5> {user.payload[0].firstName} </h5>
                    <p>{user.payload[0].position === "manager" && "Warehouse Manager"}</p>
                </div>
            </div>
            <div className="item-manage-user">
                <Link to="/parcels">
                    <Button variant="contained" style={{ width: 300 }}>
                    Warehouse Parcels
                    </Button>
                </Link>
            </div>
            <div className="item-manage-user">
                <Link to="/stored-parcels">
                    <Button variant="contained" style={{ width: 300 }}>
                    Confirm stored
                    </Button>
                </Link>
            </div>
            <div className="item-manage-user">
                <Link to="/exported-parcels">
                    <Button variant="contained" style={{ width: 300 }}>
                    Confirm exported
                    </Button>
                </Link>
            </div>
            <div className="item-manage-user">
                <Link to="/request-report">
                    <Button variant="contained" style={{ width: 300 }}>
                    Request Report
                    </Button>
                </Link>
            </div>
        </div>
    </div>
  );
}

export default ManagerProfile;
