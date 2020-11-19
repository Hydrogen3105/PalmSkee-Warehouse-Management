import React from 'react'
import { DataGrid } from '@material-ui/data-grid'
import ParcelService from '../../services/parcel-service'

const columns = [
  { field: 'parcelId', headerName: 'Parcel ID', width: 200 },
  { field: 'receivedDate', headerName: 'Received Date', width: 200 },
  { field: 'toWarehouseId', headerName: 'Destination', width: 200 },
  { field: 'location',headerName: 'Lacation', width: 200, },
  { field: 'latestStatus', headerName: 'Status', width: 250, },
]


export default function ParcelSelectTable({ onSelectParcel, parcels }) {
    const [selectedParcels, setSelectedParcels] = React.useState([])


    React.useEffect(() => {
        onSelectParcel(selectedParcels)
    },[selectedParcels])

    return (
        <div style={{ height: 500, width: '100%' }}>
            <DataGrid   rows={parcels} columns={columns} pageSize={20} checkboxSelection 
                        onSelectionChange={(newSelection) => setSelectedParcels(newSelection.rowIds)}
            />
        </div>
    );
}