import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import AdminService from '../../services/admin-service'

import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'

import { history } from '../../helpers/history'
import QuestionDialog from '../../dialogs/dialog.component'
import ConfirmedDialog from '../../dialogs/dialog-confirmed.component'
import { dialog_state } from '../../actions/dialog'

class DeleteUser extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userId: "",
            loading: false,
            allUser: []
        }

        this.handleBack = this.handleBack.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
        this.handleChange = this.handleChange.bind(this)
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
        this.props.dispatch(dialog_state(1))
    }

    render () {
        const { user: currentUser } = this.props

        if(!currentUser ){
            return <Redirect to="/login" />
        }else if(currentUser.payload[0].position !== "admin") {
            return <Redirect to="/home"/>
        }

        return (
            <div className="col-md-12">
                <h2>Deleting User</h2>
                <div className="card card-container-edit-user">
                    <div className="form-group">
                        <FormControl>
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
                        </FormControl>
                    </div>
                </div>
                {   this.props.dialog_state === 1 ? 
                        <QuestionDialog topic='delete-user' data={this.state.userId}/> :
                        this.props.dialog_state === 2 && 
                        <ConfirmedDialog topic='delete-user' />
                }
                <div>
                        <button className="btn btn-danger btn-block" 
                                style={{width: 100}}
                                onClick={this.handleBack}
                        >
                                Back
                        </button>
                        <button className="btn btn-primary btn-block" 
                                style={{width: 100}}
                                onClick={this.handleDelete}
                        >
                                Delete
                        </button>
                </div>
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
