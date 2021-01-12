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
              <b-form-input type="text" size="sm" v-model="registerUsername"/>
              <label> Password: </label>
              <b-form-input type="password" size="sm" v-model="registerPassword"/>
              <label> Email: </label>
              <b-form-input type="email" size="sm" v-model="registerEmail"/>
              <label> Display Name: </label>
              <b-form-input type="text" size="sm" v-model="registerDisplayName"/>
             </div>
             <div>
                <label>Gender: </label>
                <b-form-radio v-model="selectGender" value="female">Female</b-form-radio>
                <b-form-radio v-model="selectGender" value="male">Male</b-form-radio>
             </div>
             <template #modal-footer="{cancel}">
                <b-button @click="newRegister" size="sm" variant="success">Register</b-button>
                <b-button @click="cancel()" size="sm" variant="primary">Cancel</b-button>
             </template>
         </b-modal>
         <b-modal id="how-to-play">Hello From My Modal!</b-modal>
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
            registerEmail:'',
            registerDisplayName:'',
            selectGender:''
        }
    },
    methods:{
        newRegister:async function(){
            let response = await axios.get('https://3002-b95582b4-ae68-4f74-ad61-58cb4afbe719.ws-us03.gitpod.io/users')
            this.usersForRegistration=response.data
            let usernameFound = false;
            for(let user of this.usersForRegistration){
                if(this.registerUsername == user.username){
                    alert("Username has already been registered!")
                    usernameFound = true;
                    break;
                }
            }
            if(usernameFound === false){
                await axios.post('https://3002-b95582b4-ae68-4f74-ad61-58cb4afbe719.ws-us03.gitpod.io/users', {
                    username:this.registerUsername,
                    password:this.registerPassword,
                    email:this.registerEmail,
                    displayname:this.registerDisplayName,
                    gender:this.selectGender
                })
                await axios.post('https://3002-b95582b4-ae68-4f74-ad61-58cb4afbe719.ws-us03.gitpod.io/savedGames', {
                    username:this.registerUsername,
                    displayname:this.registerDisplayName,
                    gender:this.selectGender,
                    stats:{
                        health:50,
                        happiness:50,
                        money:100
                    }
                })
                alert("Account registered successfully!")
            }
            // for(let user of this.usersForRegistration){
            //     if(this.registerUsername == user.username){
            //         alert("Username has already been registered!")
            //         usernameFound = true;
            //         break;
            //     } else {
            //         await axios.post('https://3001-b95582b4-ae68-4f74-ad61-58cb4afbe719.ws-us03.gitpod.io/users',{
            //         username:this.registerUsername,
            //         password:this.registerPassword,
            //         email:this.registerEmail,
            //         displayname:this.registerDisplayName,
            //         gender:this.selectGender
            //         })

            //        await axios.post('https://3001-b95582b4-ae68-4f74-ad61-58cb4afbe719.ws-us03.gitpod.io/savedGames',{
            //        username:this.registerUsername,
            //        displayname:this.registerDisplayName,
            //        gender:this.selectGender,
            //        stats:{
            //           health:50,
            //           happiness:50,
            //           money:100
            //        }
            //      })
            //      alert("Account successfully registered!")
            //     //  this.$router.push('Users')
            //    }
            //    break;
            // }
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
</style>