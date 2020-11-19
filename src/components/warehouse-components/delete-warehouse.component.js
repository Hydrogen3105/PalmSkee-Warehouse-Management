import React , { Component } from 'react'
import { connect } from 'react-redux'
import { history } from '../../helpers/history'
import { Redirect } from 'react-router-dom'

import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import QuestionDialog from '../../dialogs/dialog.component'
import ComfirmedDialog from '../../dialogs/dialog-confirmed.component'

import { dialog_state } from '../../actions/dialog'

class DeleteWarehouse extends Component {
    constructor(props) {
        super(props)
        this.state = {
            warehouseId: "",
        }

        this.handleBack = this.handleBack.bind(this)
        this.handleDialog = this.handleDialog.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount() {
        this.props.dispatch(dialog_state(0))
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

    render () {
        const { user: currentUser } = this.props
        const { position } = currentUser.payload[0]

        if(!currentUser) {
            return <Redirect to='/login' />
        }
        else if(position !== 'admin'){
            return <Redirect to='/home' />
        }

        return (
            <div className="col-md-12">
                <h1>Deleting Warehouse</h1>
                <div className='menu-and-button center'>
                    <div className="card card-container-edit-user">
                        <div className="form-group">
                            <FormControl>
                                <InputLabel>Warehouse ID</InputLabel>
                                <Select name="warehouseId"
                                        value={this.state.warehouseId}
                                        onChange={this.handleChange}
                                        style={{ width: 250}}
                                >
                                {/* this.state.allUser.map(user => {
                                    return <MenuItem    key={user.user_id} 
                                                        value={user.user_id}
                                            >
                                                <span>
                                                    <strong>{user.user_id}</strong> {user.first_name} {user.last_name}
                                                </span>
                                            </MenuItem>
                                    })*/}
                                    <MenuItem value='WH006'><strong>WH006</strong> Sia O Warehouse</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        <div className='from-group'>
                            <label> Permission File
                                <input type='file' />
                            </label>
                            
                            <label> Report file
                                <input type='file' />
                            </label>

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
                                    onClick={this.handleDialog}
                            >
                                Delete
                            </button>
                        </div>
                    </div>

                </div>
                
                {   this.props.dialog_state === 1 ? 
                    <QuestionDialog topic='delete' /> :
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