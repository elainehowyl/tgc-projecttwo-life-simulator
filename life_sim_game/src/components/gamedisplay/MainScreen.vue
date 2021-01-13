<template>
    <div>
        <div id="main-screen-container">
            <div id="taskbar-container">
                <img src="images/storeicon.png" height=100% width="13%" v-on:click="showStore"/>
                <img src="images/handphone_icon.png" height=100% width="17%" v-on:click="showTask"/>
            </div>
            <!-- <b-modal id="store">
                <h1>Hi</h1>
            </b-modal> -->
            <!-- <img src="/images/home_3.jpg" height=100% width=100%/> -->
            <img :src="image_source" height=100% width=100%/>
            <!-- <b-button v-on:click="changeImage">Change Image</b-button> -->
            <div v-if="this.$store.state.loggedIn===true">
                <div v-if="this.$store.state.gender==='female'">
                    <img src="/images/female.png" height=55% width=25% id="female-sprite" v-on:click="increaseMoney"/>
                </div>
                <div v-else-if="this.$store.state.gender==='male'">
                    <img src="/images/male.png" height=65% width=23% id="male-sprite" v-on:click="increaseMoney"/>
                </div>
                <!-- <img src="/images/female.png" height=55% width=25% id="character-sprite" v-on:click="testing"/> -->
            </div>
            <!-- <img src="/images/female.png" height=55% width=25% id="character-sprite" v-on:click="testing"/> -->
            <div id="show-task" v-if="showTaskState === true">
                <img src="/images/handphone_popup.png" width=100% height="20%"/>
                <table class="table table-sm table-borderless" id="task-container">
                    <tr v-for='(row, rindex) in tasksContainer' v-bind:key='rindex'>
                        <td v-for='(col, cindex) in row' v-bind:key='cindex'>
                            <img :src='tasksList[cindex*2+rindex].icon_source' width=85% v-on:click="tasksButtons(cindex,rindex)"/>
                            <!-- <img :src='tasksList[index].icon_source' width=75% v-on:click="taskButtons"/> -->
                        </td>
                    </tr>
                </table>
            </div>
            <div id="show-store" v-if="showStoreState === true">
                <img src="/images/store_menu.png" width=100% height="10%"/>
                <table class="table table-sm table-borderless" id="store-container">
                    <tr v-for='(row, rindex) in storeContainer' v-bind:key='rindex'>
                        <td v-for='(col, cindex) in row' v-bind:key='cindex'>
                            <img :src='housesList[cindex*2+rindex].image_source' width=100% v-on:click="storeButtons(cindex,rindex)"/>
                            <!-- <img :src='tasksList[index].icon_source' width=75% v-on:click="taskButtons"/> -->
                        </td>    
                    </tr>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    // mounted:function(){
    //     setInterval(function(){
    //         this.$store.state.health++
    //         this.$store.state.happiness++
    //     },1000)
    // },
    created: async function(){
        let tasksResponse = await axios.get('https://3002-b95582b4-ae68-4f74-ad61-58cb4afbe719.ws-eu03.gitpod.io/tasks')
        this.tasksList=tasksResponse.data
        let housesResponse = await axios.get('https://3002-b95582b4-ae68-4f74-ad61-58cb4afbe719.ws-eu03.gitpod.io/houses')
        this.housesList=housesResponse.data
        // for(let task of this.tasksList){
        //     console.log(task.icon_source)
        // }
        // setInterval(function(){
        //     this.$store.state.health++
        //     this.$store.state.happiness++
        // },1000)
    },
    data:function(){
        return{
          showTaskState:false,
          showStoreState:false,
          tasksList:[],
          housesList:[],
          tasksContainer:[
              ['',''],
              ['','']
          ],
          storeContainer:[
              ['',''],
              ['','']
          ],
          image_source:"/images/default_house.jpg",
        //   clickImage:false,
        }
    },
    methods:{
        // changeImage:function(){
        //     if(!this.clickImage){
        //        this.image_source="/images/house_1.jpg"
        //        this.clickImage = true
        //     }
        //     else if(this.clickImage){
        //         this.image_source="/images/house_2.jpg"
        //         this.clickImage = false
        //     }
        // },
        storeButtons:async function(cindex,rindex){
            if(this.$store.state.loggedIn === true){
              let response = await axios.get('https://3002-b95582b4-ae68-4f74-ad61-58cb4afbe719.ws-eu03.gitpod.io/savedGames/' + this.$store.state.username)
              let user=response.data
              let userOwnedHouse = null
              let storeOwnedHouse = null
              let allOwnedHouse = null
              for(let house of this.housesList){
                  if(cindex*2+rindex===this.housesList.indexOf(house)){
                     for(let ownedhouse of user.ownedhouses){
                         if(!ownedhouse.includes(house.house_name)){
                            userOwnedHouse = false
                         }
                         else{
                            userOwnedHouse = true
                         }
                     }
                     for(let storedhouse of this.$store.state.userhouses){
                         if(!storedhouse.includes(house.house_name)){
                            storeOwnedHouse = false
                         }
                         else{
                            storeOwnedHouse = true
                         }
                     }
                     if(!userOwnedHouse && !storeOwnedHouse){
                         allOwnedHouse = false;
                     }
                     else{
                         allOwnedHouse = true;
                     }
                     if(allOwnedHouse){
                         this.image_source=house.image_source
                     }
                     else{
                         if(this.$store.state.money >= house.price){
                            this.$store.state.money-=house.price
                            this.$store.state.userhouses.push(house.house_name)
                            allOwnedHouse = true
                         }
                         else{
                            alert("You do not have enough money for this house!")
                         }
                     }
                 }
             }
          }
        },
        showStore:function(){
            if (this.showStoreState === false) {
                this.showStoreState = true;
            } else {
                this.showStoreState = false;
            }
        },
        increaseMoney:function(){
            console.log(typeof this.$store.state.money)
            this.$store.state.money += 1
        },
        tasksButtons:function(cindex,rindex){
            if(this.$store.state.loggedIn === true){
             for(let task of this.tasksList){
                if(cindex*2+rindex === this.tasksList.indexOf(task)){
                    if(this.$store.state.health + task.health < 0 || this.$store.state.happiness + task.happiness < 0 || this.$store.state.money + task.money < 0 || this.$store.state.energy + task.energy < 0){
                        if(this.$store.state.health + task.health < 0){
                            alert("You do not have enough health to do this activity!")
                            // alert("")
                        }
                        if(this.$store.state.happiness + task.happiness < 0){
                            alert("You do not have enough happiness to do this activity!")
                        }
                        if(this.$store.state.energy + task.energy < 0){
                            alert("You do not have enough energy to do this activity!")
                        }
                        if(this.$store.state.money + task.money < 0){
                            alert("You do not have enough money to do this activity!")
                        }
                        // alert("You do not have enough health / happiness / money to do this activity!")
                    }
                    else{
                       if(this.$store.state.health + task.health > 100){
                           this.$store.state.health = 100
                       }
                       else{
                           this.$store.state.health += task.health
                       }
                       if(this.$store.state.happiness + task.happiness > 100){
                           this.$store.state.happiness = 100
                       }
                       else{
                           this.$store.state.happiness += task.happiness
                       }
                       if(this.$store.state.energy + task.energy > 100){
                           this.$store.state.energy = 100
                       }
                       else{
                           this.$store.state.energy += task.energy
                       }
                       this.$store.state.money += task.money
                    }
                }
            }
          }
        },
        showTask:function(){
            if (this.showTaskState === false) {
                this.showTaskState = true;
            } else {
                this.showTaskState = false;
            }
        }
    },
}
</script>

<style scoped>
#main-screen-container{
    width:100%;
    height:100%
}
/* #background-image{
    z-index:1
} */
#female-sprite{
    position:absolute;
    left:35%;
    top:38%;
    /* bottom:65%;
    left:15%; */
    /* z-index:2 */
}
#male-sprite{
    position:absolute;
    left:40%;
    top:32%;
}
#taskbar-container{
    /* border:solid; */
    height:20%;
    position:absolute;
    display:flex;
    justify-content:flex-end;
}
#show-task{
    position:absolute;
    top:30%;
    left:50%;
}
#show-store{
    position:absolute;
    top:18%;
    left:65%;
}
#task-container{
    /* border:solid; */
    width:30%;
    position:absolute;
    top:30%;
    left:36%;
}
#store-container{
    /* border:solid; */
    width:67%;
    position:absolute;
    top:28%;
    right:17%;
}
</style>