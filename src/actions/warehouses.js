import { SELECT_WAREHOUSE, SET_MESSAGE } from "./types";
import WarehouseService from "../services/warehouse-service";

export const select_warehouse = (warehouseId) => ({
  type: SELECT_WAREHOUSE,
  payload: warehouseId,
});

export const add_warehouse = (
    name,
    address,
    zipCode,
    country,
    city,
    coordinates,
    phone,
    type,
    managerId,
    status) => (dispatch) => {
  return WarehouseService.addWarehouse(
    name,
    address,
    zipCode,
    country,
    city,
    coordinates,
    phone,
    type,
    managerId,
    status).then(
    (response) => {
      dispatch({
        type: SET_MESSAGE,
        payload: response.data.success,
      });

      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const edit_warehouse = () => (dispatch) => {
  return WarehouseService.editWarehouse().then(
    (response) => {
      dispatch({
        type: SET_MESSAGE,
        payload: response.data.success,
      });

      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const delete_warehouse = (warehouseId) => (dispatch) => {
  return WarehouseService.deleteWarehouse(warehouseId).then(
    (response) => {
      dispatch({
        type: SET_MESSAGE,
        payload: response.data.success,
      });

      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};
