<template>
    <div>
        <div id="main-screen-container">
            <div id="taskbar-container">
                <img src="images/storeicon.png" height=100% width="13%"/>
                <img src="images/handphone_icon.png" height=100% width="17%" v-on:click="showTask"/>
            </div>
            <!-- <b-modal id="store">
                <h1>Hi</h1>
            </b-modal> -->
            <img src="/images/home_3.jpg" height=100% width=100%/>
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
                <table class="table table-sm" id="task-container">
                    <tr v-for='(row, rindex) in tasksContainer' v-bind:key='rindex'>
                        <td v-for='(col, cindex) in row' v-bind:key='cindex'>
                            <img :src='tasksList[cindex*2+rindex].icon_source' width=85% v-on:click="tasksButtons(cindex,rindex)"/>
                            <!-- <img :src='tasksList[index].icon_source' width=75% v-on:click="taskButtons"/> -->
                        </td>
                    </tr>
                </table>
                <!-- <div v-for='(task,index) in tasksList' v-bind:key='index' id="task-container">
                    <img :src='tasksList[0].icon_source' width=15%/>
                    <img :src='tasksList[1].icon_source' width=15%/>
                    <img :src='tasksList[2].icon_source' width=15%/>
                    <img :src='tasksList[3].icon_source' width=15%/>
                </div> -->
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
        let response = await axios.get('https://3002-b95582b4-ae68-4f74-ad61-58cb4afbe719.ws-us03.gitpod.io/tasks')
        this.tasksList=response.data
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
          tasksList:[],
          tasksContainer:[
              ['',''],
              ['','']
          ],
        //   index:0
        }
    },
    methods:{
        increaseMoney:function(){
            console.log(typeof this.$store.state.money)
            this.$store.state.money += 1
        },
        tasksButtons:function(cindex,rindex){
            for(let task of this.tasksList){
                if(cindex*2+rindex === this.tasksList.indexOf(task)){
                    if(this.$store.state.health + task.health < 0 || this.$store.state.happiness + task.happiness < 0 || this.$store.state.money + task.money < 0){
                        alert("You do not have enough health / happiness / money to do this activity!")
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
                       this.$store.state.money += task.money
                    }
                    // if(this.$store.state.health + task.health > 100){
                    //     this.$store.state.health = 100
                    // }
                    // if(this.$store.state.happiness + task.health > 100){
                    //     this.$store.state.happiness = 100
                    // }
                }
            }
        },
        // tasksButtons:function(cindex,rindex){
        //     for(let task of this.tasksList){
        //         if(cindex*2+rindex === this.tasksList.indexOf(task)){
        //             if(this.$store.state.health >= 0 && this.$store.state.health <= 100){
        //                 if(this.$store.state.health + task.health > 100){
        //                     this.$store.state.health = 100
        //                 }
        //                 else if(this.$store.state.health + task.health < 0){
        //                     alert("You do not have enough health for this activity!")
        //                 }
        //                 else{
        //                     this.$store.state.health+=task.health
        //                 }
        //             }
        //             if(this.$store.state.happiness >= 0 && this.$store.state.happiness <= 100){
        //                 if(this.$store.state.happiness + task.happiness > 100){
        //                     this.$store.state.happiness = 100
        //                 }
        //                 else if(this.$store.state.happiness + task.happiness < 0){
        //                     alert("You do not have enough happiness for this activity!")
        //                 }
        //                 else{
        //                     this.$store.state.happiness+=task.happiness
        //                 }
        //             }
        //             this.$store.state.money+=task.money
        //         }
        //     }
        // },
        // tasksButtons:function(cindex,rindex){
        //     for(let task of this.tasksList){
        //         if(cindex*2+rindex === this.tasksList.indexOf(task)){
        //             this.$store.state.health+=task.health
        //             this.$store.state.happiness+=task.happiness
        //             this.$store.state.money+=task.money
        //         }

        //     }
        // },
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
#task-container{
    /* border:solid; */
    width:30%;
    position:absolute;
    top:30%;
    left:36%;
}
</style>