import React from 'react'
import { connect } from "react-redux"

import { history } from '../../helpers/history'
import { select_user } from '../../actions/admin'
import { DataGrid } from '@material-ui/data-grid'

const columns = [
  { field: 'userId', headerName: 'User ID', width: 200 },
  { field: 'firstName', headerName: 'First Name', width: 200 },
  { field: 'lastName', headerName: 'Last Name', width: 200 },
  { field: 'position',headerName: 'Position', width: 200, },
]

function UsersTable({ dispatch , users }) {

  const handleSelectUser = (userId) => {
    dispatch(select_user(userId))
    history.push('/edit-user')
  }

  return (
      <div style={{ height: 500, width: 760 }}>
          <DataGrid  rows={users} columns={columns} pageSize={10} onRowClick={(row) => handleSelectUser(row.data.userId)}/>
      </div>
  );
}

export default connect()(UsersTable)

const column_mini = [
  { field: 'user_id', headerName: 'User ID', width: 100 },
  { field: 'first_name', headerName: 'First Name', width: 150 },
  /*{ field: 'last_name', headerName: 'Last Name', width: 100 },*/
]

export function MiniUsersTable({ users }) {

  return (
      <div style={{ height: 500, width: 250 }}>
          <DataGrid  rows={users} columns={column_mini} pageSize={10} />
      </div>
  );
}