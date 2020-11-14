import { SELECT_PARCEL } from '../actions/types'

const initialState = {
    parcelId: ""
}
export default function(state = initialState, action) {
    const { type, payload } = action

    switch(type) {
        case SELECT_PARCEL: 
            return { parcelId: payload }
        
        default:
            return state
    }
}