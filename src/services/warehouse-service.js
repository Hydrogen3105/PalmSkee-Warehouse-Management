import axios from 'axios'
import authHeader from './auth-header'
const API_URL = "https://owsd-wms-backend.herokuapp.com/api/"

class WarehouseService {

    addWarehouse() {
        return axios.post(API_URL + '', 
        {},
        { headers: authHeader() }
        )
    }

    editWarehouse() {
        return axios.put(API_URL + '',
        {},
        { headers: authHeader() }
        )
    }

    deleteWarehouse( parcelId ) {
        return axios.delete(API_URL + '',
        { parcelId },
        { headers: authHeader() }
        )
    }
}

export default new WarehouseService()