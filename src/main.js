// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Axios from 'axios';
import MintUI from 'mint-ui'
import '@/assets/font/iconfont.css'
import 'mint-ui/lib/style.css'

Vue.use(MintUI);

//图片预览插件
import VuePreview from 'vue-preview'
Vue.use(VuePreview);


//配置baseURL
Axios.defaults.baseURL = 'http://www.sinya.online/api/';
//Axios.defaults.baseURL = 'api/';
//讲axios配置到vue上
Vue.prototype.$axios = Axios;

//配置拦截器  显示/关闭loading效果
//请求拦截器
Axios.interceptors.request.use(function (config) {
  MintUI.Indicator.open({
    text:'玩命加载中...'
  });
  return config;
});
//响应拦截器
Axios.interceptors.response.use(function (res) {
  MintUI.Indicator.close();
  return res;
});





import Moment from 'moment'   //时间格式化
//定义全局时间过滤器
Vue.filter('converTime',function (data,formatType) {
  return Moment(data).format(formatType)
});
/**
 * formatType : 配置显示方式   字母大写
 * {{xxx | converTime('YYYY-MM-DD')}}
 * {{xxx | converTime('yyyy年mm月dd日')}}
 */
//字符串过滤器
Vue.filter('converStr',function (str,count) {
  return str.substring(0,count) + '...';
});

//注册全局组件
import NavBar from '@/components/common/NavBar'
Vue.component(NavBar.name,NavBar);






Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
//www.sinya.online/api/getlunbo
