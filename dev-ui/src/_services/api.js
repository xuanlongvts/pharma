import axios from 'axios';
import { Config } from '../config';

export default class API {
    constructor() {
        this.token = undefined;
        this.headers = {};
    }

    fetch(url) {
        axios.defaults.baseURL = Config.API_SERVER;
        // axios.defaults.withCredentials = true;

        return axios.get(url);
    }

    fetchCrossDomain(url) {
        return axios.get(url);
    }

    // fetchMulti(){
    //     const path1 = 'url1';
    //     const path2 = 'url2';
    //     let res1 = ''; let res2 = '';
    //     promises1 = this.fetch(path1).then((response) => { res1 = response; });
    //     promises2 = this.fetch(path2).then((response) => { res2 = response; });
    //     axios.all([promisesSubsidy, promisesDemandVsActual]).then(
    //         axios.spread(function () {
    //             console.log(res1, res2);
    //         })).catch(e => {
    //             console.log(e);
    //         });
    // }

    get(url) {
        if (!this.token) {
            throw new Error('The API require token !!!');
        }
        axios.defaults.baseURL = Config.API_SERVER;
        const options = { headers: this.headers };

        return axios.get(url, options);
    }

    put({ path = '', payload }) {
        return axios({
            baseURL: Config.API_SERVER,
            data: payload,
            method: 'PUT',
            url: path,
            headers: this.headers
        });
    }

    post({ path = '', payload }) {
        return axios({
            baseURL: Config.API_SERVER,
            data: payload,
            method: 'POST',
            url: path,
            headers: this.headers
        });
    }

    delete({ path = '', payload }) {
        return axios({
            baseURL: Config.API_SERVER,
            data: payload,
            method: 'DELETE',
            url: path,
            headers: this.headers
        });
    }
}
