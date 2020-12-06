import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import AdminService from '../../services/admin-service'

import AdminProfile from '../profile.components/admin-profile.component'

import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";
import Select from "react-validation/build/select";

import { history } from '../../helpers/history'
import QuestionDialog from '../../dialogs/dialog.component'
import ConfirmedDialog from '../../dialogs/dialog-confirmed.component'
import { dialog_state } from '../../actions/dialog'
import { Dialog, DialogTitle } from '@material-ui/core'

const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

class DeleteUser extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userId: "",
            isLoading: true,
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
                    allUser: response.data.payload,
                    isLoading: false,
                })
            }
            )
            .catch(() => {
                this.setState({
                    isLoading: false
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

    handleDelete(e) {
        e.preventDefault()
        this.form.validateAll()
        if (this.checkBtn.context._errors.length === 0 ){
            this.props.dispatch(dialog_state(1))
        }
    }

    handleClose() {
        this.setState({
            open_warning: false
        })
    }

    render() {
        const { user: currentUser } = this.props

        if (!currentUser) {
            return <Redirect to="/login" />
        } else if (currentUser.payload[0].position !== "admin") {
            return <Redirect to="/home" />
        }

        return (
            <div>
                <h2>Deleting User</h2>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <div>
                        <div style={{ display: "flex", justifyContent: "space-between", flexDirection: "column", width: 700, marginRight: 50 }}>
                            <div>
                                <div className="register-card card-container-edit-user" >
                                    <label>Warehouse Staff ID</label>
                                    <Form
                                        onSubmit={this.handleDelete}
                                        ref={(c) => {
                                            this.form = c;
                                        }}
                                    >
                                        <div className="form-group" style={{width: '300px'}}>
                                            <Select
                                                    name='userId'
                                                    className='form-control'
                                                    value={this.state.userId}
                                                    onChange={this.handleChange}
                                                    validations={[required]}
                                            >
                                                <option value=''>Choose user for deleting</option>
                                                { this.state.allUser.map(user => {
                                                    return <option key={user.userId} value={user.userId}>{user.userId}{" "}{user.firstName}{" "}{user.lastName}</option>
                                                })}
                                            </Select>
                                        </div>
                                        <CheckButton
                                            style={{ display: "none" }}
                                            ref={(c) => {
                                                this.checkBtn = c;
                                            }}
                                        />
                                    </Form>
                                </div>
                            </div>

                            <div className='button-back-comfirm' style={{marginTop: '20px'}}>
                                <div>
                                    <button className="btn btn-danger btn-block"
                                        style={{ width: 100 }}
                                        onClick={this.handleBack}
                                    >
                                        Back
                                    </button>
                                </div>
                                <div>
                                    <button className="btn btn-primary btn-block"
                                        style={{ width: 100 }}
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

                {   this.props.dialog_state === 1 ?
                    <QuestionDialog topic='delete-user' data={this.state.userId} /> :
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
