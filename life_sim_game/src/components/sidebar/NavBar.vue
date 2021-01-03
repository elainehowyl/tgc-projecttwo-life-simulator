<template>
    <div>
        <div id="overall-container">
            <div id="image-container">
              <img src="/images/gameLogo.png" width=60%/>
              <h6>Created my free logo at LogoMakr.com</h6>
            </div>
            <div v-if="this.$store.state.loggedIn===false">
              <Login/>
              <SideButtons/>
            </div>
            <div v-else>
              <UserStats id="user-stats"/>
              <SideButtonsLoggedIn/>
            </div>
        </div>
    </div>
</template>

<script>
import Login from './Login'
import SideButtons from './SideButtons'
import UserStats from './UserStats'
import SideButtonsLoggedIn from './SideButtonsLoggedIn'
export default {
    components:{
        Login, SideButtons, UserStats, SideButtonsLoggedIn
    },
    data:function(){
        return {
          
        }
    },
    methods:{
        
        }
    }
</script>

<style scoped>
#overall-container{
    width:100%;
    height:100%;
    background-color: #d29fe9;
    background-image: url("https://www.transparenttextures.com/patterns/food.png");
}
#user-stats{
    padding:15px;
}
img{
    padding:15px;
    position:relative;
    left:18%;
}
h6{
    text-align:center;
}
</style>