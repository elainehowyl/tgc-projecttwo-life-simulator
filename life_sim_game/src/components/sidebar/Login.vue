<template>
    <div>
        <div>
           <b-form-group id="formgroup">
             <b-form-input type="text" label="Username" size="sm" placeholder="Enter Username" autocomplete="off" class="mb-2 input-size" v-model="loginUsername"/>
             <b-form-input type="password" label="Password" size="sm" placeholder="Enter Password" class="input-size" v-model="loginPassword"/>
             <p v-bind:style="{color:'red', fontSize:'15px'}">{{passwordErrorMsg}}</p>
             <b-button v-on:click="userLogin" variant="danger" size="sm" id="button-font-size">Login</b-button>
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
            passwordErrorMsg:'',
        }
    },
    methods:{
        userLogin:async function(){
            let response = await axios.get('https://ehyl-life-sim-game-api.herokuapp.com/users')
            this.users=response.data
            let usernameOnly = []
            for(let user of this.users){
                usernameOnly.push(user.username)
            }
            if(usernameOnly.includes(this.loginUsername) === true){
                let usernameIndex = usernameOnly.indexOf(this.loginUsername)
                if(this.loginPassword === this.users[usernameIndex].password){
                    this.passwordErrorMsg = ""
                    alert("Login successfully!")
                    this.$store.state.username = this.loginUsername
                    this.$store.state.loggedIn = true;
                } else{
                    this.passwordErrorMsg = "Incorrect Password"
                }
            } else {
                this.passwordErrorMsg = ""
                alert("Account not found! Would you like to register an account now?")
            }
        }
    }
}
</script> 

<style scoped>
#formgroup{
    padding:20px;
}
@media only screen 
  and (min-width: 414px) 
  and (max-width: 813px) {
      #button-font-size{
          font-size:5px;
      }
      .input-size{
          font-size:5px;
      }
}
</style>