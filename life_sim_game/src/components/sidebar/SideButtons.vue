<template>
    <div>
        <div>
            <b-button v-b-modal.register-form class="modal-button-container" size="sm">Register</b-button>
            <b-button v-b-modal.how-to-play class="modal-button-container" size="sm">How To Play</b-button>
        </div>
        <b-modal v-if="registerSuccess===false" id="register-form">
            <template #modal-header>
                <h3>Sign Up for An Account</h3>
            </template>
            <div>
              <label> Username: </label>
              <b-form-input type="text" size="sm" v-model="registerUsername"/>
              <p v-if="registeredUsername===true" v-bind:style="{color:'red', fontSize:'16px'}">Username is taken.</p>
              <p v-if="usernameNoInput===true" v-bind:style="{color:'red', fontSize:'16px'}">Please enter a username.</p>
              <p v-if="registeredUsername===false && usernameNoInput===false"></p>
              <label> Password: </label>
              <b-form-input type="password" size="sm" v-model="registerPassword"/>
              <p v-if="passwordTooShort===true" v-bind:style="{color:'red', fontSize:'16px'}">Password must be at least 8 characters.</p>
              <label> Re-enter Password: </label>
              <b-form-input type="password" size="sm" v-model="registerPasswordRe"/>
              <p v-if="passwordMismatch===true" v-bind:style="{color:'red', fontSize:'16px'}">Password does not match.</p>
              <label> Email: </label>
              <b-form-input type="email" size="sm" v-model="registerEmail"/>
              <p v-if="emailInvalid===true" v-bind:style="{color:'red', fontSize:'16px'}">Please enter a valid email.</p>
              <label> Display Name: </label>
              <b-form-input type="text" size="sm" v-model="registerDisplayName"/>
              <p v-if="displayNameNoInput===true" v-bind:style="{color:'red', fontSize:'16px'}">Please enter a display name.</p>
             </div>
             <div>
                <label>Gender: </label>
                <b-form-radio v-model="selectGender" value="female">Female</b-form-radio>
                <b-form-radio v-model="selectGender" value="male">Male</b-form-radio>
                <p v-if="genderNotSelected===true" v-bind:style="{color:'red', fontSize:'16px'}">Please select a gender.</p>
             </div>
             <template #modal-footer="{cancel}">
                <b-button @click="newRegister" size="sm" variant="success" class="button-size">Register</b-button>
                <b-button @click="cancel()" size="sm" variant="primary" class="button-size">Cancel</b-button>
             </template>
         </b-modal>
         <b-modal id="how-to-play">
             <template #modal-header>
                <h3>How the game works</h3>
            </template>
            <div></div>
            </b-modal>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data:function(){
        return {
            usersForRegistration:[],
            registerUsername:'',
            registerPassword:'',
            registerPasswordRe:'',
            registerEmail:'',
            registerDisplayName:'',
            selectGender:'',
            registeredUsername:false,
            usernameNoInput:false,
            passwordTooShort:false,
            passwordMismatch:false,
            emailInvalid:false,
            displayNameNoInput:false,
            genderNotSelected:false,
            registerSuccess:false
        }
    },
    methods:{
        newRegister:async function(){
            if(this.registerSuccess===true){
                this.registerSuccess===false
            }
            let response = await axios.get('https://ehyl-life-sim-game-api.herokuapp.com/users')
            this.usersForRegistration=response.data
            let usernameFound = false;
            for(let user of this.usersForRegistration){
                if(this.registerUsername == user.username){
                    this.registeredUsername = true
                    // alert("Username has already been registered!")
                    usernameFound = true;
                    break;
                }
            }
            if(usernameFound === false){
                let formValid = false
                this.usernameNoInput = this.registerUsername.length === 0 ? true:false
                this.passwordTooShort = this.registerPassword.length < 8 ? true:false
                this.passwordMismatch = this.registerPasswordRe !== this.registerPassword ? true:false
                this.emailInvalid = !this.registerEmail.includes('@') && !this.registerEmail.includes('.') ? true:false
                this.displayNameNoInput = this.registerDisplayName.length === 0 ? true:false
                this.genderNotSelected = this.selectGender.length === 0 ? true:false
                if(!this.usernameNoInput && !this.passwordTooShort && !this.passwordMismatch && !this.emailInvalid && !this.displayNameNoInput && !this.genderNotSelected){
                    formValid = true
                }
                if(formValid){
                 await axios.post('https://ehyl-life-sim-game-api.herokuapp.com/users', {
                    username:this.registerUsername,
                    password:this.registerPassword,
                    email:this.registerEmail,
                    displayname:this.registerDisplayName,
                    gender:this.selectGender
                 })
                 await axios.post('https://ehyl-life-sim-game-api.herokuapp.com/savedGames', {
                    username:this.registerUsername,
                    displayname:this.registerDisplayName,
                    gender:this.selectGender,
                    stats:{
                        health:50,
                        happiness:50,
                        energy:50,
                        money:100
                    },
                    ownedhouses:[]
                 })
                 alert("Account registered successfully!")
                this.registerSuccess = true;
                }
            }
        }
    }
}
</script>

<style scoped>
.modal-button-container{
    width:100%;
    background-color:black;
    text-align:center;
    border:solid;
}
@media only screen 
  and (min-width: 414px) 
  and (max-width: 813px) {
      .modal-button-container{
          font-size:5px;
      }
}
</style>