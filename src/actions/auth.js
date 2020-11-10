import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    SET_MESSAGE,
  } from "./types";
  
import AuthService from "../services/auth.service";
import AdminService from "../services/admin-service"
  
export const register = (userId, firstName, lastName, position, address, zipCode, city, country, dob, gender, email, phone, warehouseId) => (dispatch) => {
    return AuthService.register(userId, firstName, lastName, position, address, zipCode, city, country, dob, gender, email, phone, warehouseId).then(
      (response) => {
        dispatch({
          type: REGISTER_SUCCESS,
        });
  
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
          type: REGISTER_FAIL,
        });
  
        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });
  
        return Promise.reject();
      }
    );
  };
  
export const login = (user_id, password) => (dispatch) => {
    return AuthService.login(user_id, password).then(
      (data) => {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: { user: data },
        });
  
        return Promise.resolve();
      },
      (error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.success) ||
          error.message ||
          error.toString();
  
        dispatch({
          type: LOGIN_FAIL,
        });
  
        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });
  
        return Promise.reject();
      }
    );
  };
  
export const logout = () => (dispatch) => {
    AuthService.logout();
  
    dispatch({
      type: LOGOUT,
    });
  };

export const delete_user = (userId) => (dispatch) => {
  return AdminService.deleteUser(userId).then((response) => {
      dispatch({
        type: SET_MESSAGE,
        payload: response.data.success
      })

      return Promise.resolve()
    },(error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.success) ||
        error.message ||
        error.toString();

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  )
}

export const edit_user = (userId, firstName, lastName, position, address, zipCode, city, country, dob, gender, email, phone, warehouseId) => (dispatch) => {
  return AdminService.editUser(userId, firstName, lastName, position, address, zipCode, city, country, dob, gender, email, phone, warehouseId).then((response) => {
    dispatch({
      type: SET_MESSAGE,
      payload: response.data.success
    })

    return Promise.resolve()
  },(error) => {
    const message =
      (error.response &&
        error.response.data &&
        error.response.data.success) ||
      error.message ||
      error.toString();

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

    return Promise.reject();
    }
  )
}