import React , { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { history } from '../../helpers/history'
import { select_report } from '../../actions/reports'


class Reports extends Component {
    constructor(props){
        super(props)
        this.state = {

        }

        this.handleBack = this.handleBack.bind(this)
        this.handleMock = this.handleMock.bind(this)
    }

    handleBack() {
        history.push('/home')
    }

    handleMock() {
        this.props.dispatch(select_report('1001039'))

        history.push('/report-detail')
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
            <div>
                <h2>Request Reports</h2>

                <div>
                    <button className="btn btn-danger btn-block" 
                            style={{width: 100}}
                            onClick={this.handleBack}
                    >
                        Back
                    </button>
                    <button className="btn btn-primary btn-block" 
                            style={{width: 100}}
                            onClick={this.handleMock}
                    >
                        Mock Select Report
                    </button>
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

export default connect(mapStateToProp)(Reports)