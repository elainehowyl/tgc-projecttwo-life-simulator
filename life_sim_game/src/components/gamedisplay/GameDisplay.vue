<template>
    <div id="game-display">
        <div id="display-container">
            <!-- <TaskBar id="taskbar-container"/> -->
            <MainScreen id="mainscreen-container"/>
            <!-- <div id="stats-container"></div> -->
            <!-- <div id="game-container"></div> -->
        </div>
    </div>
</template>

<script>
// import TaskBar from './TaskBar'
import MainScreen from './MainScreen'
export default {
    components:{
      MainScreen
    },
    data:function(){
        return{
            
        }
    }
}
</script>

<style scoped>
/* #taskbar-container{
    height:20%;
    width:100%
} */
#mainscreen-container{
    height:100%;
    width:100%
}
/* #game-display{
    width:100vw;
    height:100vh;
} */
#display-container{
    width:100%;
    height:100%;
    background-color:blue;
    /* display:flex;
    flex-direction:column;
    justify-content:center; */
}
#stats-container{
    background-color:white;
    border:solid black;
    width:50%;
    height:50%;
    margin:auto;
}
#menubar-size{
    width:100%;
}
</style>