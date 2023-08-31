import axios from 'axios';
import Constant from 'expo-constants';

const instance = axios.create({
    baseURL: Constant.expoConfig?.extra?.API_URL,
    timeout: 1000,
    headers: {'X-Custom-Header': 'foobar'}
});

export default instance;