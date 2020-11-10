import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect, Link } from 'react-router-dom'
import { history } from '../../helpers/history'
import { Button } from '@material-ui/core'
import { select_warehouse } from '../../actions/warehouses'

class WarehouseDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
        this.handleBack = this.handleBack.bind(this)
    }

    handleBack() {
        history.push('/home')
    }

    componentWillUnmount() {
        this.props.dispatch(select_warehouse(""))
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
                <h3>Warehouse {this.props.warehouse_id} Detail</h3>
                <div className="card card-container-manager-warehouse">
                    
                </div>

                <div className="button-manager">
                    <div>
                        <Link to="/parcels">
                            <Button variant='contained'>
                                Warehouse Parcels
                            </Button>
                        </Link>
                    </div>
                    <br />
                    <div>   
                        <Link to="/stored-parcels"> 
                            <Button variant='contained'>
                            Confirm stored
                            </Button>
                        </Link>
                    </div>
                    <br />
                    <div>
                        <Link to="/exported-parcels">
                            <Button variant='contained'>
                                Confirm exported
                            </Button>
                        </Link>
                    </div>
                    <br />
                    <div>
                        <Link to="/request-report">
                            <Button variant='contained'>
                                Request Report
                            </Button>
                        </Link>
                    </div>
                    <br />
                    <div>
                        <button className="btn btn-primary btn-block" 
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
    const { warehouse_id } = state.warehouse

    return {
        user,
        warehouse_id,
    }
}

export default connect(mapStateToProp)(WarehouseDetail)