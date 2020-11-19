import React, { Component } from "react"
import { Redirect, Link } from "react-router-dom"
import { connect } from "react-redux"
import { Button } from '@material-ui/core'

import IconButton from '@material-ui/core/IconButton'
import SearchIcon from '@material-ui/icons/Search'
import FilterListIcon from '@material-ui/icons/FilterList'
import WarehousesTable from "../manager-components/warehouses-table.component"
import AdminProfile from "../profile.components/admin-profile.component"


import { history } from '../../helpers/history'

class ManageWarehouse extends Component {
    constructor(props){
        super(props)
        this.state = {
            showWarehouses: []
        }

    }

    handleBack() {
        history.push('/home')
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
                <h2>Manage Warehouse</h2>
                <div>
                    <div id='outer'>
                        <div className='inner'>
                        <Link to="/add-warehouse">
                            <Button variant="contained">
                                Add
                            </Button>
                        </Link>
                        </div>
                        <div className='inner'>
                            <Link to="/edit-warehouse">
                                <Button variant="contained">
                                    Edit
                                </Button>
                            </Link>
                        </div>
                        <div className='inner'>
                            <Link to="/delete-warehouse">
                                <Button variant="contained">
                                    Delete
                                </Button>
                            </Link>
                        </div>
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
                        {/*Above Table */}
                        <div>
                            <WarehousesTable warehouses={this.state.showWarehouses} />
                        </div>
                        <div style={{marginTop: 10}}>
                            <Link to='/home'>
                                <Button variant='contained' onClick={this.handleBack}>
                                    Back
                                </Button>
                            </Link>
                        </div>
                    </div>
                    {/** */}
                    <div>
                        <div className='item-manage-user'>
                            <AdminProfile user={currentUser}/>
                        </div>
                        <div className='item-manage-user'>
                            <Link to="/manage-user">
                                <Button variant="contained"
                                        style={{width: 230}}
                                >
                                    Manage User
                                </Button>
                            </Link>
                        </div>
                        <div className='item-manage-user'>
                            <Link to='/manage-warehouse'>
                                <Button variant="contained"
                                        style={{width: 230}}
                                >
                                    Manage Warehouse
                                </Button>
                            </Link>
                        </div>
                        <div className='item-manage-user'>
                            <Link to='/reports'>
                                <Button variant="contained"
                                        style={{width: 230}}
                                >
                                    View Requests
                                </Button>
                            </Link>
                        </div>
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

export default connect(mapStateToProp)(ManageWarehouse)