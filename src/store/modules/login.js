export default {
    // 命名空间
    namespaced:true,
    state:{
        token:'',
        userInfo:''
    },
    getters:{},
    mutations:{
        // 登录的突变
        refreshToken(state,token){
            state.token = token
        },
        // 用于控制登录完之后页面自动跳转
        initToken(state){
            let token = localStorage.getItem('token')
            state.token = token;
        },
        // 用户信息的突变
        refreshInfo(state,userInfo){
            state.userInfo = userInfo
        }
    },
    actions:{
        // 登录
        async login(context,params){
            let res = await $.ajax({
                url: 'http://39.96.21.48:8099/manager/user/login',
                method: 'post',
                data: JSON.stringify(params),
                contentType: 'application/json',
            })
            // 将token设置到浏览器
            localStorage.setItem('token', res.data.token)
            // 将token设置到state中
            context.commit('refreshToken',res.data.token)

            // 调用info方法
            context.dispatch('info')
        },
        // 根据token换取用户信息
        async info(context){
            let token = localStorage.getItem('token')
            let res = await $.get('http://39.96.21.48:8099/manager/user/info',{token})
            // 将用户信息放入浏览器
            localStorage.setItem('userInfo',JSON.stringify(res.data))
            // 将用户信息放入state
            context.commit('refreshInfo',res.data)
        }
    }
}