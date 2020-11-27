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
        status,
      },
      { headers: authHeader() }
    );
  }

  editWarehouse(
    warehouseId,
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
    return axios.put(
      API_URL + `warehouses/${warehouseId}`,
      {
        warehouseId,
        name,
        address,
        zipCode,
        country,
        city,
        coordinates,
        phone,
        type,
        managerId,
        status,
      },
      { headers: authHeader() }
    );
  }

  deleteWarehouse(warehouseId) {
    return axios.delete(API_URL + `warehouses/${warehouseId}`, {
      headers: authHeader(),
    });
  }

  getAllWarehouses() {
    return axios.get(API_URL + "warehouses", { headers: authHeader() });
  }

  getWarehouseById(warehouseId) {
    return axios.get(API_URL + `warehouses/${warehouseId}`, {
      headers: authHeader(),
    });
  }
}

export default new WarehouseService();
