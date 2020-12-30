<template>
    <div>
        <div id="overall-container">
            <div id="image-container">
              <img src="Game_Logo.png" width=60%/>
              <h6>Created my free logo at LogoMakr.com</h6>
            </div>
            <Login/>
            <SideButtons/>
        </div>
    </div>
</template>

<script>
import Login from './Login'
import SideButtons from './SideButtons'
export default {
    components:{
        Login, SideButtons
    },
    data:function(){
        return {
            
        }
    },
}
</script>

<style scoped>
#overall-container{
    width:100%;
    height:100%;
    background-color: #d29fe9;
    background-image: url("https://www.transparenttextures.com/patterns/food.png");
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