<template>
    <div>
        <h2>All Users Info</h2>
        <!-- <button v-on:click="loadUsers">Display All Users</button> -->
        <div v-for="u in users" v-bind:key="u._id">
            <h4>Username: {{u.username}}</h4>
            <h4>Password: {{u.password}}</h4>
            <h4>Email: {{u.email}}</h4>
            <h4>Display Name: {{u.displayname}}</h4>
            <h4>Gender: {{u.gender}}</h4>
            <div v-for="t in tasks" v-bind:key="t._id">
            <h4>Task Name: {{t.task_name}}</h4>
            <h4>Icon Source: {{t.icon_source}}</h4>
        </div>
        </div>
        <!-- <div v-for="t in tasks" v-bind:key="t._id">
            <h4>Task Name: {{t.task_name}}</h4>
            <h4>Icon Source: {{t.icon_source}}</h4>
        </div> -->
    </div>
</template>

<script>
import axios from 'axios'
export default {
    created: async function(){
        let response = await axios.get('https://3001-b95582b4-ae68-4f74-ad61-58cb4afbe719.ws-us03.gitpod.io/users')
        this.users = response.data

        let response2 = await axios.get('https://3001-b95582b4-ae68-4f74-ad61-58cb4afbe719.ws-us03.gitpod.io/tasks')
        this.tasks = response2.data 
    },
    data:function(){
        return{
            'users':[],
            'tasks':[]
       }
    },
    // methods:{
    //     loadUsers: async function(){
    //         let response=await axios.get('https://3001-b95582b4-ae68-4f74-ad61-58cb4afbe719.ws-us03.gitpod.io/users')
    //         this.users = response.data
    //     }
    // }
}
</script>

<style scoped>

</style>