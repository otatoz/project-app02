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
import store from './store'

Vue.use(ElementUI);

import {mapState,mapMutatios, mapMutations} from 'vuex'

let vm = new Vue({
  el: '#app',

  computed:{
    ...mapState('login',['token'])
  },
  created(){
    this.initToken()
  },
  methods:{
    ...mapMutations('login',['initToken'])
  },

  router,
  store,

  render:function(createElement){
    let page = Login;
    if(this.token){
      page = App
    }
    return createElement(page)
  }
});
