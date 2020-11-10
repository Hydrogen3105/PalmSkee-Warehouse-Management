import AdminService from '../services/admin-service'
import { SET_MESSAGE } from '../actions/types'

export const edit_user = (userId, firstName, lastName, address, zipCode, city, country, dob, gender, email, phone, warehouseId) => (dispatch) => {
    return AdminService.editUser(userId, firstName, lastName, address, zipCode, city, country, dob, gender, email, phone, warehouseId).then(
        (response) => {
            dispatch({
                type: SET_MESSAGE,
                payload: response.data.success
            })

            return Promise.resolve()
        },
        (error) => {
            const message =
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString()
            
            dispatch({
                type: SET_MESSAGE,
                payload: message,
              });

            return Promise.reject()
        }
    )
}

export const delete_user = (userId) => (dispatch) => {
    return AdminService.deleteUser(userId).then(
        (response) => {
            dispatch({
                type: SET_MESSAGE,
                payload: response.data.success
            })

            return Promise.resolve()
        },
        (error) => {
            const message =
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString()
            
            dispatch({
                type: SET_MESSAGE,
                payload: message,
              });

            return Promise.reject()
        }
    )
}