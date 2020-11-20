import { SELECT_PARCEL, SET_MESSAGE } from './types'
import ParcelService from '../services/parcel-service'

export const select_parcel = (parcelId) => ({
    type: SELECT_PARCEL,
    payload: parcelId
})

export const add_parcel = ( senderId, fromWarehouseId, toWarehouseId, width, length, height, weight, optional ) => (dispatch) => {
    return  ParcelService.addParcel( senderId, fromWarehouseId, toWarehouseId, width, length, height, weight, optional )
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

export const edit_parcel = (parcelId, optional) => (dispatch) => {
    return  ParcelService.editParcel(parcelId, optional)
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

export const edit_status = (status, updateBy, parcels) => (dispatch) => {
    return  ParcelService.editStatus(status, updateBy, parcels)
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