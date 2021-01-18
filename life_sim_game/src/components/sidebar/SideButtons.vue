<template>
    <div>
        <div>
            <b-button v-b-modal.register-form class="modal-button-container" size="sm">Register</b-button>
            <b-button v-b-modal.how-to-play class="modal-button-container" size="sm">How To Play</b-button>
        </div>
        <b-modal id="register-form">
            <template #modal-header>
                <h3>Sign Up for An Account</h3>
            </template>
            <div>
              <label> Username: </label>
              <b-form-input type="text" size="sm" autocomplete="off" v-model="registerUsername"/>
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
              <b-form-input type="email" size="sm" autocomplete="off" v-model="registerEmail"/>
              <p v-if="emailInvalid===true" v-bind:style="{color:'red', fontSize:'16px'}">Please enter a valid email.</p>
              <label> Display Name: </label>
              <b-form-input type="text" size="sm" autocomplete="off" v-model="registerDisplayName"/>
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
                <h2>HOW DOES THE GAME WORK?</h2>
            </template>
            <div>
                <p>The main objective of this clicker game is to try to manage your health bar, happiness bar, energy bar and money.</p>
                <img src="images/progress-bars.png" width=100%/>
                <br><br><p>There are various ways to earn money: </p>
                <ol>
                <li>Clicking on your character will earn you $1 per click</li>
                <img src="images/female.png" width=50%/>
                <img src="images/male.png" width=40%/>
                <p>*However, be careful that for every 150 clicks, a random event will be triggered which can either increase or decrease your money.</p>
                <br><li>Each task that is clicked will also affect your stats differently:</li>
                <img src="images/tasks.png" width=100%/>
                <ul>
                    <li>Eat: <br>health+10%, happiness+10%, energy+15%, money-$50</li>
                    <li>Go to Work: <br> health-30%, happiness-40%, energy-40%, money+$100</li>
                    <li>Socialise: <br>health+10%, happiness+20%, energy-30%, money-$200</li>
                    <li>Exercise: <br>health+25%, happiness+15%, energy-40%, money-$0</li>
                </ul>
                </ol>
                <br><p>The money that is earned can be used to purchase different houses in the store:</p>
                <img src="images/store.png" width=100%/>
                <ul>
                    <li>House 1: $10,000</li>
                    <li>House 2: $20,000</li>
                    <li>House 3: $30,000</li>
                    <li>House 4: $40,000</li>
                </ul>
                <br><p>You've reached the end of the tutorial.<p> 
                <p>I shall thereby wish you a good luck and hope that you would have fun riding through this tiny storm called life!</p>
            </div>
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
            if(this.registeredUsername === true){
                this.registeredUsername = false;
            }
            for(let user of this.usersForRegistration){
                if(this.registerUsername == user.username){
                    this.registeredUsername = true
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
                        money:100,
                        clicks:0
                    },
                    ownedhouses:[]
                 })
                 alert("Account registered successfully!")
                 this.registerUsername='',
                 this.registerPassword='',
                 this.registerPasswordRe='',
                 this.registerEmail='',
                 this.registerDisplayName='',
                 this.selectGender='',
                 this.$bvModal.hide("register-form");
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