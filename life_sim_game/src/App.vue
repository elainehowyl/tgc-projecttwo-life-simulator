<template>
  <div id="app">
      <NavBar id="navbarsize"/>
      <GameDisplay id="game-display-size"/>
      <!-- <div id="testing">
    <b-sidebar id="sidebar-no-header" aria-labelledby="sidebar-no-header-title" no-header shadow>
      <template #default="{ hide }">
        <div class="p-3">
          <h4 id="sidebar-no-header-title">Custom header sidebar</h4>
          <p>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
            in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
          </p>
          <nav class="mb-3">
            <b-nav vertical>
              <b-nav-item active @click="hide">Active</b-nav-item>
              <b-nav-item href="#link-1" @click="hide">Link</b-nav-item>
              <b-nav-item href="#link-2" @click="hide">Another Link</b-nav-item>
            </b-nav>
          </nav>
          <b-button variant="primary" block @click="hide">Close Sidebar</b-button>
        </div>
        <b-button v-b-toggle.sidebar-no-header>Toggle Sidebar</b-button>
      </template>
    </b-sidebar>
    <b-button v-b-toggle.sidebar-no-header>Toggle Sidebar</b-button>
  </div> -->
      <!-- <div>
  <b-navbar type="dark" variant="dark">
    <b-navbar-nav>
      <b-nav-item><router-link to="/login">Login</router-link></b-nav-item>
      <b-nav-item><router-link to="/register">Register</router-link></b-nav-item>
      <b-nav-item><router-link to="/users">Users</router-link></b-nav-item>
      <b-nav-item><router-link to="/testing">Testing</router-link></b-nav-item>
      <b-nav-item><router-link to="/navbar">Navbar</router-link></b-nav-item>
    </b-navbar-nav>
  </b-navbar>
</div> -->
    <router-view></router-view>
  </div>
</template>

<script>
import NavBar from './components/NavBar'
import GameDisplay from './components/GameDisplay'
export default {
  name: 'App',
  components: {
      NavBar, GameDisplay
  }
}
</script>

<style scoped>
#app{
    width:100vw;
    height:100vh;
    display:flex;
}
#navbarsize{
    width:35%;
    height:100%;
    background-color:yellow;
}
#game-display-size{
    width:65%;
    /* background-color:blue; */
}
</style>
