import { SELECT_USER } from '../actions/types'

const initialState = {
    userId: ""
}

export default function(state = initialState, action){
    const { type, payload} = action
    switch(type){
        case SELECT_USER:
            return { userId: payload }
        
        default:
            return state
    }
}