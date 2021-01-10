<template>
    <div>
        <h2>Welcome back,</h2>
        <h2>{{this.$store.state.displayname}}</h2>
        <h4>Health: {{this.$store.state.health}}%</h4>
        <h4>Happiness: {{this.$store.state.happiness}}%</h4>
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
        let response = await axios.get('https://3002-b95582b4-ae68-4f74-ad61-58cb4afbe719.ws-us03.gitpod.io/savedGames/' + this.$store.state.username)
        this.savedGame = response.data
        this.$store.state.displayname = this.savedGame.displayname
        this.$store.state.health = this.savedGame.stats.health
        this.$store.state.happiness = this.savedGame.stats.happiness
        this.$store.state.money = this.savedGame.stats.money
        this.$store.state.gender = this.savedGame.gender
        console.log(this.$store.state.gender)
    },
}
</script>

<style scoped>

</style>