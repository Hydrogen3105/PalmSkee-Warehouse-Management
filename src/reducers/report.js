import { SELECT_REPORT } from '../actions/types'

const initialState = {
    report_id: ""
}

export default function(state = initialState, action){
    const { type, payload} = action
    switch(type){
        case SELECT_REPORT:
            return { report_id: payload }
        
        default:
            return state
    }
}