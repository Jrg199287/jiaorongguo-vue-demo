<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view :key="key"></router-view>
    </transition>
  </div>
</template>
<script>
export default {
  name: 'app',
  computed: {
    key () {
      return this.$route.name !== undefined ? this.$route.name + +this.$route.query._t : this.$route
    }
  }
}
</script>

<style>
  body {
    margin: 0px;
    padding: 0px;
    font-size: 14px;
    -webkit-font-smoothing: antialiased;
  }

  #app {
    position: absolute;
    top: 0px;
    bottom: 0px;
    width: 100%;
  }
  .el-submenu [class^=fa] {
    vertical-align: baseline;
    margin-right: 10px;
  }

  .el-menu-item [class^=fa] {
    vertical-align: baseline;
    margin-right: 10px;
  }
</style>
