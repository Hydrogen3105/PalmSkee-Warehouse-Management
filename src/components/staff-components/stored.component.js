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
            showParcels: [],
            isLoading: true,
            selectedParcels: [],
        }

        this.handleBack = this.handleBack.bind(this)
        this.handleStored = this.handleStored.bind(this)
    }

    componentDidMount() {
        this.props.dispatch(dialog_state(0))
        ParcelService.getAllParcel()
        .then((response) => {
            const unstored =  response.data.payload.filter((parcel) => parcel.latestStatus === 'picked up')
            this.setState({
                showParcels: unstored,
                isLoading: false
            })
        })
    }
    
    handleBack() {
        
        history.push('/parcels')
    }

    handleStored() {
        this.props.dispatch(dialog_state(1))
    }

    onSelectParcel = (parcelsList) => {
        this.setState({
            selectedParcels: parcelsList
        })
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
                                                    onClick={() => this.handleSearch(this.state.allUser)}
                                        >
                                            <SearchIcon />
                                        </IconButton>
                                    </div>
                                </div>
                                
                            </div>
                            
                        </div>
                    {/*Above Table */}
                    <div style={{marginBottom: 15}}>
                        <ParcelSelectTable onSelectParcel={this.onSelectParcel} status='picked up'/>
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