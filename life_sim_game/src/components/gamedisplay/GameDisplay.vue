<template>
    <div>
        <div id="display-container">
            <MenuBar/>
            <div id="stats-container"></div>
            <!-- <div id="game-container"></div> -->
        </div>
    </div>
</template>

<script>
import MenuBar from './MenuBar'
export default {
    components:{
        MenuBar
    },
    data:function(){
        return{
            
        }
    }
}
</script>

<style scoped>
#display-container{
    width:100%;
    height:100%;
    border:solid black;
    background-color:blue;
    display:flex;
    justify-content:center;
}
#stats-container{
    background-color:white;
    border:solid black;
    width:50%;
    height:50%;
    margin:auto;
}
/* #stats-container{
    width:100%;
    height:50%;
    background-color:orange;
}
#game-container{
    width:100%;
    height:50%;
    background-color:red;
} */
</style>