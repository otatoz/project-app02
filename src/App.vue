<template>
  <div class='container'>
      <div class="header">看点资讯</div>
      <div class="left">
        <el-menu @select='selectHandler' default-active='Article'>
          <el-menu-item index="Article">
            <i class="el-icon-tickets"></i>
            <span slot="title">文章管理</span>
          </el-menu-item>
          <el-menu-item index="Category">
            <i class="el-icon-menu"></i>
            <span slot="title">栏目管理</span>
          </el-menu-item>
          <el-menu-item index="User">
            <i class="el-icon-document"></i>
            <span slot="title">用户管理</span>
          </el-menu-item>
          <el-menu-item index="Comment">
            <i class="el-icon-setting"></i>
            <span slot="title">评论管理</span>
          </el-menu-item>
        </el-menu>
      </div>
      <div class="right">
        <div class="warpper">
          <keep-alive>
            <component :is="currentPage"></component>
          </keep-alive>
        </div>
      </div>
  </div>
</template>

<script>
import Article from './pages/Article.vue'
import Category from './pages/Category.vue'
import User from './pages/User.vue'
import Comment from './pages/Comment.vue'

export default {
  name: 'App',
  data(){
    return {
      currentPage:'Article'
    }
  },
  components: {
    Article,
    Category,
    User,
    Comment
  },
  methods:{
    // 切换右侧组件
    selectHandler(index){
      this.currentPage = index;
    }
  }
}
</script>

<style scoped>
  /* 右侧样式 */
  .container .warpper {
    height:600px;
    margin: 1em;
    padding: 1em;
    background-color: #ccc;
    border-radius: 5px;
    overflow:auto;
  }
  .container .right{
    margin-left: 200px;
  }
  /* 左侧样式 */
  .container{
    height:100%;
    overflow: hidden;
  }
  .container .left{
    width: 200px;
    height: 100%;
    float: left;
  }
  /* 头部样式 */
  .container .header{
    height: 50px;
    background-color: teal;
    line-height: 50px;
    color:#fff;
    padding:0 1em;
  }
</style>
