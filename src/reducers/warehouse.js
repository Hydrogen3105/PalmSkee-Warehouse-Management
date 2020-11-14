import { SELECT_WAREHOUSE } from '../actions/types'

const initialState = {
    warehouseId: ""
}

export default function(state = initialState, action) {
    const { type, payload} = action

    switch(type){
        case SELECT_WAREHOUSE:
            return { warehouseId: payload}

        default:
            return state
    }
}