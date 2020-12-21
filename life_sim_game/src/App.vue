<template>
  <div id="app">
    <h2>Welcome to Life Simulator!</h2>
    <h4><router-link to="/users">Users</router-link></h4>
    <h4><router-link to="/register">Register</router-link></h4>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
  }
}
</script>

<style>

</style>
