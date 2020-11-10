import React , { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { history } from '../../helpers/history'
import { select_report } from '../../actions/reports'

import QuestionDialog from '../../dialogs/dialog.component'
import ConfirmedDialog from '../../dialogs/dialog-confirmed.component'
import { dialog_state } from '../../actions/dialog'

class ViewReport extends Component {
    constructor(props){
        super(props)
        this.state = {

        }
        this.handleBack = this.handleBack.bind(this)
        this.handleSend = this.handleSend.bind(this)
    }

    componentDidMount() {
        this.props.dispatch(dialog_state(0))
    }

    handleBack() {
        this.props.dispatch(select_report(""))
        history.push('/reports')
    }

    handleSend() {
        this.props.dispatch(dialog_state(1))
    }

    render () {
        const { user: currentUser } = this.props
        const { position } = currentUser.payload[0]

        if(!currentUser) {
            return <Redirect to='/login' />
        }
        else if(position !== 'admin') {
            return <Redirect to='/home' />
        }

        return (
            <div>
                <h2>View Report #{this.props.report_id}</h2>

                <div className='card card-container-manager-warehouse'>
                    <label>
                        <h6>Analysis Report file</h6>
                        <input type='file' />
                    </label>
                    
                </div>
                {
                    this.props.dialog_state === 1 ? 
                    <QuestionDialog topic='send-analysis'/> :
                    this.props.dialog_state === 2 &&
                    <ConfirmedDialog topic='send-analysis' />
                }
                <div>
                    <button className="btn btn-danger btn-block" 
                            style={{width: 100}}
                            onClick={this.handleBack}
                    >
                        Back
                    </button>
                    <button className="btn btn-primary btn-block" 
                            style={{width: 120}}
                            onClick={this.handleSend}
                    >
                        Send Report
                    </button>
                </div>
            </div>
        )
    }
}

function mapStateToProp(state) {
    const { user } = state.auth
    const { report_id } = state.report
    const { dialog_state } = state.dialog
    return {
        user,
        report_id,
        dialog_state
    }
}

export default connect(mapStateToProp)(ViewReport)