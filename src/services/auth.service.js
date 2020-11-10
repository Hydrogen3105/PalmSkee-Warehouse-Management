import axios from "axios"
import authHeader from './auth-header'

const API_URL = "https://owsd-wms-backend.herokuapp.com/api/";

class AuthService {
  login(userId, password) {
    return axios
      .post(API_URL + "login", { userId, password })
      .then((response) => {
        if (response.data.payload[0].jwtToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(userId, firstName, lastName, position, address, zipCode, city, country, dob, gender, email, phone, warehouseId) {
    return axios.post(API_URL + 'users',
      {userId, firstName, lastName, position, address, zipCode, city, country, dob, gender, email, phone, warehouseId},
      { headers: authHeader() },
    )
  }
}

export default new AuthService()