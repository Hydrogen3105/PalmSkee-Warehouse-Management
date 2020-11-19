import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'https://owsd-wms-backend.herokuapp.com/api/';

class UserService {
    changePassword(userId, oldPassword, newPassword){
        return axios.post (API_URL + 'change-password', {userId, oldPassword,newPassword} )
    }
}

export default new UserService();