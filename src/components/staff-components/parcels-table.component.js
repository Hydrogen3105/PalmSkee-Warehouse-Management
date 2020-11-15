import React, {Component} from 'react'
import { connect } from 'react-redux'

import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'

import { history } from '../../helpers/history'
import { select_parcel } from '../../actions/parcel'


const columns = [
    { id: "parcelId" , label: "Parcel ID" ,minWidth: 150},
    { id: "receivedDate" , label: "Recieved Date" ,minWidth: 150},
    { id: "toWarehouseId" , label: "Destination" ,minWidth: 150},
    { id: "location" , label: "Location" ,minWidth: 150},
    { id: "latestStatus", label: "Status", minWidth: 200}
]

class ParcelsTable extends Component {
    constructor(props) {
        super(props)
        this.state = {
            page: 0,
            rowPerPage: 10,

        }
        this.handleChangePage = this.handleChangePage.bind(this)
        this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this)
        this.handleSelectParcel = this.handleSelectParcel.bind(this)
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
    
    handleSelectParcel(parcelId) {
        this.props.dispatch(select_parcel(parcelId))
        history.push('/parcel-detail')
    }

    render () {
      
        return (
            <Paper style={{width: 1110}}>
            <TableContainer  >
              <Table stickyHeader aria-label="sticky table" >
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        style={{ minWidth: column.minWidth }}
                      >
                        <strong>{column.label}</strong>
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.props.parcels.slice(this.state.page * this.state.rowPerPage, this.state.page * this.state.rowPerPage + this.state.rowPerPage).map((row) => {
                    return (
                            <TableRow hover role="checkbox" tabIndex={-1} key={row['parcelId']} name={row['parcelId']} onClick={() => this.handleSelectParcel(row['parcelId'])} >
                              {columns.map((column) => {
                                const value = row[column.id]
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
              count={this.props.parcels.length}
              rowsPerPage={this.state.rowPerPage}
              page={this.state.page}
              onChangePage={this.handleChangePage}
              onChangeRowsPerPage={this.handleChangeRowsPerPage}
            />
          </Paper>
        )
    }
}

export default connect()(ParcelsTable)