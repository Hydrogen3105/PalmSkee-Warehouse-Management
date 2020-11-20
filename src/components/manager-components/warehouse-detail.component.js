import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect, Link } from 'react-router-dom'
import { history } from '../../helpers/history'
import { Button } from '@material-ui/core'
import { select_warehouse } from '../../actions/warehouses'

import IconButton from '@material-ui/core/IconButton'
import SearchIcon from '@material-ui/icons/Search'
import FilterListIcon from '@material-ui/icons/FilterList'

import ManagerProfile from '../profile.components/manager-profile.component'
import WarehouseCardDetail from './warehouse-card-detail.component'

class WarehouseDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
        this.handleBack = this.handleBack.bind(this)
    }

    handleBack() {
        this.props.dispatch(select_warehouse(''))
        history.push('/home')
    }

    componentWillUnmount() {
        this.props.dispatch(select_warehouse(""))
    }
 
    render () {
        const { user: currentUser } = this.props
        const { position } = currentUser.payload[0]

        if(!currentUser){
            return <Redirect to='/login' />
        }
        else if(position !== 'manager'){
            return <Redirect to='/home' />
        }

        return (
            <div >
                <h1>Warehouse Management System : Manager </h1>
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
                            <WarehouseCardDetail warehouseId= {this.props.warehouseId} />
                        </div>
                        <div className='button-back-comfirm' style={{marginTop: 20,}}>
                            <Button variant='contained' style={{width: 100}} onClick={this.handleBack}>
                                    Back
                            </Button>
                            <Link to="/show-report">
                                <Button variant='contained' style={{width: 235}}>
                                    Show Analysis Report
                                </Button>
                            </Link>
                        </div>
                    </div>

                    <div>
                        <div className='item-manage-user'>
                            <ManagerProfile user={currentUser} />
                        </div>
                    </div>

                </div>
                

            </div>
        )
    }

}

function mapStateToProp(state) {
    const { user } = state.auth
    const { warehouseId } = state.warehouse

    return {
        user,
        warehouseId,
    }
}

export default connect(mapStateToProp)(WarehouseDetail)