<template>
  <div slot="body">
    <el-row :gutter="30" class="body-position">
      <el-col :span="6" :xs="24" :sm="24" :md="6" :lg="6" style="margin-left: 20px;">
        <el-tree
          highlight-current
          :props="defaultProps"
          :load="loadNode1s"
          :expand-on-click-node="false"
          lazy>
          <span class="custom-tree-node" slot-scope="{ node, data }">
          <span @click="search(data)">{{ node.label }}</span>
          <span class="render-contents">
          <el-button class="fa"
                     type="text"
                     size="mini"
                     icon="el-icon-plus"
                     @click=newTree(data)>
          </el-button>
          <el-button class="fa"
                     type="text"
                     size="mini"
                     icon="el-icon-edit"
                     @click=editTree(data)>
          </el-button>
          <el-button class="fa"
                     type="text"
                     size="mini"
                     icon="el-icon-delete"
                     @click=deleteTree(data)>
          </el-button>
        </span>
        </span>);
        </el-tree>
      </el-col>
      <el-card class="box-card">
        <user-index :groupId="checkId"></user-index>
      </el-card>
      <group-form :visible.sync="dialogVisible" :editData="editData" :dialogStatus="dialogStatus" :title="title"
                  @success="loadData"></group-form>
    </el-row>
  </div>
</template>
<script>
import groupApi from '../../api/group'
import UserIndex from '../user'
import GroupForm from './form.vue'

export default {
  components: {
    UserIndex,
    GroupForm
  },
  props: {},
  data () {
    return {
      checkId: null,
      total: 0,
      query: {
        pageIndex: 1
      },
      defaultProps: {
        label: 'groupName',
        children: 'children',
        id: 'groupId'
      },
      dialogStatus: '',
      title: {
        true: '机构编辑',
        false: '机构新增'
      },
      dialogVisible: false,
      editData: {
        groupId: null,
        groupName: '',
        parentId: null
      },
      node: {
        level: 0
      }
    }
  },
  methods: {
    async loadNode1s (node, resolve) {
      this.node = node
      if (node.level === 0) {
        let resp = await groupApi.roleList(node.level)
        return resolve(resp.message)
      }
      if (node.level > 0) {
        let resp = await groupApi.roleList(node.data.groupId)
        return resolve(resp.message)
      }
    },
    // 新增树节点
    newTree () {
      this.dialogVisible = true
      this.dialogStatus = false
      // 对象赋值
      this.editData = {
        groupId: null,
        groupName: '',
        parentId: null
      }
    },
    // 编辑树节点
    editTree (data) {
      this.dialogVisible = true
      this.dialogStatus = true
      // 数据隔离
      this.editData.groupId = data.groupId
      this.editData.groupName = data.groupName
      this.editData.parentId = data.parentId
    },
    // 删除树
    deleteTree (data) {
      this.$confirm('确定删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        let id = data.groupId
        let resp = await groupApi.remove(id)
        console.log(resp)
        if (resp.status === 0) {
          this.$message({
            message: '操作成功',
            type: 'success'
          })
          this.loadData()
        } else if (resp.status === 2011 || resp.status === 2014) {
          this.$message({
            message: resp.msg,
            type: 'failed'
          })
        }
      }).catch(() => {

      })
    },
    // 查询
    async search (data) {
      this.checkId = data.groupId
    },
    loadData () {
      this.$router.push({
        name: '组织机构',
        query: {
          _t: Date.now()
        }
      }
      )
    }
  },
  mounted () {
  }
}
</script>

<style>
  .body-position {
    margin-bottom: 20px;
  }

  .render-contents {
    float: right;
    margin-left: 10px;
  }

  .fa {
    margin-left: 10px;
  }

  .fa:hover {
    color: #e6000f;
  }

  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
</style>
