export default {
    // 命名空间
    namespaced:true,
    state:{
        categories:[]
    },
    getters:{},
    mutations:{
        refreshCategroy(state,category){
            state.categories = category;
        }
    },
    actions:{
        //查询所有栏目 
        async findAllCategory(context){
            let res = await $.get('http://39.96.21.48:8099/manager/category/findAllCategory')
            // 通过提交突变的方式，改变state中categroy
            context.commit('refreshCategroy',res.data)
        }
    }
}