import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import { connect } from "react-redux";

class Profile extends Component {

  render() {
    const { user: currentUser } = this.props;

    if (!currentUser) {
      return <Redirect to="/login" />;
    }

    return (
      <div className="container">
        <header className="jumbotron">
          <h3>
            <strong>{currentUser.payload[0].firstname}</strong> Profile
          </h3>
        </header>
        <p>
          <strong>Token:</strong> {currentUser.payload[0].jwtToken.substring(0, 20)} ...{" "}
          {currentUser.payload[0].jwtToken.substr(currentUser.payload[0].jwtToken.length - 20)}
        </p>
       
        <strong>Authorities:</strong>
        <p>{currentUser.payload[0].position}</p>
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

export default connect(mapStateToProps)(Profile);