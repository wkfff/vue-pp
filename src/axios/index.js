import {
    Loading,
    Message
} from 'element-ui'
import axios from 'axios'
import qs from "qs";
import _ from "lodash";
import global from '../plugins/Global.js'


let loading

function startLoading() {
    loading = Loading.service({
        lock: true,
        text: '加载中……',
        background: 'rgba(0, 0, 0, 0.7)'
    })
}




let needLoadingRequestCount = 0

function showFullScreenLoading() {
    if (needLoadingRequestCount === 0) {
        startLoading()
    }
    needLoadingRequestCount++
}


const tryCloseLoading = () => {
    if (needLoadingRequestCount === 0) {
        loading.close()
    }
}


function tryHideFullScreenLoading() {
    if (needLoadingRequestCount <= 0) return
    needLoadingRequestCount--
    if (needLoadingRequestCount === 0) {
        _.debounce(tryCloseLoading, 300)()
    }
}


axios.defaults.timeout = 10000;
axios.defaults.baseURL = global.ServerUrl;


axios.defaults.paramsSerializer = (params) => {
    return qs.stringify(params, {
        arrayFormat: 'brackets'
    });
}


/****** request拦截器==>对请求参数做处理 ******/
axios.interceptors.request.use(config => {
    if (!config.showLoading) {
        showFullScreenLoading()
    }
    if (config.qs) {
        config.method === 'post' ?
            config.data = qs.stringify({
                ...config.data
            }) :
            config.params = {
                ...config.params
            };
        config.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    } else {
        config.headers['Content-Type'] = 'application/json;charset=UTF-8';
    }

    if (localStorage.ticket) {
        config.headers['Authorization'] = 'Bearer 90427caecd359bebe20fdfa4596bfe43';
        // config.headers['Authorization'] = 'Bearer '+localStorage.ticket; 
    }
    if (localStorage.projectId) {
        config.headers['project_id'] = localStorage.projectId;
    }

    return config;
}, error => { //请求错误处理
    tryHideFullScreenLoading();
    Message({
        showClose: true,
        message: error,
        type: "error"
    });
    Promise.reject(error)
});

/****** respone拦截器==>对响应做处理 ******/
axios.interceptors.response.use(
    response => { //成功请求到数据
        tryHideFullScreenLoading()
        //这里根据后端提供的数据进行对应的处理
        // if (response.data.result === 'SUCCESS') {
        //     return response.data;
        // } else {
        return response.data;
        // }
    },
    error => { //响应错误处理
        tryHideFullScreenLoading();
        Message({
            showClose: true,
            message: error,
            type: "error"
        });
        return Promise.reject(error)
    }
);

export default {
    axios,
}