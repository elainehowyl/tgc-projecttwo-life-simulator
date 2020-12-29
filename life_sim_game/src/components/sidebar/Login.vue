<template>
    <div>
        <div>
           <h2>LOGO</h2>
           <b-form-group id="formgroup">
             <label>Username:</label>
             <b-form-input type="text" label="Username" v-model="loginUsername"/>
             <label>Password:</label>
             <b-form-input type="text" label="Password" v-model="loginPassword"/>
             <p v-bind:style="{color:errorMsgColor}">{{passwordErrorMsg}}</p>
             <b-button v-on:click="userLogin" variant="danger">Login</b-button>
           </b-form-group>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data:function(){
        return {
            users:[],
            loginUsername:'',
            loginPassword:'',
            usernameErrorMsg:'',
            passwordErrorMsg:'',
            errorMsgColor:'red',
        }
    },
    methods:{
        userLogin:async function(){
            let response = await axios.get('https://3001-b95582b4-ae68-4f74-ad61-58cb4afbe719.ws-us03.gitpod.io/users')
            this.users=response.data
            for(let user of this.users){
                if(this.loginUsername != user.username){
                    this.passwordErrorMsg=""
                    alert("Register an account now!")
                }
                else if(this.loginUsername == user.username && this.loginPassword != user.password){
                    this.passwordErrorMsg = "Incorrect Password"
                }
                else{
                    alert("login successful!")
                    this.passwordErrorMsg=""
                    this.$router.push('Users')
                }
                break;
            }
            // this.passwordErrorMsg=""
        },
    }
}
</script>

<style scoped>
#formgroup{
    padding:20px;
}
</style>