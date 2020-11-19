import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import AdminService from '../../services/admin-service'

import AdminProfile from '../profile.components/admin-profile.component'

import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'

import { history } from '../../helpers/history'
import QuestionDialog from '../../dialogs/dialog.component'
import ConfirmedDialog from '../../dialogs/dialog-confirmed.component'
import { dialog_state } from '../../actions/dialog'
import { Button, Dialog, DialogActions, DialogTitle } from '@material-ui/core'

class DeleteUser extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userId: "",
            loading: false,
            allUser: [],
            open_warning: false,
        }

        this.handleBack = this.handleBack.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleClose = this.handleClose.bind(this)
    }

    componentDidMount() {
        this.props.dispatch(dialog_state(0))
        AdminService.getAllUsers()
        .then((response) => {
            this.setState({
                allUser: response.data.payload
            })
        })
    }

    handleChange(e) {
        this.setState({
            userId: e.target.value
        })
    }


    handleBack() {
        history.push('/manage-user')
    }

    handleDelete() {
        this.setState({
            open_warning: false
        })

        if(this.state.userId !== ''){
            this.props.dispatch(dialog_state(1))
            this.setState({
                open_warning: false
            })
        }
        else{
            this.setState({
                open_warning: true
            })
        }
    }

    handleClose() {
        this.setState({
            open_warning: false
        })
    }

    render () {
        const { user: currentUser } = this.props

        if(!currentUser ){
            return <Redirect to="/login" />
        }else if(currentUser.payload[0].position !== "admin") {
            return <Redirect to="/home"/>
        }

        return (
            <div>
                <h2>Deleting User</h2>
                <div style={{display:"flex",justifyContent: "space-between"}}>
                    <div>
                        <div style={{display:"flex",justifyContent: "space-between",flexDirection:"column", width: 700, marginRight: 50}}>
                            <div>
                                <div className="register-card card-container-edit-user" >
                                    <label>Warehouse Staff ID</label>
                                    
                                    <div className="form-group">
                                        {<FormControl>
                                            <InputLabel>Staff ID</InputLabel>
                                            <Select name="staff-id"
                                                    value={this.state.userId}
                                                    onChange={this.handleChange}
                                                    style={{ width: 250}}
                                            >
                                            { this.state.allUser.map(user => {
                                                return <MenuItem    key={user.userId} 
                                                                    value={user.userId}
                                                        >
                                                            <span>
                                                                <strong>{user.userId}</strong> {user.firstName} {user.lastName}
                                                            </span>
                                                        </MenuItem>
                                                })}
                                            </Select>
                                        </FormControl>}
                                    </div>
                                    { this.state.userId === '' && this.state.open_warning && 
                                        <div className="form-group">
                                            <div className="alert alert-danger" role="alert">
                                                This field is required
                                            </div>
                                        </div>
                                    }
                                </div>
                            </div>

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
                                            onClick={this.handleDelete}
                                    >
                                            Delete
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div>
                        <AdminProfile user={currentUser} />
                    </div>
                </div>
                
                
                {   this.props.dialog_state === 1 ? 
                        <QuestionDialog topic='delete-user' data={this.state.userId}/> :
                        this.props.dialog_state === 2 && 
                        <ConfirmedDialog topic='delete-user' />
                }

               
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { message } = state.message
    const { user } = state.auth
    const { dialog_state } = state.dialog
    return {
        user,
        message,
        dialog_state,
    }
  }
  
export default connect(mapStateToProps)(DeleteUser)
