<template>
  <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" label-width="0px"
           class="demo-ruleForm login-container">
    <h3 class="title">系统登录</h3>
    <el-form-item prop="account">
      <el-input type="text" v-model="ruleForm2.userName" auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item prop="checkPass">
      <el-input type="password" v-model="ruleForm2.passWord" auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
    <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
    <el-form-item style="width:100%;">
      <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit2" :loading="logining">登录
      </el-button>
      <!--<el-button @click.native.prevent="handleReset2">重置</el-button>-->
    </el-form-item>
  </el-form>
</template>

<script>
import sysApi from '../../api/user/index'

export default {
  data () {
    return {
      logining: false,
      ruleForm2: {
        userName: 'admin',
        passWord: 'admin'
      },
      rules2: {
        userName: [
          {required: true, message: '请输入账号', trigger: 'blur'}
        ],
        passWord: [
          {required: true, message: '请输入密码', trigger: 'blur'}
        ]
      },
      checked: true
    }
  },
  methods: {
    async handleSubmit2 (ev) {
      this.$refs.ruleForm2.validate(async valid => {
        if (valid) {
          this.logining = true
          let data = await sysApi.login(this.ruleForm2)
          this.logining = false
          let msg = data.msg
          let user = null
          if (data.message) {
            user = data.message
            this.$message({
              message: msg,
              type: 'success'
            })
          }
          sessionStorage.setItem('user', JSON.stringify(user))
          this.$router.push({path: '/'})
        } else {
          console.log('error submit!!')
          return false
        }
      }
      )
    }
  }
}

</script>

<style lang="scss" scoped>
  .login-container {
    /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #1F2D3D;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
    font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimSun, sans-serif;
    .title {
      margin: 0px auto 40px auto;
      text-align: center;
      color: #505458;
    }
    .remember {
      margin: 0px 0px 35px 0px;
    }
  }
</style>
