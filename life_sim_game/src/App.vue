<template>
  <div id="app">
    <NavBar id="navbar-size"/>
  </div>
</template>

<script>
import NavBar from './components/NavBar'

export default {
  name: 'App',
  components: {
    NavBar
  }
}
</script>

<style scoped>
#app{
    height:100vh;
    width:100vw;
    display:flex;
}
#navbar-size{
    width:35%;
    height:100%;
    background-color:yellow;
}
</style>
