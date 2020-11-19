import React , { Component } from 'react'
import { connect } from 'react-redux'
import { history } from '../../helpers/history'
import { Redirect } from 'react-router-dom'

import QuestionDialog from '../../dialogs/dialog.component'
import ConfirmedDialog from '../../dialogs/dialog-confirmed.component'
import { dialog_state } from '../../actions/dialog'

import ParcelSelectTable from '../../components/staff-components/parcel-select-table.component'

import IconButton from '@material-ui/core/IconButton'
import SearchIcon from '@material-ui/icons/Search'
import FilterListIcon from '@material-ui/icons/FilterList'

import ParcelService from '../../services/parcel-service'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'

class DeleteParcel extends Component {
    constructor(props) {
        super(props)
        this.state = {
            allParcels: [],
            showParcels: [],
            isLoading: true,
            parcelId: '',
            selectedParcels: [],
            searchText: "",
        }
        this.handleBack = this.handleBack.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
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
                allParcels: parcelsInTable,
                showParcels: parcelsInTable,
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

    handleDelete() {
        this.props.dispatch(dialog_state(1))
    }

    handleChange = (e) => {
        const { name, value } = e.target
        this.setState({
            [name]: value
        })
    }

    onSelectParcel = (parcelsList) => {
        this.setState({
            selectedParcels: parcelsList
        })
    }

    handleSearch = (allParcels) => {
        this.setState({
            isLoading: true
        })
        
        if(this.state.searchText !== ''){
            const searchData = allParcels.filter(parcel => {
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
                showParcels: allParcels,
                isLoading: false
            })  
        }
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
            <div>
                <h3>Parcels list for deleting</h3>
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
                                                onClick={() => this.handleSearch(this.state.allParcels)}
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
                            <ParcelSelectTable parcels={this.state.showParcels} onSelectParcel={this.onSelectParcel}/>
                        </div>
                    }
                </div>
                <div className='button-back-comfirm' style={{marginTop: 10}}>
                    <div>
                        <button className="btn btn-primary btn-block" 
                                style={{width: 100}}
                                onClick={this.handleBack}
                        >
                            Back
                        </button>
                    </div>
                    <div>
                        <button className="btn btn-danger btn-block" 
                                style={{width: 100}}
                                onClick={this.handleDelete}
                        >
                            Delete
                        </button>
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
                    <QuestionDialog topic='delete-parcel' /> :
                    this.props.dialog_state === 2 && 
                    <ConfirmedDialog topic='delete-parcel' />
                }
            </div>
        )
    }
}

function mapStateToProp(state) {
    const { user } = state.auth
    const { dialog_state } = state.dialog
    return {
        user,
        dialog_state,
    }
}

export default connect(mapStateToProp)(DeleteParcel)