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


export default function ParcelSelectTable({ onSelectParcel, status }) {
    const [showParcels, setShowParcels] = React.useState([])
    const [selectedParcels, setSelectedParcels] = React.useState([])

    React.useEffect(() => {
        ParcelService.getAllParcel()
        .then((response) => {
            let filter_parcel = []
            if(status === 'delete'){
                filter_parcel = response.data.payload
            }
            else {
                filter_parcel = response.data.payload.filter((parcel) => parcel.latestStatus === status )
            } 
            const unstored = filter_parcel.map((parcel) => {
                return {
                    ...parcel,
                    id: parcel.parcelId
                }
            })
            setShowParcels(unstored)
        })
    }, [])

    React.useEffect(() => {
        onSelectParcel(selectedParcels)
    },[selectedParcels])

    return (
        <div style={{ height: 500, width: '100%' }}>
            <DataGrid   rows={showParcels} columns={columns} pageSize={10} checkboxSelection 
                        onSelectionChange={(newSelection) => setSelectedParcels(newSelection.rowIds)}
            />
        </div>
    );
}