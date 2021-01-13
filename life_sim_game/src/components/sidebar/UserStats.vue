<template>
    <div>
        <h4>Welcome back, {{this.$store.state.displayname}}</h4>
        <!-- <h4>{{this.$store.state.displayname}}</h4> -->
        <h6>Health:</h6>
        <b-progress :value="this.$store.state.health" :max="100" show-progress animated variant="danger"></b-progress>
        <h6>Happiness:</h6>
        <b-progress :value="this.$store.state.happiness" :max="100" show-progress animated variant="warning"></b-progress>
        <!-- <h4>Health: {{this.$store.state.health}}%</h4>
        <h4>Happiness: {{this.$store.state.happiness}}%</h4> -->
        <h4>Money: ${{this.$store.state.money}}</h4>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data:function(){
        return{
            // savedGameUser:"",
            savedGame:{}
        }
    },
    created: async function(){
        // this.savedGameUser = this.$route.params.username
        let response = await axios.get('https://3002-b95582b4-ae68-4f74-ad61-58cb4afbe719.ws-eu03.gitpod.io/savedGames/' + this.$store.state.username)
        this.savedGame = response.data
        this.$store.state.displayname = this.savedGame.displayname
        this.$store.state.health = this.savedGame.stats.health
        this.$store.state.happiness = this.savedGame.stats.happiness
        this.$store.state.money = this.savedGame.stats.money
        this.$store.state.gender = this.savedGame.gender
        
        setInterval(()=> {
            if(this.$store.state.health > 0){
                this.$store.state.health-=1
            }
            if(this.$store.state.happiness > 0){
                this.$store.state.happiness-=1
            }
            // this.$store.state.health-=1
            // this.$store.state.happiness-=1
        },1000)
    },
}
</script>

<style scoped>

</style>