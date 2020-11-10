import React , { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect , Link } from 'react-router-dom'
import { Button } from '@material-ui/core'
import { history } from '../../helpers/history'
import { select_parcel } from '../../actions/parcel' 
import DeleteIcon from '@material-ui/icons/Delete'
import { red } from '@material-ui/core/colors'

class Parcels extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }

        this.handleBack = this.handleBack.bind(this)
        this.handleMock = this.handleMock.bind(this)
    }

    componentDidMount() {

    }

    handleBack () {
        history.push('/home')
    }

    handleMock() {
        this.props.dispatch(select_parcel('JPN101'))
        localStorage.setItem("select_parcel",JSON.stringify(this.props.parcel_id))

        history.push('/parcel-detail')
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
                    
                    {   currentUser.payload[0].position === "manager" &&
                        <div>
                            <br />
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
                <br />
                <div>
                    <button className="btn btn-danger btn-block" 
                            style={{width: 100}}
                            onClick={this.handleBack}
                    >
                        Back
                    </button>
                </div>
                <br />
                    <button className="btn btn-primary btn-block" 
                            style={{width: 300}}
                            onClick={this.handleMock}
                    >
                        mock up select parcel
                    </button>
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