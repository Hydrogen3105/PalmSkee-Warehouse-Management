import React, { Component } from "react"
import { Redirect, Link } from "react-router-dom"
import { connect } from "react-redux"
import { Button } from '@material-ui/core'
import AdminService from '../../services/admin-service'

import UsersTable from './users-table.component'
import { history } from '../../helpers/history'

class ManageUser extends Component {
    constructor(props){
        super(props)
        this.state = {
            allUser: [],
        }
        this.handleBack = this.handleBack.bind(this)
    }

    componentDidMount() {
        AdminService.getAllUsers()
        .then((response) => {
            this.setState({
                allUser: response.data.payload
            })
        })
    }

    handleBack() {
        history.push('/manage-user')
    }
    
    render () {
        const { user: currentUser } = this.props

        if(!currentUser ){
            return <Redirect to="/login" />
        }else if(currentUser.payload[0].position !== "admin"){
            return <Redirect to="/home" />
        }

        return (
            <div>
                <h1>Manage User</h1>
                <UsersTable users={this.state.allUser}/>
                <br />
                <button className="btn btn-danger btn-block" 
                                style={{width: 150}}
                                onClick={() => console.log(this.state.allUser)}
                        >
                                Data
                </button>
                <div>
                    <Link to="/register">
                        <Button variant="contained">
                            Add User
                        </Button>
                    </Link>
                </div>
                <br />
                <div>
                    <Link to="/edit-user">
                        <Button variant="contained">
                            Edit User
                        </Button>
                    </Link>
                </div>
                <br />
                <div>
                    <Link to="/delete-user">
                        <Button variant="contained">
                            Delete User
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

export default connect(mapStateToProp)(ManageUser)