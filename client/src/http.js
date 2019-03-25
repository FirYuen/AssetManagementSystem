import axios from 'axios'
import { Message, Loading } from "element-ui";
import router from './router';
let loading
function startLoading() {
    loading = Loading.service({
        lock: true,
        text: "正在加载中...",
        background: 'rgba(0,0,0,0.7)'
    })
}
function endLoading() {
    loading.close();
}
//请求拦截
axios.interceptors.request.use(
    config => {
       
        if(config.loading===true||config.loading===undefined){
            startLoading();
        }
        if (localStorage.eleToken) {
            //设置请求头
            config.headers.Authorization = localStorage.eleToken;
        }
        return config;
    }, err => {
        return Promise.reject(err)
    }
)
//响应拦截
axios.interceptors.response.use(response => {
    if(response.config.loading===true||response.config.loading===undefined){
        endLoading();
    }
   
    return response
}, err => {
    //错误提醒
    if(err.config.loading===true||err.config.loading===undefined){
        endLoading();
    }
    Message.error(err.response.data)
    //获取错误状态码并且清除eleToken
    let { statusCode } = err.response
    if (statusCode == 401) {
        Message.error("登录状态异常,请重新登录");
        localStorage.removeItem('eleToken')
        //跳转到login
        router.push('/login');
    }
    return Promise.reject(err)
})
export default axios