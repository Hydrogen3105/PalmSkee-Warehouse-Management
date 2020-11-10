import axios from 'axios'
import authHeader from './auth-header'
const API_URL = "https://owsd-wms-backend.herokuapp.com/api/"

class ParcelService {

    addParcel() {
        return axios.post(API_URL + '', 
        {},
        { headers: authHeader() }
        )
    }

    editParcel() {
        return axios.put(API_URL + '',
        {},
        { headers: authHeader() }
        )
    }

    deleteParcel( parcelId ) {
        return axios.delete(API_URL + '',
        { parcelId },
        { headers: authHeader() }
        )
    }
}

export default new ParcelService()