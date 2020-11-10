import React, { Component } from "react"
import { Redirect, Link } from "react-router-dom"
import { connect } from "react-redux"
import { Button } from '@material-ui/core'

//import { history } from '../../helpers/history'

class ManageWarehouse extends Component {
    constructor(props){
        super(props)
        this.state = [

        ]

    }

    render () {
        const { user: currentUser } = this.props
        const { position } = currentUser.payload[0]

        if(!currentUser) {
            return <Redirect to='/login' />
        }
        else if(position !== 'admin'){
            return <Redirect to='/home' />
        }

        return (
            <div>
                <h1>Manage Warehouse</h1>
                <br />
                <div>
                    <Link to="/add-warehouse">
                        <Button variant="contained">
                            Add New Warehouse
                        </Button>
                    </Link>
                </div>
                <br />
                <div>
                    <Link to="/edit-warehouse">
                        <Button variant="contained">
                            Edit Warehouse
                        </Button>
                    </Link>
                </div>
                <br />
                <div>
                    <Link to="/delete-warehouse">
                        <Button variant="contained">
                            Delete Warehouse
                        </Button>
                    </Link>
                </div>
                <br />
                <div>
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
                <div>
                    <Link to="/home">
                        <Button variant="contained">
                            Back
                        </Button>
                    </Link>
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

export default connect(mapStateToProp)(ManageWarehouse)