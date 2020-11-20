import axios from "axios";
import authHeader from "./auth-header";
const API_URL = "https://owsd-wms-backend.herokuapp.com/api/";

class WarehouseService {
  addWarehouse(
    name,
    address,
    zipCode,
    country,
    city,
    coordinates,
    phone,
    type,
    managerId,
    status
  ) {
    return axios.post(
      API_URL + "warehouses",
      {
        name,
        address,
        zipCode,
        country,
        city,
        coordinates,
        phone,
        type,
        managerId,
        status
      },
      { headers: authHeader() }
    );
  }

  editWarehouse() {
    return axios.put(API_URL + "", {}, { headers: authHeader() });
  }

  deleteWarehouse(parcelId) {
    return axios.delete(API_URL + "", { parcelId }, { headers: authHeader() });
  }

  getAllWarehouses(){
    return axios.get( API_URL + "warehouses", { headers: authHeader() })
  }

  getWarehouseById(warehouseId){

  }

}

export default new WarehouseService();
