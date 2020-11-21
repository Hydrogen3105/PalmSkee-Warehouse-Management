/*import React, {Component} from 'react'
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
    { id: "warehouseId" , label: "Warehouse ID" ,minWidth: 150},
    { id: "recievedDate" , label: "Recieved Date" ,minWidth: 150},
    { id: "destination" , label: "Destination" ,minWidth: 150},
    { id: "location" , label: "Location" ,minWidth: 150},
    { id: "status", label: "Status", minWidth: 200}
]

class WarehousesTable extends Component {
    constructor(props) {
        super(props)
        this.state = {
            page: 0,
            rowPerPage: 5,

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
        history.push('/edit-parcel')
    }

    render () {
      
        return (
            <Paper style={{width: 700}}>
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
                  this.props.users.slice(this.state.page * this.state.rowPerPage, this.state.page * this.state.rowPerPage + this.state.rowPerPage).map((row) => {
                    return (
                            <TableRow hover role="checkbox" tabIndex={-1} key={row['userId']} name={row['userId']} onClick={() => this.handleSelectUser(row['userId'])} >
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
                  })
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 15]}
              component="div"
              count={this.props.warehouses.length}
              rowsPerPage={this.state.rowPerPage}
              page={this.state.page}
              onChangePage={this.handleChangePage}
              onChangeRowsPerPage={this.handleChangeRowsPerPage}
            />
          </Paper>
        )
    }
}

export default connect()(WarehousesTable)*/

import React from "react";
import { connect } from "react-redux";

import { history } from "../../helpers/history";
import { select_warehouse } from "../../actions/warehouses";
import { DataGrid } from "@material-ui/data-grid";

const columns = [
  { field: "warehouseId", headerName: "Warehouse ID", width: 130 },
  { field: "name", headerName: "Warehouse Name", width: 200 },
  { field: "managerId", headerName: "Manager ID", width: 150 },
  { field: "phone", headerName: "Contact", width: 150 },
  { field: "latestStatus", headerName: "Status", width: 100 },
];

function WarehousesTable({ dispatch, warehouses }) {
  const handleSelectWarehouse = (warehouseId) => {
    dispatch(select_warehouse(warehouseId));
    history.push("/warehouse-detail");
  };

  return (
    <div style={{ height: 500, width: 750 }}>
      <DataGrid
        rows={warehouses}
        columns={columns}
        pageSize={10}
        onRowClick={(row) => handleSelectWarehouse(row.data.warehouseId)}
      />
    </div>
  );
}

export default connect()(WarehousesTable);
