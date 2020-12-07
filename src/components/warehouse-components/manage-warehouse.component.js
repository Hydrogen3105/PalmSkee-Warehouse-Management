import React, { Component } from "react"
import { Redirect, Link } from "react-router-dom"
import { connect } from "react-redux"
import { Button } from '@material-ui/core'

import IconButton from '@material-ui/core/IconButton'
import SearchIcon from '@material-ui/icons/Search'
import FilterListIcon from '@material-ui/icons/FilterList'
import WarehousesTable from "../manager-components/warehouses-table.component"
import AdminProfile from "../profile.components/admin-profile.component"
import WarehouseService from '../../services/warehouse-service'

import { history } from '../../helpers/history'

import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'

import { ColorButton, BlueButton, GreenButton, useStyles } from '../../styles/material-style'

class ManageWarehouse extends Component {
    constructor(props) {
        super(props)
        this.state = {
            allWarehouses: [],
            showWarehouses: [],
            isLoading: true,
            searchText: "",
        }

    }

    handleBack() {
        history.push('/home')
    }

    componentDidMount() {
        WarehouseService.getAllWarehouses()
            .then((response) => {
                const all_warehouse = response.data.payload.map(warehouse => {
                    return {
                        ...warehouse,
                        id: warehouse.warehouseId
                    }
                })
                this.setState({
                    allWarehouses: all_warehouse,
                    showWarehouses: all_warehouse,
                    isLoading: false,
                })
            })
            .catch(() => this.setState({isLoading: false}))
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.showWarehouses !== this.state.showWarehouses) {
            this.setState({
                isLoading: false
            })
        }
    }

    handleSearch = (allWarehouses) => {
        this.setState({
            isLoading: true
        })

        if (this.state.searchText !== '') {
            const searchData = allWarehouses.filter(warehouse => {
                const regex = new RegExp('^' + this.state.searchText, 'gi')
                return regex.test(warehouse.warehouseId)
            })
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
        const { name, value } = e.target
        this.setState({
            [name]: value
        })
    }

    render() {
        const { user: currentUser } = this.props
        const { position } = currentUser.payload[0]

        if (!currentUser) {
            return <Redirect to='/login' />
        }
        else if (position !== 'admin') {
            return <Redirect to='/home' />
        }

        
        return (
            <div>
                <h2>Manage Warehouse</h2>
                <div>
                    <div id='outer'>
                        <div className='inner'>
                            <Link to="/add-warehouse">
                                <BlueButton variant="contained" color='primary' className={useStyles.margin} style={{width: 100}}>
                                    Add
                                </BlueButton>
                            </Link>
                        </div>
                        <div className='inner'>
                            <Link to="/edit-warehouse">
                                <GreenButton variant="contained" color='primary' className={useStyles.margin} style={{width: 100}}>
                                    Edit
                                </GreenButton>
                            </Link>
                        </div>
                        <div className='inner'>
                            <Link to="/delete-warehouse">
                                <ColorButton variant="contained" color='primary' className={useStyles.margin} style={{width: 100}}>
                                    Delete
                                </ColorButton>
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
                                        <input type='text'
                                            className='form-control'
                                            name='searchText'
                                            style={{ width: 250 }}
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
                        {/*Above Table */}
                        {
                            !this.state.isLoading &&
                            <div>
                                <WarehousesTable warehouses={this.state.showWarehouses} position='admin'/>
                            </div>
                        }

                        <div style={{ marginTop: 10 }}>
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
                            <AdminProfile user={currentUser} />
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

export default connect(mapStateToProp)(ManageWarehouse)