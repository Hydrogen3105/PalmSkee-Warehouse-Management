import React from "react";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";

import { BlueButton, PurpleButton, LightBlueButton, DarkPurpleButton ,useStyles} from '../../styles/material-style'

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
                    <LightBlueButton variant="contained" color='primary' className={useStyles.margin} style={{ width: 300 }}>
                    Warehouse Parcels
                    </LightBlueButton>
                </Link>
            </div>
            <div className="item-manage-user">
                <Link to="/stored-parcels">
                    <BlueButton variant="contained" color='primary' className={useStyles.margin} style={{ width: 300 }}>
                    Confirm stored
                    </BlueButton>
                </Link>
            </div>
            <div className="item-manage-user">
                <Link to="/exported-parcels">
                    <PurpleButton variant="contained" color='primary' className={useStyles.margin} style={{ width: 300 }}>
                    Confirm exported
                    </PurpleButton>
                </Link>
            </div>
            <div className="item-manage-user">
                <Link to="/request-report">
                    <DarkPurpleButton variant="contained" color='primary' className={useStyles.margin} style={{ width: 300 }}>
                    Request Report
                    </DarkPurpleButton>
                </Link>
            </div>
        </div>
    </div>
  );
}

export default ManagerProfile;
