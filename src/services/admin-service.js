import axios from 'axios'
import authHeader from './auth-header'
const API_URL = "https://owsd-wms-backend.herokuapp.com/api/"

class AdminService {
    deleteUser(userId) {
        return axios.delete(API_URL + `users/${userId}`, { headers : authHeader() })
    }

    editUser(userId, firstName, lastName, address, zipCode, city, country, dob, gender, email, phone, warehouseId) {
        return axios.put(API_URL + `users/${userId}`, 
                { firstName, lastName, address, zipCode, country, city, phone, warehouseId, dob, gender, email, },
                { headers: authHeader() },
            )
    }

    getAllUsers() {
        return axios.get(API_URL + "users/", { headers: authHeader() })
    }
}

export default new AdminService()