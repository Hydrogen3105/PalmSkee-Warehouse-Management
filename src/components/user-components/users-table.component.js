import React from "react";
import { connect } from "react-redux";

import { history } from "../../helpers/history";
import { select_user } from "../../actions/admin";
import { DataGrid } from "@material-ui/data-grid";

const columns = [
  { field: "userId", headerName: "User ID", width: 200 },
  { field: "firstName", headerName: "First Name", width: 200 },
  { field: "lastName", headerName: "Last Name", width: 200 },
  { field: "position", headerName: "Position", width: 200 },
];

function UsersTable({ dispatch, users }) {
  const handleSelectUser = (userId) => {
    dispatch(select_user(userId));
    history.push("/edit-user");

  };
  return (
    <div>
    <div style={{ height: 500, width: 760 }}>
      <DataGrid
        rows={users}
        columns={columns}
        pageSize={10}
        onRowClick={(row) => handleSelectUser(row.data.userId)}
      />

    </div>
    </div>
  );
}

export default connect()(UsersTable)

const column_mini = [
  { field: 'userId', headerName: 'User ID', width: 200 },
  { field: 'firstName', headerName: 'First Name', width: 200 },
  { field: 'lastName', headerName: 'Last Name', width: 200 },
]

export function MiniUsersTable({ users }) {

  return (
      <div style={{ height: 200, width: '100%' }}>
          <DataGrid  rows={users} columns={column_mini} pageSize={10} />
      </div>
  );
}
