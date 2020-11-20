import {CURRENT_USER, SET_MESSAGE} from './types'
import AdminService from '../services/admin-service'

export const currentUserData = (userId) => (dispatch) => {
    return AdminService.getUserById(userId).then((response) =>{
            dispatch({
                type: CURRENT_USER,
                payload: response.data.payload[0]
            })

            return Promise.resolve()
        },(error) => {
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
    )
}