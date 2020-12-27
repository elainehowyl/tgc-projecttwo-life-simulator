<template>
    <div id="overall-container">
        <div id="navbar-container">
          <h2>LOGO</h2>
          <b-form-group id="formgroup">
            <label>Username:</label>
            <b-form-input type="text" label="Username" v-model="loginUsername"/>
            <label>Password:</label>
            <b-form-input type="text" label="Password" v-model="loginPassword"/><br>
            <p v-bind:style="{color:errorMsgColor}">{{passwordErrorMsg}}</p>
            <b-button v-on:click="userLogin" variant="danger">Login</b-button>
          </b-form-group>
          <div>
              <b-button v-b-modal.register-form class="modal-button-container">Register</b-button>
              <b-button v-b-modal.how-to-play class="modal-button-container">How To Play</b-button>
          </div>
          <!-- <b-button v-b-modal.my-modal>Show Modal</b-button> -->
          <b-modal id="register-form">
              <template #modal-header>
                  <h3>Sign Up for An Account</h3>
              </template>
            <div>
              <label> Username: </label>
              <b-form-input type="text" v-model="registerUsername"/>
              <label> Password: </label>
              <b-form-input type="text" v-model="registerPassword"/>
              <label> Email: </label>
              <b-form-input type="email" v-model="registerEmail"/>
              <label> Display Name: </label>
              <b-form-input type="text" v-model="registerDisplayName"/>
            </div>
            <div>
              <label>Gender: </label>
              <!-- <input type="radio" v-model="selectGender" value="female"/><label>Female</label>
              <input type="radio" v-model="selectGender" value="male"/><label>Male</label> -->
              <b-form-radio v-model="selectGender" value="female">Female</b-form-radio>
              <b-form-radio v-model="selectGender" value="male">Male</b-form-radio>
            </div>
            <template #modal-footer="{cancel}">
            <b-button @click="newRegister" variant="success">Register</b-button>
            <b-button @click="cancel()" variant="primary">Cancel</b-button>
            </template>
          </b-modal>
          <b-modal id="how-to-play">Hello From My Modal!</b-modal>
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
            errorMsgColor:'red',
            usersForRegistration:[],
            registerUsername:'',
            registerPassword:'',
            registerEmail:'',
            registerDisplayName:'',
            selectGender:''
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
        newRegister:async function(){
            let response = await axios.get('https://3001-b95582b4-ae68-4f74-ad61-58cb4afbe719.ws-us03.gitpod.io/users')
            this.usersForRegistration=response.data
            for(let user of this.usersForRegistration){
                if(this.registerUsername == user.username){
                    alert("Username has already been registered!")
                } else {
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
                 alert("Account successfully registered!")
                //  this.$router.push('Users')
               }
               break;
            }
        }

    }
}
</script>

<style scoped>
/* #overall-container{
    height:100%;
    background-color:yellow;
} */
#formgroup{
    padding:20px;
}
.modal-button-container{
    width:100%;
    background-color:orange;
    text-align:center;
    border:solid;
}
</style>