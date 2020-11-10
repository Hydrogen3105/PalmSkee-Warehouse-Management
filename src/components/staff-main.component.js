import React, { Component } from "react"
import { Redirect ,Link } from "react-router-dom"
import { connect } from "react-redux"
import { Button } from '@material-ui/core'

class StaffMain extends Component {
    constructor(props) {
        super(props)

        this.state = {
            
        }
    }

    render () {
        const {user: currentUser} = this.props
        if(!currentUser ){
            return <Redirect to="/login" />
        }else if(currentUser.payload[0].position !== "staff"){
            return <Redirect to="/home" />
        }

        return (
            <div className="col-md-12">
                <h1>Warehouse Management System : Staff</h1>
                <div className="card card-container-edit-user">
                    
                </div>

                <div className="card card-container-staff">
                    
                </div>
                <div>
                    <div>
                        <Link to="/parcels">
                            <Button variant='contained'>
                                Parcels
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
                    {/*<div>
                        <Link to="/parcel-detail">
                            <Button variant='contained'>
                                Parcel Detail
                            </Button>
                        </Link>
                    </div>*/}
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

export default connect(mapStateToProp)(StaffMain)