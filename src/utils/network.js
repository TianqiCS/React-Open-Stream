import axios from 'axios';

export const getLiveStats = ()=> {
    let url = "http://live.vanillacraft.cn:8080/stat";
    try {
        return axios.get('https://cors-anywhere.herokuapp.com/' + url, {responseType: 'document'})
    } catch (e) {
        console.log("streaming server is down!");
    }

};