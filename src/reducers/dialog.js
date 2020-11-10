import { OPEN_DIALOG, CLOSE_DIALOG, DIALOG_STATE } from '../actions/types'

const initialState = {
    isOpen: false,
    dialog_state: 0
}

export default function(state = initialState, action) {
    const { type, payload } = action

    switch(type) {
        case OPEN_DIALOG:
            return {
                ...state,
                isOpen: payload
            }
        
        case CLOSE_DIALOG:
            return {
                ...state,
                isOpen: payload
            }
        
        case DIALOG_STATE:
            return {
                ...state,
                dialog_state: payload % 3
            }
        
        default:
            return state
    }
}