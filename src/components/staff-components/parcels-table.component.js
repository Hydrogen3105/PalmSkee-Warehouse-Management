import React, {Component} from 'react'
import { connect } from 'react-redux'

import { history } from '../../helpers/history'
import { select_parcel } from '../../actions/parcel'
import { DataGrid } from '@material-ui/data-grid'


const columns = [
  { field: 'parcelId', headerName: 'Parcel ID', width: 200 },
  { field: 'receivedDate', headerName: 'Received Date', width: 200 },
  { field: 'toWarehouseId', headerName: 'Destination', width: 200 },
  { field: 'location',headerName: 'Lacation', width: 200, },
  { field: 'latestStatus', headerName: 'Status', width: 250, },
]

function ParcelsTable({ dispatch, parcels }) {

  const handleSelectParcel = (parcelId) => {
    dispatch(select_parcel(parcelId))
    history.push('/parcel-detail')
  }

  return (
      <div style={{ height: 500, width: '100%' }}>
        <DataGrid  rows={parcels} columns={columns} pageSize={15} onRowClick={(row) => handleSelectParcel(row.data.parcelId)}/>
      </div>
  );
}

export default connect()(ParcelsTable)