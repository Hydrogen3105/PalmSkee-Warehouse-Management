import React, { Component } from "react"
import { Redirect ,Link } from "react-router-dom"
import { connect } from "react-redux"
import { Button } from '@material-ui/core'
import StaffProfile from '../components/profile.components/staff-profile.component'

class StaffMain extends Component {
    constructor(props) {
        super(props)

        this.state = {
            
        }
    }

    render () {
        const {user: currentUser} = this.props
        if(!currentUser ){
            return <Redirect to="/login" />
        }else if(currentUser.payload[0].position !== "staff"){
            return <Redirect to="/home" />
        }

        return (
            <div>
                <h2 style={{marginBottom: 15}}>Warehouse Management System : Staff</h2>
                <div className='staff-container'>
                    <div className='item-manage-user'>
                        <div className='staff-main'>
                            <div style={{width: 800}}>
                                <StaffProfile user={currentUser}/>
                            </div>
                            <div style={{width: 250}}>
                                <StaffProfile user={currentUser}/>
                            </div>
                        </div>
                    </div>
                    
                    <div className='item-manage-user'>
                        <div className='staff-main-button' >
                            <div>
                                <Link to="/parcels">
                                    <Button variant='contained' style={{ width: 250, height:100 }}>
                                        Parcels
                                    </Button>
                                </Link>
                            </div>
                            <div>   
                                <Link to="/stored-parcels"> 
                                    <Button variant='contained' style={{ width: 250, height:100 }}>
                                    Confirm stored
                                    </Button>
                                </Link>
                            </div>
                            <div>
                                <Link to="/exported-parcels">
                                    <Button variant='contained' style={{ width: 250, height:100 }}>
                                        Confirm exported
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                    
                </div>
                
            
            </div>
        )
    }
}

function mapStateToProp(state) {
    const { user } = state.auth
    return {
        user,
    }
}

export default connect(mapStateToProp)(StaffMain)