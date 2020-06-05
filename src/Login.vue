<template>
    <div class="login">
        <h2>看点咨询精选</h2>
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="用户名">
                <el-input v-model="form.username"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="form.password"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button @click='loginHandler'>登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import {mapState,mapActions} from 'vuex'
export default {
    data(){
        return {
            form:{}
        } 
    },
    methods:{
        // 'login'指的是命名空的名字，也就是login.js这个文件的名字
        // ['login']指的actions的方法
        ...mapActions('login',['login']),
        loginHandler(){
            this.login(this.form);
        }
    }
}
</script>