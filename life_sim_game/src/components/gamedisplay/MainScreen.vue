<template>
    <div>
        <div id="main-screen-container">
            <div id="taskbar-container">
                <img src="images/storeicon.png" height=100% width="13%" v-on:click="showStore"/>
                <img src="images/handphone_icon.png" height=100% width="17%" v-on:click="showTask"/>
            </div>
            <img v-if="this.$store.state.loggedIn===true" :src="image_source" height=100% width=100%/>
            <img v-else src="images/default_house.jpg" height=100% width=100%/>
            <div v-if="this.$store.state.loggedIn===true">
                <div v-if="this.$store.state.gender==='female'">
                    <img src="images/female.png" height=55% width=25% id="female-sprite" v-on:click="increaseMoney"/>
                </div>
                <div v-else-if="this.$store.state.gender==='male'">
                    <img src="images/male.png" height=65% width=23% id="male-sprite" v-on:click="increaseMoney"/>
                </div>
            </div>
            <div id="show-task" v-if="showTaskState === true">
                <img src="images/handphone_popup.png" width=100% height="20%"/>
                <table class="table table-sm table-borderless" id="task-container">
                    <tr v-for='(row, rindex) in tasksContainer' v-bind:key='rindex'>
                        <td v-for='(col, cindex) in row' v-bind:key='cindex'>
                            <img :src='tasksList[cindex*2+rindex].icon_source' width=85% v-on:click="tasksButtons(cindex,rindex)"/>
                        </td>
                    </tr>
                </table>
            </div>
            <div id="show-store" v-if="showStoreState === true">
                <img src="images/store_menu.png" width=100% height="20%"/>
                <table class="table table-sm table-borderless" id="store-container">
                    <tr v-for='(row, rindex) in storeContainer' v-bind:key='rindex'>
                        <td v-for='(col, cindex) in row' v-bind:key='cindex'>
                            <img :src='housesList[cindex*2+rindex].image_source' width=100% v-on:click="storeButtons(cindex,rindex)"/>
                        </td>    
                    </tr>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import Queue from '../../data-structures/Queue'
export default {
    created: async function(){
        let tasksResponse = await axios.get('https://ehyl-life-sim-game-api.herokuapp.com/tasks')
        this.tasksList=tasksResponse.data
        
        let housesResponse = await axios.get('https://ehyl-life-sim-game-api.herokuapp.com/houses')
        this.housesList=housesResponse.data

        let randomEventsResponse = await axios.get('https://ehyl-life-sim-game-api.herokuapp.com/randomEvents')
        this.randomEvents=randomEventsResponse.data

        this.cloneRandomEvents=[...this.randomEvents]

        let m = this.cloneRandomEvents.length, t, r
        while(m){
            r = Math.floor(Math.random()*m--);
            t = this.cloneRandomEvents[m]
            this.cloneRandomEvents[m] = this.cloneRandomEvents[r]
            this.cloneRandomEvents[r] = t
        }

        for(let event of this.cloneRandomEvents){
            this.events.enqueue(event)
        }
    },
    data:function(){
        return{
          showTaskState:false,
          showStoreState:false,
          tasksList:[],
          housesList:[],
          randomEvents:[],
          tasksContainer:[
              ['',''],
              ['','']
          ],
          storeContainer:[
              ['',''],
              ['','']
          ],
          image_source:"images/default_house.jpg",
          events:new Queue(),
          cloneRandomEvents:[],
          characterClicks:0,
          currentEvent:{},
        }
    },
    methods:{
        storeButtons:async function(cindex,rindex){
            if(this.$store.state.loggedIn === true){
              let storeOwnedHouse = null
              for(let house of this.housesList){
                  if(cindex*2+rindex===this.housesList.indexOf(house)){
                    if(!this.$store.state.userhouses.includes(house.house_name)){
                        storeOwnedHouse = false;
                    }
                    else{
                        storeOwnedHouse = true;
                    }
                    if(storeOwnedHouse){
                        this.image_source=house.image_source
                    }
                    else{
                        if(this.$store.state.money >= house.price){
                          this.$store.state.money-=house.price
                          this.$store.state.userhouses.push(house.house_name)
                          alert("Purchase successful!")
                        }
                        else{
                          alert("You do not have enough money for this house yet!")
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
            this.$store.state.money += 1
            this.$store.state.clicks += 1
            if(this.$store.state.clicks%150 === 0){
                if(this.events.length!==0){
                    this.currentEvent = this.events.dequeue()
                    alert(this.currentEvent.description)
                    if(this.$store.state.money + this.currentEvent.money < 0){
                        this.$store.state.money = 0;
                    }
                    else{
                        this.$store.state.money += this.currentEvent.money
                    }
                }
            }
        },
        tasksButtons:function(cindex,rindex){
            if(this.$store.state.loggedIn === true){
             for(let task of this.tasksList){
                if(cindex*2+rindex === this.tasksList.indexOf(task)){
                    if(this.$store.state.health + task.health < 0 || this.$store.state.happiness + task.happiness < 0 || this.$store.state.money + task.money < 0 || this.$store.state.energy + task.energy < 0){
                        if(this.$store.state.health + task.health < 0){
                            alert("You're falling sick...Take care of your heath first.")
                        }
                        if(this.$store.state.happiness + task.happiness < 0){
                            alert("You're not feeling happy right now to do anything...")
                        }
                        if(this.$store.state.energy + task.energy < 0){
                            alert("You're tired! Eat something to gain some energy!")
                        }
                        if(this.$store.state.money + task.money < 0){
                            alert("Don't spend more than what you are currently earning!")
                        }
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
span{
    font-size:10px;
}
p{
    font-size:10px;
}
#main-screen-container{
    width:100%;
    height:100%
}
#female-sprite{
    position:absolute;
    left:35%;
    top:38%;
}
#male-sprite{
    position:absolute;
    left:40%;
    top:32%;
}
#taskbar-container{
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
    width:30%;
    position:absolute;
    top:25%;
    left:36%;
}
#store-container{
    width:65%;
    position:absolute;
    top:28%;
    right:18%;
}
p{
    text-align:center;
}
.low-stat-message{
    width:25%;
    height:25%;
    background-color:white;
}
</style>