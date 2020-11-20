import React, { Component } from "react"
import { Redirect, Link } from "react-router-dom"
import { connect } from "react-redux"
import { Button } from '@material-ui/core'
import { select_warehouse } from '../actions/warehouses'

import IconButton from '@material-ui/core/IconButton'
import SearchIcon from '@material-ui/icons/Search'
import FilterListIcon from '@material-ui/icons/FilterList'
import WarehousesTable from './manager-components/warehouses-table.component'
import ManagerProfile from './profile.components/manager-profile.component'

import WarehouseService from '../services/warehouse-service'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'

class ManagerMain extends Component {
    constructor(props) {
        super(props)
        this.state = {
            allWarehouses: [],
            showWarehouses: [],
            isLoading: true,
            searchText: "",
        }
        this.handleMock = this.handleMock.bind(this)

    }  

    componentDidMount(){
        WarehouseService.getAllWarehouses().then((response) =>{
            const warehouses = response.data.payload.map((warehouse) => {
                return {
                    ...warehouse,
                    id: warehouse.warehouseId
                }
            })
            this.setState({
                allWarehouses: warehouses,
                showWarehouses: warehouses,
                isLoading: false,
            })

        })
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevState.showWarehouses !== this.state.showWarehouses){
            this.setState({
                isLoading: false
            })
        }
    }

    handleMock() {
        this.props.dispatch(select_warehouse('WH006'))
    }

    handleSearch(allWarehouses) {
        this.setState({
            isLoading: true
        })
        
        if(this.state.searchText !== ''){
            const searchData = allWarehouses.filter(warehouse => {
                const regex = new RegExp(  '^' + this.state.searchText,'gi')
                return regex.test(warehouse.warehouseId)
            })
            console.log(searchData)
            this.setState({
                showWarehouses: searchData,
                searchText: ''
            })
        }
        else {
            this.setState({
                showWarehouses: allWarehouses,
                isLoading: false
            })  
        }
    }
    
    handleChange = (e) => {
        const { name , value } = e.target
        this.setState({
            [name]: value
        })
    }

    render () {
        const {user: currentUser} = this.props
        if(!currentUser ){
            return <Redirect to="/login" />
        }else if(currentUser.payload[0].position !== "manager"){
            return <Redirect to="/home" />
        }

        return (
            <div >
                <h1>Warehouse Management System : Manager</h1>
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
                                                    onClick={() => this.handleSearch(this.state.allWarehouses)}
                                        >
                                            <SearchIcon />
                                        </IconButton>
                                    </div>
                                </div>
                                    
                            </div>
                                
                        </div>
                        {
                            !this.state.isLoading &&
                            <div>
                                <WarehousesTable warehouses={this.state.showWarehouses} />
                            </div>
                        }
                        
                        <div style={{marginTop: 20, textAlign: 'right'}}>
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
                        <div className='item-manage-user'>
                            <Link to="/warehouse-detail">
                                <Button variant='contained'
                                        color= 'secondary'
                                        onClick={this.handleMock}        
                                >
                                    Mock select warehouse
                                </Button>
                            </Link>
                        </div>

                    </div>
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

export default connect(mapStateToProp)(ManagerMain)