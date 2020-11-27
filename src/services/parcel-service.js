import axios from 'axios'
import authHeader from './auth-header'
const API_URL = "https://owsd-wms-backend.herokuapp.com/api/"

class ParcelService {

    getAllParcel() {
        return axios.get(API_URL + 'parcels',{ headers: authHeader()})
    }

    getParcelById(parcelId) {
        return axios.get(API_URL + `parcels/${parcelId}`, { headers: authHeader()})
    }

    addParcel(senderId, fromWarehouseId, toWarehouseId, width, length, height, weight, optional) {
        return axios.post(API_URL + 'parcels', 
        { senderId, fromWarehouseId, toWarehouseId, width, length, height, weight, optional },
        { headers: authHeader() }
        )
    }

    editParcel(parcelId ,optional) {
        return axios.put(API_URL + `parcels/${parcelId}`,
        { optional },
        { headers: authHeader() }
        )
    }

    deleteParcel( parcelId ) {
        return axios.delete(API_URL + `parcels/${parcelId}`,
        { headers: authHeader() }
        )
    }

    editStatus(status, updateBy, parcels) {
        return axios.put(API_URL + 'parcels/status',
        { status, updateBy, parcels },
        { headers: authHeader()}
        )
    }
}

export default new ParcelService()