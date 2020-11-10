import { SELECT_REPORT } from './types'

export const select_report = (report_id) => {
    return {
        type: SELECT_REPORT,
        payload: report_id
    }
}