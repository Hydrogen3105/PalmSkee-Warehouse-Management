import React , { Component } from 'react'
import { connect } from 'react-redux'
import { history } from '../../helpers/history'
import { Redirect } from 'react-router-dom'

import QuestionDialog from '../../dialogs/dialog.component'
import ConfirmedDialog from '../../dialogs/dialog-confirmed.component'
import { dialog_state } from '../../actions/dialog'

class DeleteParcel extends Component {
    constructor(props) {
        super(props)
        this.state = {

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
            <div className="col-md-12">
                <h3>Parcels list for deleting</h3>
                <div>
                    <button className="btn btn-danger btn-block" 
                            style={{width: 100}}
                            onClick={this.handleDelete}
                    >
                        Delete
                    </button>
                    <button className="btn btn-primary btn-block" 
                            style={{width: 100}}
                            onClick={this.handleBack}
                    >
                        Back
                    </button>
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