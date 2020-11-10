import React, { Component } from "react";
import { Link, Redirect} from 'react-router-dom'
import { connect } from 'react-redux'
import StaffMain from './staff-main.component'
import ManagerMain from './manager-main.component'
import AdminMain from './admin-main.component'

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
  }

  componentDidMount() {
    
  }

  render() {
    const { user: currentUser } = this.props

    if(!currentUser){
      return <Redirect to="/login"/>
    }

    return (
      <div className="container">
        { currentUser.payload[0].position ==="staff" ? (
            <StaffMain /> 
          ) : currentUser.payload[0].position ==="manager" ? (
            <ManagerMain />
          ) : (
            <AdminMain />
          )
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user,
  };
}

export default connect(mapStateToProps)(Home)