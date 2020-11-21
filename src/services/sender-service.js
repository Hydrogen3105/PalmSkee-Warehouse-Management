import axios from 'axios'
import authHeader from './auth-header'

const API_URL = 'https://owsd-wms-backend.herokuapp.com/api/'

class SearchService {
    searchSender() {
        return axios.get(API_URL + "search/senders", { headers: authHeader() } )
    }
}

export default new SearchService()
    