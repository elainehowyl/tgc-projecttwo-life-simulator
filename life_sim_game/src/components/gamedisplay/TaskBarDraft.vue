<template>
    <div>        
      <div id="taskbar-container">
        <b-dropdown variant="success">
        <template #button-content>
            <img src="/images/logo.png" height=100px>
        </template>
        <div class="task-bar-flex">
           <b-button class="m-1" @click="dangerMessage">
               <img src="/images/logo.png" height=50px>
           </b-button>
           <b-button class="m-1">Second Action</b-button>
           <b-button class="m-1">Third Action</b-button>
        </div>
       </b-dropdown>
       <b-dropdown variant="danger">
        <template #button-content>
            <img src="/images/logo.png" height=100px>
        </template>
        <div class="task-bar-flex">
           <b-dropdown-item>First Action</b-dropdown-item>
           <b-dropdown-item>Second Action</b-dropdown-item>
           <b-dropdown-item>Third Action</b-dropdown-item>
         </div>
       </b-dropdown>
      </div>
    </div>
</template>

<script>
export default {
    data:function(){
        return{
            
        }
    },
    methods:{
        dangerMessage:function(){
            let currentDate = new Date()
            alert(currentDate.getDate() + " " + currentDate.getMonth()+1 + " " + currentDate.getFullYear())
        }
    }
}
</script>

<style scoped>
#taskbar-container{
    background-color:orange;
    height:100%;
    padding:10px;
}
.task-bar-flex{
    display:flex;
}
</style>