<template>
    <div class="article">
        <!-- 发布文章 -->
        <el-button plain @click="showArticleVisible">发布</el-button>
        <!-- 发布文章模态框 -->
        <el-dialog title="发布文章" :visible.sync="article_visible">
            <el-form :model="article_form">
                <el-form-item label="文章标题" :label-width="formLabelWidth">
                <el-input v-model="article_form.title" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="文章封面" :label-width="formLabelWidth">
                <!-- 图片上传 -->
                <el-upload
                    action="http://134.175.100.63:5588/file/upload"
                    list-type="picture-card"
                    :on-preview="handlePictureCardPreview"
                    :on-success='successHandler'>
                    <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
                </el-form-item>
                <el-form-item label="所属栏目" :label-width="formLabelWidth">
                <el-select v-model="article_form.categoryId" placeholder="请选择活动区域">
                    <el-option label="区域一" value="shanghai"></el-option>
                </el-select>
                </el-form-item>
                <el-form-item label="正文" :label-width="formLabelWidth">
                <el-input type="textarea" v-model="article_form.content"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="article_visible = false">取 消</el-button>
                <el-button type="primary" @click="article_visible = false">确 定</el-button>
            </div>
        </el-dialog>

        <!-- 搜索 -->
        <el-date-picker
            v-model="params.beginTime"
            type="date"
            placeholder="选择日期"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd">
        </el-date-picker>
        <el-date-picker
            v-model="params.endTime"
            type="date"
            placeholder="选择日期"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd">
        </el-date-picker>

        <!-- 文章数据 -->
        <el-table
            :data="articles.list"
            stripe
            @cell-click='showBigPicture'
            style="width: 100%">
            <el-table-column
                prop="title"
                label="文章标题"
                width="180">
            </el-table-column>
            <el-table-column
                prop="content"
                label="文章内容"
                width="380">
            </el-table-column>
            <el-table-column
                prop="publishtime"
                :formatter='dateFormat'
                label="发布时间"
                width="180">
            </el-table-column>
            <el-table-column
                prop="source"
                label="文章封面">
                <!-- 插槽 -->
                <template slot-scope="scope">
                    <img style="height:100px" :src="scope.row.source" alt="">
                </template>
            </el-table-column>
            <el-table-column
                prop="status"
                label="文章状态">
                <!-- 插槽 -->
                <template slot-scope="scope">
                    <el-switch
                        v-model="scope.row.status"
                        :active-value='1'
                        :inactive-value='0'
                        @change='checkArticle(scope.row)'>
                    </el-switch>
                </template>
            </el-table-column>

            <el-table-column label="操作">
                <!-- 插槽 -->
                <template slot-scope="scope">
                    <a href="" @click.prevent='delHandler(scope.row)'>删除</a>
                </template>
            </el-table-column>
        </el-table>

        <!-- 分页 -->
        <el-pagination
            background
            layout="prev, pager, next"
            :current-page='articles.page + 1'
            :page-size='articles.pageSize'
            :total="articles.total"
            @current-change='changePage'>
        </el-pagination>
        
        <!-- 查看大图模态框 -->
        <el-dialog
            title="大图显示"
            :visible.sync="picture_visible">
            <img width="100%" :src="imgUrl" alt="">
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="picture_visible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import moment from 'moment'
export default {
    data(){
    return {
      username: '',
      articles: [],
      params: {
          page: 0,
          pageSize: 10
      },
      picture_visible: false,
      imgUrl: '',
      article_visible: false,
      article_form: {},
      formLabelWidth: '120px',
      dialogVisible: false,
      dialogImageUrl: ''
    }
  },
  // 页面加载的时候
  created() {
    let token = localStorage.getItem('token');
    // 查询用户信息
    this.findMsg(token);
    // 查询所有文章
    this.loadArticle();
    // 查询所有栏目
    // this.loadCategory();
  },
  // 监听:可以实现分页搜索等功能
  watch: {
      params: {
          handler: function () {
              this.loadArticle()
          },
          deep: true
      }
  },
  methods:{
    // 删除
    delHandler(val) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            $.ajax({
                url: 'http://39.96.21.48:8099/manager/article/deleteArticleById',
                method: 'get',
                data: { id: val.id },
                success: (res) => {
                    this.$message({
                        type: 'success',
                        message: res.message
                    });
                    this.loadArticle();
                }
            })
        }).catch(() => {
            this.$message({
                type: 'info',
                message: '已取消删除'
            });
        });
    },
    handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
    },
    // 8. 图片上传
    successHandler(res) {
        this.article_form.source = ' http://134.175.100.63:8686/group1/' + res.data.id
    },
    // 7. 发布文章
    showArticleVisible() {
        this.article_visible = true;
    },
    // 6. 审核文章
    checkArticle(item) {
        // 根据当前文章的状态,封装参数
        if (item.status == 1) {
            var obj = {
                id: item.id,
                status: '审核通过'
            }
        } else {
            var obj = {
                id: item.id,
                status: '审核不通过'
            }
        }
        // 调用接口
        $.ajax({
            url: 'http://39.96.21.48:8099/manager/article/checkArticle',
            method: 'get',
            data: obj,
            success: (res) => {
                const h = this.$createElement;
                if (res.status == 500) {
                    this.$notify({
                        title: '警告',
                        message: h('i', { style: 'color: teal' }, res.message)
                    });
                } else {
                    this.$notify({
                        title: '成功',
                        message: h('i', { style: 'color: teal' }, res.message)
                    });
                }
                // 刷新数据
                this.loadArticle();
            }
        })

    },
    // 5. 分页
    changePage(page) {
        this.params.page = page - 1
    },
    // 4. 查看大图
    showBigPicture(row, column, cell, event) {
        if (column.label == '文章封面') {
            // 显示模态框
            this.picture_visible = true;
            // 将当前点击的图片地址放到模态框中
            this.imgUrl = row.source;
        }
    },
    // 3. 时间处理
    dateFormat(row, column) {
        // 看不懂的可以分别打印row和column
        return moment(row[column.property]).format('YYYY-MM-DD hh:mm')
    },
    // 2. 查询文章
    loadArticle() {
        $.ajax({
            url: 'http://39.96.21.48:8099/manager/article/findArticle',
            method: 'get',
            data: this.params,
            success: (res) => {
                // 修复最后一页只有一条数据删除时的bug
                if(res.data.list.length == 0){
                    this.params.page -= 1;
                    this.loadArticle()
                }
                this.articles = res.data;
                // 为了使用开关组件,需要将查询出来的文章数据进行改变
                res.data.list.map((item) => {
                    if (item.status == '审核通过') {
                        return item.status = 1
                    } else if (item.status == '未通过') {
                        return item.status = 0
                    }
                })
            }
        })
    },
    // 根据token查询用户信息
    findMsg(token) {
        $.ajax({
            url: 'http://39.96.21.48:8099/manager/user/info',
            method: 'get',
            data: { token },
            success: (res) => {
                this.username = res.data.username
            }
        })
    },
  }
}
</script>