import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

const columns = [
    { id: "userId" , label: "Staff ID" ,minWidth: 100},
    { id: "firstName" , label: "First name" ,minWidth: 150},
    { id: "lastName" , label: "Last name" ,minWidth: 150},
    { id: "position" , label: "Position" ,minWidth: 100}
]

class UsersTable extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            page: 0,
            rowPerPage: 10,

        }
        this.handleChangePage = this.handleChangePage.bind(this)
        this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this)
        this.handleSelectUser = this.handleSelectUser.bind(this)
    }

    handleChangePage = (newPage) => {
        this.setState({
            page: newPage
        })
    }
    
    handleChangeRowsPerPage = (event) => {
        this.setState({
            rowPerPage: +event.target.value
        })

        this.setState({
            page: 0
        })
    }
    
    handleSelectUser() {

    }

    render () {
      
        return (
            <Paper style={{width: 780}}>
            <TableContainer  >
              <Table stickyHeader aria-label="sticky table" >
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        style={{ minWidth: column.minWidth }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.props.users.slice(this.state.page * this.state.rowPerPage, this.state.page * this.state.rowPerPage + this.state.rowPerPage).map((row) => {
                    return (
                            <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                              {columns.map((column) => {
                                const value = row[column.id];
                                return (
                                  <TableCell key={column.id} align={column.align}>
                                      {value}
                                  </TableCell>
                                )
                              })}
                            </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 20, 30]}
              component="div"
              count={this.props.users.length}
              rowsPerPage={this.state.rowPerPage}
              page={this.state.page}
              onChangePage={this.handleChangePage}
              onChangeRowsPerPage={this.handleChangeRowsPerPage}
            />
          </Paper>
        )
    }
}

export default UsersTable