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

function WarehousesTable({ dispatch, warehouses, position }) {
  const handleSelectWarehouse = (warehouseId) => {
    dispatch(select_warehouse(warehouseId));
    if(position){
       history.push('/edit-warehouse')
    }
    else{
      history.push("/warehouse-detail");
    }
     
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
