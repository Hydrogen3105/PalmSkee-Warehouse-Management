import React, { Component } from 'react'
import { connect } from 'react-redux'
import { history } from '../../helpers/history'
import { Redirect } from 'react-router-dom'
import warehouseService from '../../services/warehouse-service'

import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";
import Select from "react-validation/build/select";

import QuestionDialog from '../../dialogs/dialog.component'
import ComfirmedDialog from '../../dialogs/dialog-confirmed.component'

import { dialog_state } from '../../actions/dialog'

const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

class DeleteWarehouse extends Component {
    constructor(props) {
        super(props)
        this.state = {
            warehouseId: "",
            loading: false,
            allWarehouse: [],
            open_warning: false,

        }

        this.handleBack = this.handleBack.bind(this)
        this.handleDialog = this.handleDialog.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount() {
        this.props.dispatch(dialog_state(0))
        warehouseService.getAllWarehouses()
            .then((response) => {
                this.setState({
                    allWarehouse: response.data.payload
                })
            })
    }

    handleBack() {
        history.push('/manage-warehouse')
    }

    handleChange(e) {
        const { name, value } = e.target
        this.setState({
            [name]: value
        })
    }

    handleDialog() {
        this.props.dispatch(dialog_state(1))
    }

    handleDelete(e) {
        e.preventDefault()

        this.form.validateAll()
        if (this.checkBtn.context._errors.length === 0) {
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
        const { position } = currentUser.payload[0]

        if (!currentUser) {
            return <Redirect to='/login' />
        }
        else if (position !== 'admin') {
            return <Redirect to='/home' />
        }

        return (
            <div className="col-md-12">
                <h1>Deleting Warehouse</h1>
                <div className='menu-and-button center'>
                    <div className="card card-container-edit-user">
                        <Form onSubmit={this.handleAdd}
                            ref={(c) => this.form = c}
                        >
                            <div className="form-group">
                                <label>Warehouse ID
                                <Select name="warehouseId"
                                        value={this.state.warehouseId}
                                        onChange={this.handleChange}
                                        style={{ width: 250 }}
                                        validations = {[required, ]}
                                        className='form-control'
                                    >
                                        <option value=''>Choose Warehouse for deleting</option>
                                        {this.state.allWarehouse.map(warehouse => {
                                            return <option key={warehouse.warehouseId}
                                                value={warehouse.warehouseId}
                                            > {warehouse.warehouseId}{" "}{warehouse.name}
                                            </option>
                                        })}
                                    </Select>
                                </label>
                            </div>
                            <CheckButton
                                style={{ display: "none" }}
                                ref={(c) => {
                                    this.checkBtn = c;
                                }}
                            />
                        </Form>

                    </div>
                    <div className='button-back-comfirm'>
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

                {   this.props.dialog_state === 1 ?
                    <QuestionDialog topic='delete' data={this.state.warehouseId} /> :
                    this.props.dialog_state === 2 &&
                    <ComfirmedDialog topic='delete' />
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

export default connect(mapStateToProp)(DeleteWarehouse)