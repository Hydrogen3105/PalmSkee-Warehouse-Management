import React, { Component } from "react"
import { Redirect, Link } from "react-router-dom"
import { connect } from "react-redux"
import StaffProfile from '../components/profile.components/staff-profile.component'
import WarehouseService from '../services/warehouse-service'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'

import Chart from 'react-google-charts'

import { BlueButton, useStyles, PurpleButton, LightBlueButton } from '../styles/material-style'
import CardGiftcardIcon from '@material-ui/icons/CardGiftcard'
import InputIcon from '@material-ui/icons/Input'
import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff'

class StaffMain extends Component {
    constructor(props) {
        super(props)

        this.state = {
            warehouseData: {},
            isLoading: true,

        }
    }

    componentDidMount() {
        WarehouseService.getWarehouseById(this.props.userData.warehouseId).then((response) => {
            this.setState({
                warehouseData: response.data.payload[0],
                isLoading: false
            })
        })
        .catch(() => this.setState({isLoading: false}))
    }

    render() {
        const { user: currentUser } = this.props
        if (!currentUser) {
            return <Redirect to="/login" />
        } else if (currentUser.payload[0].position !== "staff") {
            return <Redirect to="/home" />
        }

        const used = this.state.warehouseData.usedSpace
        const data = [
            ['Type', 'Space'],
            ['Used Space', used * 100],
            ['Free Space', 100 - (used * 100)],
        ]

        return (
            <div>
                <h2 style={{ marginBottom: 15 }}>Warehouse Management System : Staff</h2>
                <div>
                    <div>
                        <div style={{ marginBottom: 30 }}>
                            <div style={{
                                display: "flex",
                                justifyContent: "space-between"
                            }}
                            >
                                <div className='register-card' style={{ width: 750 }}>
                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                        <div >
                                            <h3>{this.state.warehouseData.warehouseId}</h3>
                                            <h4>{this.state.warehouseData.name}</h4>
                                            {this.state.warehouseData.address &&
                                                <div>
                                                    <h5>{this.state.warehouseData.address.address},</h5>
                                                    <h5>{this.state.warehouseData.address.city}, {this.state.warehouseData.address.country}</h5>
                                                </div>
                                            }
                                        </div>
                                        {
                                            !this.state.isLoading &&
                                            <div >
                                                <Chart
                                                    width={'480px'}
                                                    height={'300px'}
                                                    chartType="PieChart"
                                                    loader={<div>Loading Chart</div>}
                                                    data={data}
                                                    options={{
                                                        title: 'Parcels in Storage (Percent)',
                                                        backgroundColor: 'none',
                                                    }}
                                                    
                                                />
                                            </div>
                                        }

                                    </div>
                                </div>
                                <div style={{ width: 250 }}>
                                    <StaffProfile user={currentUser} />
                                </div>
                            </div>
                        </div>
                    </div>


                    <div>
                        <div style={{
                            display: "flex",
                            justifyContent: "space-evenly"
                        }}
                        >
                            <div>
                                <Link to="/parcels">
                                    <LightBlueButton variant='contained' color='primary' startIcon={<CardGiftcardIcon />} className={useStyles.margin} style={{ width: 250, height: 80, fontSize: 14 }}>
                                        Parcels
                                    </LightBlueButton>
                                </Link>
                            </div>
                            <div>
                                <Link to="/stored-parcels">
                                    <BlueButton variant='contained' color='primary' startIcon={<InputIcon />} className={useStyles.margin} style={{ width: 250, height: 80, fontSize: 14 }}>
                                        Store
                                    </BlueButton>
                                </Link>
                            </div>
                            <div>
                                <Link to="/exported-parcels">
                                    <PurpleButton variant='contained' color='primary' startIcon={<FlightTakeoffIcon />} className={useStyles.margin} style={{ width: 250, height: 80, fontSize: 14 }}>
                                        Export
                                    </PurpleButton>
                                </Link>
                            </div>
                        </div>
                    </div>

                </div>

                { this.state.isLoading && (
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
                )
                }
            </div>
        )
    }
}

function mapStateToProp(state) {
    const { user } = state.auth
    const { userData } = state.currentUser
    return {
        user,
        userData,
    }
}

export default connect(mapStateToProp)(StaffMain)