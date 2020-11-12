import React, { Component } from "react"
import { Redirect, Link } from "react-router-dom"
import { connect } from "react-redux"
import { Button } from '@material-ui/core'
import AdminService from '../../services/admin-service'

import AdminProfile from '../profile.components/admin-profile.component'
import UsersTable from './users-table.component'
import { history } from '../../helpers/history'

import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogTitle from '@material-ui/core/DialogTitle'

class ManageUser extends Component {
    constructor(props){
        super(props)
        this.state = {
            allUser: [],
            isLoading: true,
        }
        this.handleBack = this.handleBack.bind(this)
    }

    componentDidMount() {
        AdminService.getAllUsers()
        .then((response) => {
            this.setState({
                allUser: response.data.payload,
                isLoading: false,
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
                <h2>Manage User</h2>
                <br />

                <div id="outer">
                    <div className="inner">
                        <Link to="/register">
                            <Button variant="contained">
                                Add User
                            </Button>
                        </Link>
                    </div>
                    <div className='inner'>
                        <Link to="/edit-user">
                            <Button variant="contained">
                                Edit User
                            </Button>
                        </Link>
                    </div>
                    <div className='inner'>
                        <Link to="/delete-user">
                            <Button variant="contained">
                                Delete User
                            </Button>
                        </Link>
                    </div>
                    <div className='inner'>
                        <button className="btn btn-danger btn-block" 
                                    style={{width: 150}}
                                    onClick={() => console.log(this.state.allUser)}
                            >
                                    Data
                        </button>
                    </div>
                </div>

                <div className='container-manage-user'>
                    <div>
                        <UsersTable users={this.state.allUser}/>
                    </div>

                    <div>
                        <div className='item-manage-user'>
                            <AdminProfile user={currentUser}/>
                        </div>
                        <div className='item-manage-user'>
                            <Link to="/manage-user">
                                <Button variant="contained"
                                        style={{width: 300}}
                                >
                                    Manager User
                                </Button>
                            </Link>
                        </div>
                        <div className='item-manage-user'>
                            <Link to='/manage-warehouse'>
                                <Button variant="contained"
                                        style={{width: 300}}
                                >
                                    Manage Warehouse
                                </Button>
                            </Link>
                        </div>
                        <div className='item-manage-user'>
                            <Link to='/reports'>
                                <Button variant="contained"
                                        style={{width: 300}}
                                >
                                    View Requests
                                </Button>
                            </Link>
                        </div>
                    </div>

                </div>
                
                <br />
                <div>
                    <Link to="/home">
                        <Button variant="contained">
                            Back
                        </Button>
                    </Link>
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
    return {
        user,
    }
}

export default connect(mapStateToProp)(ManageUser)