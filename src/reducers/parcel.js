import { SELECT_PARCEL } from '../actions/types'

const initialState = {
    parcel_id: ""
}
export default function(state = initialState, action) {
    const { type, payload } = action

    switch(type) {
        case SELECT_PARCEL: 
            return { parcel_id: payload }
        
        default:
            return state
    }
}