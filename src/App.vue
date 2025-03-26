<template>
  <div id="app">
    <Navbar />
    <main class="main-content">
      <router-view/>
    </main>
    <Footer />
  </div>
</template>

<script>
// 修改导入路径，使用从src开始的绝对路径
import Navbar from '/src/components/layout/Navbar.vue'
import Footer from '/src/components/layout/Footer.vue'

export default {
  name: 'App',
  components: {
    Navbar,
    Footer
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  padding-top: 60px;
}
</style>