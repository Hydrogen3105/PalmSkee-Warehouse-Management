import React , { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect , Link } from 'react-router-dom'
import { Button } from '@material-ui/core'
import { history } from '../../helpers/history'

import QuestionDialog from '../../dialogs/dialog.component'
import ConfirmedDialog from '../../dialogs/dialog-confirmed.component'
import { dialog_state } from '../../actions/dialog'

import ParcelSelectTable from './parcel-select-table.component'

import IconButton from '@material-ui/core/IconButton'
import SearchIcon from '@material-ui/icons/Search'
import FilterListIcon from '@material-ui/icons/FilterList'

import ParcelService from '../../services/parcel-service'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DeleteIcon from '@material-ui/icons/Delete'

class StoredParcels extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pickedUpParcels: [],
            showParcels: [],
            isLoading: true,
            selectedParcels: [],
            searchText: "",
        }

        this.handleBack = this.handleBack.bind(this)
        this.handleStored = this.handleStored.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
    }

    componentDidMount() {
        this.props.dispatch(dialog_state(0))
        ParcelService.getAllParcel()
        .then((response) => {
            const filtered =  response.data.payload.filter((parcel) => parcel.latestStatus === 'picked up')
            const unstored = filtered.map((parcel) => {
                return {
                    ...parcel,
                    id: parcel.parcelId
                }
            })
            this.setState({
                pickedUpParcels: unstored,
                showParcels: unstored,
                isLoading: false
            })
        })
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevState.showParcels !== this.state.showParcels){
            this.setState({
                isLoading: false
            })
        }
    }
    
    handleBack() {
        history.push('/parcels')
    }

    handleStored() {
        this.props.dispatch(dialog_state(1))
    }

    handleChange = (e) => {
        const {name, value} = e.target
        this.setState({
            [name]: value
        })
    }

    onSelectParcel = (parcelsList) => {
        this.setState({
            selectedParcels: parcelsList
        })
    }

    handleSearch(pickedUpParcels) {
        this.setState({
            isLoading: true
        })
        
        if(this.state.searchText !== ''){
            const searchData = pickedUpParcels.filter(parcel => {
                const regex = new RegExp(  '^' + this.state.searchText,'gi',)
                return regex.test(parcel.parcelId)
            })
            console.log(searchData)
            this.setState({
                showParcels: searchData,
                searchText: '',
            })  
        }
        else {
            this.setState({
                showParcels: pickedUpParcels,
                isLoading: false
            })  
        }
    }

    render () {
        const { user: currentUser } = this.props

        if(!currentUser){
            return <Redirect to="/login" />
        }else if(currentUser.payload[0].position !== "staff" && currentUser.payload[0].position !== "manager"){
            return <Redirect to="/home" />
        }

        return (
            <div>
                <h2>Parcels list for storing</h2>
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
                                                    onClick={() => this.handleSearch(this.state.pickedUpParcels)}
                                        >
                                            <SearchIcon />
                                        </IconButton>
                                    </div>
                                </div>
                                
                            </div>
                            
                        </div>
                    {/*Above Table */}
                    {   !this.state.isLoading &&
                        <div style={{marginBottom: 15}}>
                            <ParcelSelectTable parcels={this.state.showParcels} onSelectParcel={this.onSelectParcel} status='picked up'/>
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
                {
                    this.props.dialog_state === 1 ? 
                    <QuestionDialog topic='store' /> :
                    this.props.dialog_state === 2 && 
                    <ConfirmedDialog topic='store' />
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
                    <div>
                        <button className="btn btn-primary btn-block" 
                                style={{width: 100}}
                                onClick={this.handleStored}
                        >
                            Store
                        </button>
                    </div>
                </div>

        </div>
        )
    }
}

function mapStateToProp(state) {
    const { user } = state.auth
    const {dialog_state} = state.dialog
    return {
        user,
        dialog_state,
    }
}

export default connect(mapStateToProp)(StoredParcels)