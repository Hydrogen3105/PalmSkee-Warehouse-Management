import { CURRENT_USER } from '../actions/types'

const initialState = {
    userData: {}
}

export default function(state = initialState, action) {
    const { type, payload } = action
    switch(type) {
        case CURRENT_USER:
            return { userData: payload}

        default: 
            return state
    }
}