<template>
  <div>
    <el-dialog :title="title[dialogStatus]" width="600px" :visible.sync="show">
      <div>
        <el-form ref="forms" :model="editData" :rules="rule" label-width="100px" v-if="!dialogStatus">
          <el-form-item label="父级id" :label-width="formLabelWidth" :hidden="true" prop="parentId">
            <el-input v-model="editData.parentId"></el-input>
          </el-form-item>
          <el-form-item label="选择机构" :label-width="formLabelWidth" :disabled="dialogStatus" :hidden="dialogStatus">
            <el-cascader
              :props="treeRoles"
              :options="options"
              :show-all-levels="false"
              change-on-select
              @change="createList">
            </el-cascader>
          </el-form-item>
          <el-form-item label="名称" :label-width="formLabelWidth" prop="groupName">
            <el-input v-model="editData.groupName" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="" :label-width="formLabelWidth">
            <el-button type="primary" @click="onSubmit" v-text="'新增'"></el-button>
            <el-button @click.native="show=false">取消</el-button>
          </el-form-item>
        </el-form>
        <el-form v-else ref="forms" :model="editData" :rules="rule" label-width="100px">
          <el-form-item label="组织id" :label-width="formLabelWidth" :hidden="true" prop="groupId">
            <el-input v-model="editData.groupId"></el-input>
          </el-form-item>
          <el-form-item label="名称" :label-width="formLabelWidth" prop="groupName">
            <el-input v-model="editData.groupName" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="" :label-width="formLabelWidth">
            <el-button type="primary" @click="onSubmit" v-text="'修改'"></el-button>
            <el-button @click.native="show=false">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import userFrom from '../user/form'
import sysApi from '../../api/group'

export default {
  comments: {userFrom},
  name: 'forms',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    editData: {
      Type: Array,
      required: true
    },
    dialogStatus: {
      Type: String,
      required: true
    },
    title: {
      Type: Map,
      required: true
    }
  },
  watch: {
    show (val) {
      if (!val) {
        this.$emit('update:visible', val)
        this.options = [{
          groupId: '700038',
          groupName: '普元上海',
          children: []
        }]
      }
    },
    visible (val) {
      if (val) {
        this.show = this.visible
      }
    }
  },
  data () {
    return {
      show: false,
      formLabelWidth: '100px',
      options: [{
        groupId: '700038',
        groupName: '普元上海',
        children: []
      }],
      optionId: null,
      rule: {
        groupName: [
          {required: true, trigger: '', message: '请输入组织名称！'}
        ],
        groupId: [
          {required: true, trigger: '', message: '组织id不能为空'}
        ]
      },
      treeRoles: {
        value: 'groupId',
        label: 'groupName',
        children: 'children'
      }
    }
  },
  methods: {
    // 懒加载下拉选
    async createList (val) {
      this.optionId = val[val.length - 1]
      this.editData.parentId = this.optionId
      let resp = await sysApi.roleList(val[val.length - 1])
      if (resp.message.length > 0) {
        if (val.length === 1) {
          this.options[0].children = resp.message
        }
        if (val.length === 2) {
          this.options[0].children.forEach((items, index) => {
            if (this.optionId === items.groupId) {
              this.$set(items, 'children', resp.message)
            }
          })
        }
        if (val.length === 3) {
          this.options[0].children.forEach((items, index) => {
            if (items.children) {
              items.children.forEach((itemss, index) => {
                if (this.optionId === itemss.groupId) {
                  this.$set(itemss, 'children', resp.message)
                }
              })
            }
          })
        }
      }
    },
    async onSubmit () {
      this.$refs.forms.validate(async valid => {
        if (valid) {
          let resp
          if (this.dialogStatus) {
            resp = await sysApi.update(this.editData)
          } else {
            resp = await sysApi.create(this.editData)
          }
          if (resp.status === 0) {
            this.$emit('success')
            this.$message({
              message: '操作成功',
              type: 'success'
            })
            this.show = false
          }
        }
      })
    }
  }
}
</script>
<style scoped>

</style>
