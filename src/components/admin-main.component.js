import React, { Component } from "react"
import { Link, Redirect } from "react-router-dom"
import { connect } from "react-redux"
import { Button } from '@material-ui/core'

class AdminMain extends Component {
    constructor(props) {
        super(props)

        this.state = {
            
        }
    }

    render () {
        const {user: currentUser} = this.props
        
        if(!currentUser ){
            return <Redirect to="/login" />
        }

        if(currentUser.payload[0].position !== "admin"){
            return <Redirect to="/home" />
        }

        return (
            <div className="container">
                <h1>Warehouse Management System: System Admin</h1>
                <div>
                    <Link to="/manage-user">
                        <Button variant="contained">
                            Manager User
                        </Button>
                    </Link>
                </div>
                <br />
                <div>
                    <Link to='/manage-warehouse'>
                        <Button variant="contained">
                            Manage Warehouse
                        </Button>
                    </Link>
                </div>
                <br />
                <div>
                    <Link to='/reports'>
                        <Button variant="contained">
                            View Requests
                        </Button>
                    </Link>
                </div>
                <br />
                
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

export default connect(mapStateToProp)(AdminMain)