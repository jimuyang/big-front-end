<template>
  <div id="app">
    <!-- <img src="./assets/logo.png">
    <div>
      <p>
        If Element is successfully added to this project, you'll see an
        <code v-text="'<el-button>'"></code>
        below
      </p>
      <el-button>el-button</el-button>
    </div>
    <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <!-- <layout-example></layout-example> -->
    <main-container></main-container>
  </div>
  
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import LayoutExample from './components/layout/layout.vue'
import MainContainer from './components/layout/main.vue'

export default {
  name: 'app',
  components: {
    HelloWorld,
    'layout-example': LayoutExample,
    'main-container': MainContainer
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
