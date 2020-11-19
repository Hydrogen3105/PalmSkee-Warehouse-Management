import React, { Component } from "react"
import { Link, Redirect } from "react-router-dom"
import { connect } from "react-redux"
import { Button } from '@material-ui/core'

import IconButton from '@material-ui/core/IconButton'
import SearchIcon from '@material-ui/icons/Search'
import FilterListIcon from '@material-ui/icons/FilterList'
import WarehousesTable from '../components/manager-components/warehouses-table.component'
import AdminProfile from '../components/profile.components/admin-profile.component'

class AdminMain extends Component {
    constructor(props) {
        super(props)

        this.state = {
            showWarehouses: []
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
                <h3 style={{marginBottom: 20}}>Warehouse Management System: System Admin</h3>
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
                    </div>
                    {/** */}
                    <div>
                        <div>
                            <AdminProfile user={currentUser}/>
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

export default connect(mapStateToProp)(AdminMain)