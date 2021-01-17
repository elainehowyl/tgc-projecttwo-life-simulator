<template>
    <div id="game-display">
        <div id="display-container">
            <MainScreen id="mainscreen-container"/>
        </div>
    </div>
</template>

<script>
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
#mainscreen-container{
    height:100%;
    width:100%
}
#display-container{
    width:100%;
    height:100%;
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