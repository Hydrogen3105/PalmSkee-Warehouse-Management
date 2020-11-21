import React, { Component } from "react"
import { Redirect, Link } from "react-router-dom"
import { connect } from "react-redux"
import { Button } from '@material-ui/core'
import StaffProfile from '../components/profile.components/staff-profile.component'
import WarehouseService from '../services/warehouse-service'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'

import Chart from 'react-google-charts'

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
            console.log(response.data.payload[0])
            this.setState({
                warehouseData: response.data.payload[0],
                isLoading: false
            })
        })
    }

    render() {
        const { user: currentUser } = this.props
        if (!currentUser) {
            return <Redirect to="/login" />
        } else if (currentUser.payload[0].position !== "staff") {
            return <Redirect to="/home" />
        }

        const used = this.state.warehouseData.usedSpace
        const data =    [
            ['Type', 'Space'],
            ['Used Space', used*100],
            ['Free Space', 100 - (used*100)],
        ]

        return (
            <div>
                <h2 style={{ marginBottom: 15 }}>Warehouse Management System : Staff</h2>
                <div className='staff-container'>
                    <div className='item-manage-user'>
                        <div className='staff-main'>
                            <div className='register-card' style={{ width: 800 }}>
                                <div style={{ display: "flex" ,justifyContent: "space-between"}}>
                                    <div >
                                        <h3>{this.state.warehouseData.warehouseId}</h3>
                                        <h4>{this.state.warehouseData.name}</h4>
                                        { this.state.warehouseData.address && 
                                            <div>
                                                <h5>{this.state.warehouseData.address.address},</h5>
                                                <h5>{this.state.warehouseData.address.city}, {this.state.warehouseData.address.country}</h5>
                                            </div>
                                        }
                                    </div>
                                    {
                                        !this.state.isLoading && 
                                        <div style={{backgroundColor: { fill:'transparent' }}}>
                                            <Chart
                                                width={'350px'}
                                                height={'200px'}
                                                chartType="PieChart"
                                                loader={<div>Loading Chart</div>}
                                                data={data}
                                                options={{
                                                    title: 'Parcels in Storage (Percent)',
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

                    <div className='item-manage-user'>
                        <div className='staff-main-button' >
                            <div>
                                <Link to="/parcels">
                                    <Button variant='contained' style={{ width: 250, height: 100 }}>
                                        Parcels
                                    </Button>
                                </Link>
                            </div>
                            <div>
                                <Link to="/stored-parcels">
                                    <Button variant='contained' style={{ width: 250, height: 100 }}>
                                        Confirm stored
                                    </Button>
                                </Link>
                            </div>
                            <div>
                                <Link to="/exported-parcels">
                                    <Button variant='contained' style={{ width: 250, height: 100 }}>
                                        Confirm exported
                                    </Button>
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