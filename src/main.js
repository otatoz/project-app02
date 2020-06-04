import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// 引入自定义样式
import './style/common.css'

// 导入首页
import App from './App.vue';

// 导入登陆页面
import Login from './Login.vue'

import router from './router'

Vue.use(ElementUI);

let vm = new Vue({
  el: '#app',

  data(){
    return {
      token:localStorage.getItem('token')
    }
  },

  router,

  // created(){
  //   this.token = localStorage.getItem('token');
  // },
  render:function(createElement){
    let page = Login;
    if(this.token){
      page = App
    }
    return createElement(page)
  }
});
// 将vm设置到全局window
window.vm = vm;