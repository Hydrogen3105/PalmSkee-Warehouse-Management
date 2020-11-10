import React , { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect , Link } from 'react-router-dom'
import { Button } from '@material-ui/core'
import { history } from '../../helpers/history'
import { select_parcel } from '../../actions/parcel' 
 
class ParcelDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }

        this.handleBack = this.handleBack.bind(this)
        this.handleEdit = this.handleEdit.bind(this)
    }


    handleBack() {
        this.props.dispatch(select_parcel(''))
        history.push('/parcels')
    }

    handleEdit() {
        history.push('/edit-parcel')
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
                <h2>Parcel Detail {this.props.parcel_id} </h2>
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
                    >
                        Confirm
                    </button>
                    <button className="btn btn-primary btn-block" 
                            style={{width: 100}}
                            onClick={this.handleEdit}
                    >
                        Edit
                    </button>
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

export default connect(mapStateToProp)(ParcelDetail)