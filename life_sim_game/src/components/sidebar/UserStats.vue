<template>
    <div>
        <h4>Welcome back, {{this.$store.state.displayname}}</h4>
        <!-- <h4>{{this.$store.state.displayname}}</h4> -->
        <h6>Health:</h6>
        <b-progress :value="this.$store.state.health" :max="100" show-progress animated variant="danger"></b-progress>
        <h6>Happiness:</h6>
        <b-progress :value="this.$store.state.happiness" :max="100" show-progress animated variant="warning"></b-progress>
        <h6>Energy:</h6>
        <b-progress :value="this.$store.state.energy" :max="100" show-progress animated variant="success"></b-progress>
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
        let response = await axios.get('https://ehyl-life-sim-game-api.herokuapp.com/savedGames/' + this.$store.state.username)
        this.savedGame = response.data
        this.$store.state.displayname = this.savedGame.displayname
        this.$store.state.health = this.savedGame.stats.health
        this.$store.state.happiness = this.savedGame.stats.happiness
        this.$store.state.energy = this.savedGame.stats.energy
        this.$store.state.money = this.savedGame.stats.money
        this.$store.state.clicks = this.savedGame.stats.clicks
        this.$store.state.gender = this.savedGame.gender
        this.$store.state.userhouses = this.savedGame.ownedhouses
        
        setInterval(()=> {
            if(this.$store.state.health > 0){
                this.$store.state.health-=1
            }
            if(this.$store.state.happiness > 0){
                this.$store.state.happiness-=1
            }
            if(this.$store.state.energy > 0){
                this.$store.state.energy-=1
            }
        },1000)
    },
}
</script>

<style scoped>

</style>