<template>
    <div>
        <div id="overall-container">
            <div id="image-container" class="d-flex justify-content-center p-2">
              <img src="/images/gameLogo.png" width=60%/>
              <!-- <p>Created my free logo at LogoMakr.com</p> -->
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
/* img{
    padding:15px;
} */
p{
    text-align:center;
    font-size:16px;
}
</style>