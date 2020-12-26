<template>
    <div id="page-container">
        <div id="login-container">
         <div>
           <b-form-group>
             <label>Username: </label>
             <b-form-input type="text" v-model="loginUsername"/>
           </b-form-group>
           <b-form-group>
             <label>Password: </label>
             <b-form-input type="text" v-model="loginPassword"/>
             <p v-bind:style="{color:errorMsgColor}">{{passwordErrorMsg}}</p>
           </b-form-group>
           <b-button v-on:click="userLogin" variant="primary">Login</b-button>
         </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    data:function(){
        return{
            users:[],
            loginUsername:'',
            loginPassword:'',
            usernameErrorMsg:'',
            passwordErrorMsg:'',
            errorMsgColor:'red'
        }
    },
    methods:{
        userLogin:async function(){
            let response = await axios.get('https://3001-b95582b4-ae68-4f74-ad61-58cb4afbe719.ws-us03.gitpod.io/users')
            this.users=response.data
            for(let user of this.users){
                if(this.loginUsername != user.username){
                    alert("Register an account now!")
                    this.passwordErrorMsg=""
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
        }
    }
}
</script>
<style scoped>
#page-container{
    display:flex;
    justify-content:center;
}
#login-container{
    width:40%;
    height:30%;
    border:solid;
}
</style>