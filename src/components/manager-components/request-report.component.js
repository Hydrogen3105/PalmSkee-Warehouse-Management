import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { history } from '../../helpers/history'
import QuestionDialog from '../../dialogs/dialog.component'
import ConfirmedDialog from '../../dialogs/dialog-confirmed.component'
import { dialog_state } from '../../actions/dialog'


class RequestReport extends Component {
    constructor(props){
        super(props)
        this.state = {
            topic: '',
            selected_option: '',
            detail: '',
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleBack = this.handleBack.bind(this)
        this.handleSend = this.handleSend.bind(this)
    }

    handleChange (e) {
        const {name, value} = e.target
        this.setState({
            [name]: value
        })
    }

    handleBack () {
        history.push('/home')
    }

    handleSend () {
        this.props.dispatch(dialog_state(1))
    }

    render () {
        const { user: currentUser } = this.props

        if(!currentUser){
            return <Redirect to='/login' />
        }
        else if(currentUser.payload[0].position !== 'manager'){
            return <Redirect to='/home' />
        }

        return (
            <div className="col-md-12">
                <h2>Request Report</h2>
                <div className='request-form'>
                    <div className="card card-container-staff">
                        <div className='form-group'>
                            <h4>Topic</h4>
                            <input  type='text'
                                    style= {{width: 300}}
                                    name='topic'
                                    className='form-control'
                                    value={this.state.topic}
                                    onChange={this.handleChange}
                            />
                        </div>
                        <br />
                        <h4>Request Type</h4>
                        <div className='form-group'>
                            <label>Warehouse</label>
                            <label>
                                <input  type='radio'
                                        name='selected_option'
                                        value='delete_warehouse'
                                        checked={this.state.selected_option === 'delete_warehouse'}
                                        onChange={this.handleChange}
                                />
                                Delete Warehouse
                            </label>
                            <label>
                                <input  type='radio'
                                        name='selected_option'
                                        value='edit_warehouse'
                                        checked={this.state.selected_option === 'edit_warehouse'}
                                        onChange={this.handleChange}
                                />
                                Edit Warehouse
                            </label>
                            <label>
                                <input  type='radio'
                                        name='selected_option'
                                        value='add_warehouse'
                                        checked={this.state.selected_option === 'add_warehouse'}
                                        onChange={this.handleChange}
                                />
                                Add New Warehouse
                            </label>

                            <label>User</label>
                            <label>
                                <input  type='radio'
                                        name='selected_option'
                                        value='delete_user'
                                        checked={this.state.selected_option === 'delete_user'}
                                        onChange={this.handleChange}
                                />
                                Delete User
                            </label>
                            <label>
                                <input  type='radio'
                                        name='selected_option'
                                        value='edit_user'
                                        checked={this.state.selected_option === 'edit_user'}
                                        onChange={this.handleChange}
                                />
                                Edit User
                            </label>
                            <label>
                                <input  type='radio'
                                        name='selected_option'
                                        value='add_user'
                                        checked={this.state.selected_option === 'add_user'}
                                        onChange={this.handleChange}
                                />
                                Add New User
                            </label>

                            <label>Analysis Report</label>
                            <label>
                                <input  type='radio'
                                        name='selected_option'
                                        value='request_report'
                                        checked={this.state.selected_option === 'request_report'}
                                        onChange={this.handleChange}
                                />
                                Request Analysis Report
                            </label>
                        </div>
                    </div>

                    <div className="card card-container-staff">
                        <h4>Request Detail</h4>
                        <div className='form-group'>
                            <textarea
                                    style= {{width: 300, height: 200}}
                                    value={this.state.detail}
                                    name='detail'
                                    className='form-control'
                                    placeholder='Please provide detail here....'
                                    onChange={this.handleChange}
                            />
                        </div>
                        <div className='form-group'>
                            <h4>File</h4>
                            <input  type='file'
                                    name='file'
                            />
                        </div>
                    </div>
                </div>
                

                {
                    this.props.dialog_state === 1 ? 
                    <QuestionDialog topic='send-request' /> :
                    this.props.dialog_state === 2 && 
                    <ConfirmedDialog topic='send-request' />
                }

                <div>
                    <button className="btn btn-danger btn-block" 
                            style={{width: 150}}
                            onClick={this.handleBack}
                    >
                        Back
                    </button>
                    <button className="btn btn-primary btn-block" 
                            style={{width: 150}}
                            onClick={this.handleSend}
                    >
                        Send
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
        dialog_state
    }
}

export default connect(mapStateToProp)(RequestReport)