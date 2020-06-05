<template>
    <div class="category">
        <el-table
        :data="categories"
        style="width: 100%">
            <el-table-column
                prop="name"
                label="栏目名称"
                width="180">
            </el-table-column>
            <el-table-column
                prop="comment"
                label="栏目描述"
                width="180">
            </el-table-column>
            <el-table-column
                prop="parent.name"
                label="父栏目">
                <template v-slot='slot'>
                    <div v-if='slot.row.parent'>{{slot.row.parent.name}}</div>
                    <div v-else>---</div>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
import {mapState,mapActions} from 'vuex'

export default {
    computed:{
        ...mapState('category',['categories'])
    },
    methods:{
        ...mapActions('category',['findAllCategory'])
    },
    created(){
        this.findAllCategory()
    }
}
</script>