import React , { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect , Link } from 'react-router-dom'
import { Button } from '@material-ui/core'
import { history } from '../../helpers/history'

import DeleteIcon from '@material-ui/icons/Delete'

import ParcelsTable from './parcels-table.component'

import IconButton from '@material-ui/core/IconButton'
import SearchIcon from '@material-ui/icons/Search'
import FilterListIcon from '@material-ui/icons/FilterList'

import ParcelService from '../../services/parcel-service'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'

class Parcels extends Component {
    constructor(props) {
        super(props)
        this.state = {
            allParcel: [],
            showParcel: [],
            isLoading: true,
            searchText: "",
        }

        this.handleBack = this.handleBack.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount() {
        ParcelService.getAllParcel()
        .then((response) => {
            const parcelsInTable = response.data.payload.map((parcel) => {
                return {
                    ...parcel,
                    id: parcel.parcelId
                }
            })
            this.setState({
                allParcel: parcelsInTable,
                showParcel: parcelsInTable,
                isLoading: false
            })
        })
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevState.showParcel !== this.state.showParcel){
            this.setState({
                isLoading: false
            })
        }
    }

    handleBack () {
        history.push('/home')
    }

    handleChange(e) {
        const { name, value } = e.target
        this.setState({
            [name]: value
        })
    }

    handleSearch(allParcels) {
        this.setState({
            isLoading: true
        })
        
        if(this.state.searchText !== ''){
            const searchData = allParcels.filter(parcel => {
                const regex = new RegExp(  '^' + this.state.searchText,'gi')
                return regex.test(parcel.parcelId)
            })
            console.log(searchData)
            this.setState({
                showParcel: searchData,
                searchText: '',
            })  
        }
        else {
            this.setState({
                showParcel: allParcels,
                isLoading: false
            })  
        }
    }

    render () {
        const { user: currentUser } = this.props

        if(!currentUser) {
            return <Redirect to="/login" />
        }else if(currentUser.payload[0].position !== "staff" && currentUser.payload[0].position !== "manager") {
            return <Redirect to="/home" />
        }

        return (
            <div>
                <h2>Parcels list</h2>
                <div>
                    <div id='outer'>
                        <div className='inner'>
                            <Link to="/add-parcel">
                                <Button variant="contained" color="primary">
                                    New
                                </Button>
                            </Link>
                        </div>
                        <div className='inner'>
                            <Link to="/stored-parcels">
                                <Button variant="contained" color="secondary">
                                    Stored
                                </Button>
                            </Link>
                        </div>
                        <div className='inner'>
                            <Link to="/exported-parcels">
                                <Button variant="contained" color="primary">
                                    Exported
                                </Button>
                            </Link>
                        </div>
                        {   currentUser.payload[0].position === "manager" &&
                        <div className='inner'>
                            <Link to="/delete-parcel">
                                <Button variant="contained" 
                                        startIcon={ <DeleteIcon /> }
                                >
                                    Delete Parcel
                                </Button>
                            </Link>
                        </div>
                        }
                    </div>
                    
                </div>

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
                                                    onClick={() => this.handleSearch(this.state.allParcel)}
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
                        <div style={{marginBottom: 10}}>
                            <ParcelsTable parcels={this.state.showParcel}/>
                        </div>
                    }
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
                <div className='button-back-comfirm'>
                    <div>
                        <button className="btn btn-danger btn-block" 
                                style={{width: 100}}
                                onClick={this.handleBack}
                        >
                            Back
                        </button>
                    </div>
                </div>

        </div>
        )
    }
}

function mapStateToProp(state) {
    const { user } = state.auth
    const { parcel_id } = state.parcel
    return {
        user,
        parcel_id,
    }
}


export default connect(mapStateToProp)(Parcels)