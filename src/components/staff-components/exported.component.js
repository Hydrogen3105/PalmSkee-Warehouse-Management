import React , { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect , Link } from 'react-router-dom'
import { Button } from '@material-ui/core'
import { history } from '../../helpers/history'

import QuestionDialog from '../../dialogs/dialog.component'
import ConfirmedDialog from '../../dialogs/dialog-confirmed.component'
import { dialog_state } from '../../actions/dialog'

class ExportedParcels extends Component {
    constructor(props) {
        super(props)
        this.state = {
            redirect: "",
        }

        this.handleBack = this.handleBack.bind(this)
        this.handleExported = this.handleExported.bind(this)
    }

    componentDidMount() {
        this.props.dispatch(dialog_state(0))
    }

    handleBack() {
        history.push('/parcels')
    }

    handleExported() {
        this.props.dispatch(dialog_state(1))
    }

    render () {
        const { user: currentUser } = this.props

        if(!currentUser){
            return <Redirect to="/login" />
        }else if(currentUser.payload[0].position !== "staff" && currentUser.payload[0].position !== "manager"){
            return <Redirect to="/home" />
        }

        return (
            <div className="col-md-12">
                <h2>Unexported Parcels list</h2>
                <div>
                    <div>
                        <Link to="/exported-parcels">
                            <Button variant="contained" color="primary">
                                Exported
                            </Button>
                        </Link>
                    </div>
                    <br />
                    <div>
                        <Link to="/stored-parcels">
                            <Button variant="contained" color="secondary">
                                Stored
                            </Button>
                        </Link>
                    </div>
                    <br />
                    <div>
                        <Link to="/add-parcel">
                            <Button variant="contained" color="primary">
                                New
                            </Button>
                        </Link>
                    </div>
                </div>
                {
                    this.props.dialog_state === 1 ? 
                    <QuestionDialog topic='export' /> :
                    this.props.dialog_state === 2 && 
                    <ConfirmedDialog topic='export' />
                }

                <br />
                <div>
                    <button className="btn btn-danger btn-block" 
                            style={{width: 100}}
                            onClick={this.handleBack}
                    >
                        Back
                    </button>
                    <button className="btn btn-primary btn-block" 
                                style={{width: 100}}
                                onClick={this.handleExported}
                    >
                        Export
                    </button>
                </div>
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

export default connect(mapStateToProp)(ExportedParcels)