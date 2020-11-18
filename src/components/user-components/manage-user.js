import React, { Component } from "react"
import { Redirect, Link } from "react-router-dom"
import { connect } from "react-redux"
import AdminService from '../../services/admin-service'

import AdminProfile from '../profile.components/admin-profile.component'
import UsersTable from './users-table.component'
import { history } from '../../helpers/history'

import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'

import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import SearchIcon from '@material-ui/icons/Search'
import FilterListIcon from '@material-ui/icons/FilterList'

import { ColorButton, useStyles } from '../../styles/material-style'

/*const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    input: {
      display: 'none',
    },
  }))*/

class ManageUser extends Component {
    constructor(props){
        super(props)
        this.state = {
            allUser: [],
            showUser: [],
            isLoading: true,
            searchText: '',
            
        }
        this.handleBack = this.handleBack.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount() {
        AdminService.getAllUsers()
        .then((response) => {
            this.setState({
                allUser: response.data.payload,
                showUser: response.data.payload,
                isLoading: false,
            })
        })
    }

    handleBack() {
        history.push('/manage-user')
    }

    handleSearch(allUser) {
        //user => user.userId === this.state.searchText
        if(this.state.searchText !== ''){
            const searchData = allUser.filter(user => {
                const regex = new RegExp(  '^' + this.state.searchText,'g')
                return regex.test(user.userId)
            })
            this.setState({
                showUser: searchData,
                searchText: ''
            })     
        }
        else {
            this.setState({
                showUser: allUser
            })  
        }
    }
    
    handleChange(e) {
        const { name , value } = e.target
        this.setState({
            [name]: value
        })
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
                        <div className='search-bar'>
                            <div className='search-bar-container'>
                                <div className='filter-container'>
                                    <div>
                                        <IconButton color="primary" 
                                                    aria-label="search" 
                                                    component="span" 

                                        >
                                            <FilterListIcon />
                                        </IconButton>
                                    </div>
                                </div>

                                <div className='search-container'> 
                                    <div className='form-group'>
                                        <input  type='text'
                                                className='form-control'
                                                name='searchText'
                                                style= {{width: 250}}
                                                placeholder='Search Here..'
                                                value={this.state.searchText}
                                                onChange={this.handleChange}
                                        />
                                    </div>
                                    <div>
                                        <IconButton color="primary" 
                                                    aria-label="search" 
                                                    component="span" 
                                                    onClick={() => this.handleSearch(this.state.allUser)}
                                        >
                                            <SearchIcon />
                                        </IconButton>
                                    </div>
                                </div>
                                
                            </div>
                            
                        </div>
                        <UsersTable users={this.state.showUser}/>
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
                        <ColorButton variant="contained" color="primary" className={useStyles.margin}>
                            Back
                        </ColorButton>
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