import login_status from '../actions/auth'
import { LOGIN_STATUS } from '../actions/types'

const initialState = {
    statusId: ""
}

export default function(state = initialState, action) {
    const { type, payload } = action

    switch(type) {
        case LOGIN_STATUS: 
            return { statusId: payload }
        
        default:
            return state
    }
}