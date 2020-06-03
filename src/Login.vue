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
                <el-button @click='login'>登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
export default {
    data(){
        return {
            form:{}
        } 
    },
    methods:{
        login(){
            $.ajax({
                url: 'http://39.96.21.48:8099/manager/user/login',
                method: 'post',
                data: JSON.stringify(this.form),
                contentType: 'application/json',
                success: (res) => {
                    // 将token设置到浏览器
                    localStorage.setItem('token', res.data.token)
                    // 将token赋值给data中的token
                    window.vm.token = res.data.token
                    // 调用根据token获取用户信息的方法
                    // this.findMsg(res.data.token);
                    // 查询文章
                    // this.loadArticle();
                }
            })
        }
    }
}
</script>