<template>
    <div>
        <div id="overall-container">
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
}
</script>

<style scoped>
#overall-container{
    width:100%;
    height:100%;
    background-color: #d29fe9;
    background-image: url("https://www.transparenttextures.com/patterns/food.png");
}
</style>