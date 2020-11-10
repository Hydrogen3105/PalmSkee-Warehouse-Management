import { OPEN_DIALOG, CLOSE_DIALOG, DIALOG_STATE } from './types'

export const open_dialog = () =>{
    return {
        type: OPEN_DIALOG,
        payload: true
    }
} 

export const close_dialog = () => {
    return {
        type: CLOSE_DIALOG,
        payload: false
    }
}

export const dialog_state = (state) => {
    return {
        type: DIALOG_STATE,
        payload: state
    }
}