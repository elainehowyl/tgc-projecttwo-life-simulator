<!--REMEMBER TO CHANGE API LINK TO HEROKU'S INSTEAD OF EXPRESS-->
<template>
  <div id="app">
    <div id="app-container">
    <NavBar id="navbar-size"/>
    <GameDisplay id="gamedisplay-size"/>
    </div>
  </div>
</template>

<script>
import NavBar from './components/sidebar/NavBar'
import GameDisplay from './components/gamedisplay/GameDisplay'

export default {
  name: 'App',
  components: {
    NavBar, GameDisplay
  }
}
</script>

<style scoped>
/* @import url('https://fonts.googleapis.com/css2?family=East+Sea+Dokdo&display=swap'); */
/* @import url('https://fonts.googleapis.com/css2?family=Hanalei+Fill&display=swap'); */
/* @import url('https://fonts.googleapis.com/css2?family=Bangers&display=swap'); */
/* @import url('https://fonts.googleapis.com/css2?family=Luckiest+Guy&display=swap'); */
/* @import url('https://fonts.googleapis.com/css2?family=Black+Ops+One&display=swap'); */
/* @import url('https://fonts.googleapis.com/css2?family=Chewy&display=swap'); */
/* @import url('https://fonts.googleapis.com/css2?family=Frijole&display=swap'); */
/* @import url('https://fonts.googleapis.com/css2?family=Freckle+Face&display=swap'); */
/* @import url('https://fonts.googleapis.com/css2?family=Piedra&display=swap'); */



#app{
    height:100vh;
    width:100vw;
    /* display:flex; */
    /* font-family: 'East Sea Dokdo', cursive; */
    /* font-family: 'Hanalei Fill', cursive; */
    /* font-family: 'Bangers', cursive; */
    /* font-family: 'Luckiest Guy', cursive; */
    /* font-family: 'Black Ops One', cursive; */
    /* font-family: 'Chewy', cursive; */
    /* font-family: 'Frijole', cursive; */
    /* font-family: 'Freckle Face', cursive; */
    /* font-family: 'Piedra', cursive; */
}
#app-container{
    height:100%;
    width:100%;
    display:flex;
}
#navbar-size{
    width:35%;
    height:100%;
}
#gamedisplay-size{
    width:65%;
    height:100%;
}
</style>
