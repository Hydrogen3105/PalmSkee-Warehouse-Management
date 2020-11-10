import { SELECT_WAREHOUSE } from '../actions/types'

const initialState = {
    warehouse_id: ""
}

export default function(state = initialState, action) {
    const { type, payload} = action

    switch(type){
        case SELECT_WAREHOUSE:
            return { warehouse_id: payload}

        default:
            return state
    }
}