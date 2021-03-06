import React, { Component } from "react";
import { connect } from "react-redux";
import { Router, Switch, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Login from "./components/login.component";
import Register  from "./components/user-components/register.component"
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import StaffMain from "./components/staff-main.component";
import ManagerMain from "./components/manager-main.component"
import AdminMain from "./components/admin-main.component"

import ManageUser from './components/user-components/manage-user'
import EditUser from './components/user-components/edit-user.component'
import DeleteUser from './components/user-components/delete-user.component'

import Parcels from './components/staff-components/parcel-list.component'
import AddParcel from './components/staff-components/add-parcels.component'
import StoredParcels from './components/staff-components/stored.component'
import ExportedParcels from './components/staff-components/exported.component'
import ParcelDetail from './components/staff-components/parcel-detail.component'

import RequestReport from './components/manager-components/request-report.component'
import DeleteParcel from './components/manager-components/delete-parcel.component'
import WarehouseDetail from './components/manager-components/warehouse-detail.component'

import Reports from './components/view-reports.component/reports.component'
import ViewReport from './components/view-reports.component/view-report.component'

import ManageWarehouse from './components/warehouse-components/manage-warehouse.component'
import AddWarehouse from './components/warehouse-components/add-warehouse.component'
import EditWarehouse from './components/warehouse-components/edit-warehouse.component'
import DeleteWarehouse from './components/warehouse-components/delete-warehouse.component'

import { logout } from "./actions/auth"
import { clearMessage } from "./actions/message"

import { history } from './helpers/history'


import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import EditParcel from "./components/staff-components/edit-parcel.component"
import ShowReports from "./components/manager-components/show-report.component"

import { Button } from '@material-ui/core'
import { navBarUseStyles } from './styles/material-style'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      currentUser: undefined,
    };

    history.listen((location) => {
      props.dispatch(clearMessage()); // clear message when changing location
    });
  }

  componentDidMount() {
    const user = this.props.user;

    if (user) {
      this.setState({
        currentUser: user,
      });
    }
  }

  componentWillUnmount() {
    localStorage.removeItem("store");
  }

  logOut() {
    this.props.dispatch(logout());
  }

  render() {
    const { currentUser } = this.state;

    return (
      <Router history={history}>
        <div>
          <div className={navBarUseStyles.root}>
            <AppBar position="static" style={{height: '55px'}}>
              <Toolbar>
                  <Typography variant="h6" >
                  <Link to="/home" className={navBarUseStyles.menuButton} style={{color: '#ffffff'}}>
                    My PWS
                   </Link> 
                  </Typography>
                { currentUser && (
                  <div className="navbar-nav ml-auto navbar-expand">
                    <li className="nav-item">
                      <Link to={"/profile"} style={{marginRight: 2}} >  
                          <Button className="text-light right-nav-items" startIcon={<AccountCircleIcon />} >
                              {currentUser.payload[0].firstName}
                          </Button>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Button href="/login" className="text-light right-nav-items" onClick={this.logOut}>
                        <ExitToAppIcon />
                      </Button>
                    </li>
                  </div> )
                }
              </Toolbar>
            </AppBar>
          </div>

          <div className="container mt-3">
            <Switch>
              <Route exact path={["/","/login"]} component={Login} />
              <Route exact path="/home" component={Home} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/edit-user" component={EditUser} />
              <Route exact path="/delete-user" component={DeleteUser} />
              <Route exact path="/profile" component={Profile} />
              <Route exact path="/staff" component={StaffMain} />
              <Route exact path="/manager" component={ManagerMain} />
              <Route exact path="/admin" component={AdminMain} />
              <Route exact path="/manage-user" component={ManageUser} />
              <Route exact path="/parcels" component={Parcels}/>
              <Route exact path="/add-parcel" component={AddParcel}/>
              <Route exact path="/stored-parcels" component={StoredParcels}/>
              <Route exact path="/exported-parcels" component={ExportedParcels}/>
              <Route exact path="/parcel-detail" component={ParcelDetail}/>\
              <Route exact path="/edit-parcel" component={EditParcel}/>
              <Route exact path="/request-report" component={RequestReport}/>
              <Route exact path="/delete-parcel" component={DeleteParcel}/>
              <Route exact path="/warehouse-detail" component={WarehouseDetail}/>
              <Route exact path="/reports" component={Reports}/>
              <Route exact path="/report-detail" component={ViewReport}/>
              <Route exact path="/manage-warehouse" component={ManageWarehouse}/>
              <Route exact path="/add-warehouse" component={AddWarehouse}/>
              <Route exact path="/edit-warehouse" component={EditWarehouse}/>
              <Route exact path="/delete-warehouse" component={DeleteWarehouse}/>
              <Route exact path="/show-report" component={ShowReports}/>
              <Route exact path="/palmskYz" component=""/>
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user,
  };
}

export default connect(mapStateToProps)(App);