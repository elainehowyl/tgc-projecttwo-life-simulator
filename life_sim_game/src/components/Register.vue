<template>
    <div>
        <div>
        <h1>Sign up for an account</h1>
        <label> Username </label>
        <input type="text" v-model="registerUsername"/><br>
        <label> Password: </label>
        <input type="text" v-model="registerPassword"/><br>
        <label> Email </label>
        <input type="email" v-model="registerEmail"/><br>
        <label> Display Name </label>
        <input type="text" v-model="registerDisplayName"/>
        </div>
        <div>
            <label>Gender</label>
            <input type="radio" v-model="selectGender" value="female"/><label>Female</label>
            <input type="radio" v-model="selectGender" value="male"/><label>Male</label>
        </div>
        <button @click="newRegister">Register</button>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data:function(){
        return{
            // users:[],
            registerUsername:'',
            registerPassword:'',
            registerEmail:'',
            registerDisplayName:'',
            selectGender:''
        }
    },
    methods:{
        newRegister:async function(){
            await axios.post('https://3001-b95582b4-ae68-4f74-ad61-58cb4afbe719.ws-us03.gitpod.io/users',{
                username:this.registerUsername,
                password:this.registerPassword,
                email:this.registerEmail,
                displayname:this.registerDisplayName,
                gender:this.selectGender
            })

            await axios.post('https://3001-b95582b4-ae68-4f74-ad61-58cb4afbe719.ws-us03.gitpod.io/savedGames',{
                username:this.registerUsername,
                displayname:this.registerDisplayName,
                gender:this.selectGender,
                stats:{
                    health:0,
                    happiness:0,
                    money:parseFloat(parseFloat(0.00).toFixed(2))
                }
            })

            this.registerUsername='';
            this.registerPassword='';
            this.registerEmail='';
            this.registerDisplayName='';
            this.selectGender=''
            alert("Account has been registered!")
        }
    }
}
</script>

<style scoped>

</style>