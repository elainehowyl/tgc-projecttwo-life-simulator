<template>
    <div>
        <b-button v-b-modal.settings class="modal-button-container">Settings</b-button>
        <div id="settings-container">
        <b-modal hide-footer id="settings">
            <template #modal-header>
                <h3>Settings</h3>
            </template>
            <div>
                <b-button v-on:click="clickSave" class="m-1 center">Save</b-button>
            </div>
            <div>
                <b-button v-on:click="clickSignout" class="m-1 center">Sign Out</b-button>
            </div>
            <div>
                <b-button v-on:click="clickDelete" class="m-1 center">Delete Account</b-button>
            </div>
            <div v-if="clickedDelete==true" class="m-1">
                <b-form-group description="Enter your password to complete deletion of account">
                  <label>Password</label>
                  <b-form-input type="text" autocomplete="off" v-model="deletePassword"/>
                  <p v-if="wrongPassword===true" v-bind:style="{color:'red', fontSize:'16px'}">Password is wrong.</p>
                </b-form-group>
                <b-button size="sm" variant="danger" v-on:click="confirmDelete">Confirm Delete</b-button>
            </div>
        </b-modal>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data:function(){
        return {
            deletePassword:"",
            clickedDelete:false,
            user:{},
            savedGame:{},
            wrongPassword:false
        }
    },
    methods:{
        clickSave:async function(){
            await axios.patch('https://ehyl-life-sim-game-api.herokuapp.com/savedGames/' + this.$store.state.username, {
                stats:{
                    health:this.$store.state.health,
                    happiness:this.$store.state.happiness,
                    energy:this.$store.state.energy,
                    money:this.$store.state.money,
                    clicks:0
                },
                ownedhouses:this.$store.state.userhouses
            })
            alert("Updated!")
        },
        clickSignout:function(){
            this.$store.state.loggedIn = false;
        },
        clickDelete:function(){
            if(this.clickedDelete === false){
                this.clickedDelete = true;
            } else {
                this.clickedDelete = false;
            }
        },
        confirmDelete:async function(){
            let userResponse = await axios.get('https://ehyl-life-sim-game-api.herokuapp.com/users/' + this.$store.state.username)
            this.user=userResponse.data
            if(this.deletePassword === this.user.password){
                await axios.delete('https://ehyl-life-sim-game-api.herokuapp.com/users/' + this.$store.state.username)
                await axios.delete('https://ehyl-life-sim-game-api.herokuapp.com/savedGames/' + this.$store.state.username)
                alert("Account has been deleted successfully!")
                 this.$store.state.loggedIn = false;
            } else {
                this.wrongPassword = true
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
#menubar-container{
    display:flex;
    justify-content:flex-end;
    background-color:yellow;
}
.center{
    width:100%;
}
@media only screen 
  and (min-width: 414px) 
  and (max-width: 813px) {
      h4{
          font-size:15px;
      }
      h6{
          font-size:12px;
      }
      .modal-button-container{
          font-size:5px;
      }
}
</style>