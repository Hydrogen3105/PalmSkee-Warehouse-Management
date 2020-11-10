import React, { Component } from "react"
import { Redirect, Link } from "react-router-dom"
import { connect } from "react-redux"
import { Button } from '@material-ui/core'
import { select_warehouse } from '../actions/warehouses'

class ManagerMain extends Component {
    constructor(props) {
        super(props)

        this.state = {
            
        }
        this.handleMock = this.handleMock.bind(this)

    }

    handleMock() {
        this.props.dispatch(select_warehouse('WH006'))
    }

    render () {
        const {user: currentUser} = this.props
        if(!currentUser ){
            return <Redirect to="/login" />
        }else if(currentUser.payload[0].position !== "manager"){
            return <Redirect to="/home" />
        }

        return (
            <div className="container">
                <h1>Warehouse Management System : Manager</h1>

                <div className="card card-container-manager-warehouse">
                    
                </div>

                <div>
                    <div>
                        <Link to="/warehouse-detail">
                            <Button variant='contained'
                                    color= 'secondary'
                                    onClick={this.handleMock}        
                            >
                                Mock select warehouse
                            </Button>
                        </Link>
                    </div>
                    <br />
                    <div>
                        <Link to="/parcels">
                            <Button variant='contained'>
                                Warehouse Parcels
                            </Button>
                        </Link>
                    </div>
                    <br />
                    <div>   
                        <Link to="/stored-parcels"> 
                            <Button variant='contained'>
                            Confirm stored
                            </Button>
                        </Link>
                    </div>
                    <br />
                    <div>
                        <Link to="/exported-parcels">
                            <Button variant='contained'>
                                Confirm exported
                            </Button>
                        </Link>
                    </div>
                    <br />
                    <div>
                        <Link to="/request-report">
                            <Button variant='contained'>
                                Request Report
                            </Button>
                        </Link>
                    </div>
                    <br />
                    <div>
                        <Link to="#">
                            <Button variant='contained'>
                                Show Analysis Report
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>

        )
    }
}

function mapStateToProp(state) {
    const { user } = state.auth
    return {
        user,
    }
}

export default connect(mapStateToProp)(ManagerMain)