import { SELECT_PARCEL, SET_MESSAGE } from './types'
import ParcelService from '../services/parcel-service'

export const select_parcel = (parcel_id) => ({
    type: SELECT_PARCEL,
    payload: parcel_id
})

export const add_parcel = () => (dispatch) => {
    return  ParcelService.addParcel()
            .then( (response) => {
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

export const edit_parcel = () => (dispatch) => {
    return  ParcelService.editParcel()
            .then( (response) => {
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

export const delete_parcel = (parcelId) => (dispatch) => {
    return  ParcelService.deleteParcel(parcelId)
            .then( (response) => {
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