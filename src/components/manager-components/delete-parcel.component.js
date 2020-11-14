import React , { Component } from 'react'
import { connect } from 'react-redux'
import { history } from '../../helpers/history'
import { Redirect } from 'react-router-dom'

import QuestionDialog from '../../dialogs/dialog.component'
import ConfirmedDialog from '../../dialogs/dialog-confirmed.component'
import { dialog_state } from '../../actions/dialog'

import ParcelsTable from '../staff-components/parcels-table.component'
import IconButton from '@material-ui/core/IconButton'
import SearchIcon from '@material-ui/icons/Search'
import FilterListIcon from '@material-ui/icons/FilterList'

class DeleteParcel extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showParcels: []
        }
        this.handleBack = this.handleBack.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
    }

    handleBack() {
        history.push('/parcels')
    }

    handleDelete() {
        this.props.dispatch(dialog_state(1))
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
                                                onClick={() => this.handleSearch(this.state.allUser)}
                                    >
                                        <SearchIcon />
                                    </IconButton>
                                </div>
                            </div>
                                
                        </div>
                            
                    </div>
                    {/*Above Table */}
                    <ParcelsTable parcels={this.state.showParcels}/>
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