import React from 'react'
import { connect } from 'react-redux'
import { DataGrid } from '@material-ui/data-grid'
import { sendersTable } from '../../styles/material-style'


const columns = [
  { field: 'senderId', headerName: 'Sender ID', width: 200 },
  { field: 'senderName', headerName: 'Company Name', width: 200 },
]

function SendersTable({ dispatch, senders, onSelectSender }) {

  return (
      <div style={{ height: 250, width: '100%' }}>
        <DataGrid  className={sendersTable.root} rows={senders} columns={columns} pageSize={10} onRowClick={(row) => onSelectSender(row.data.senderId)}/>
      </div>
  );
}

export default connect()(SendersTable)