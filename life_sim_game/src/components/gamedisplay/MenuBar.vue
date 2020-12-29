<template>
    <div>
        <div id="menubar-container">
            <b-button v-b-modal.settings size="sm" class="m-2">
              <b-icon icon="gear-fill" aria-hidden="true"></b-icon>
            </b-button>
        </div>
        <b-modal hide-footer id="settings">
            <template #modal-header>
                <h3>Settings</h3>
            </template>
            <div>
                <b-button class="m-1 center">Save</b-button>
            </div>
            <div>
                <b-button class="m-1 center">Sign Out</b-button>
            </div>
            <div>
                <b-button v-on:click="clickDelete" class="m-1 center">Delete Account</b-button>
            </div>
            <div v-if="clickedDelete==true" class="m-1">
                <b-form-group description="Enter your password to complete deletion of account">
                  <label>Password</label>
                  <b-form-input type="text" v-model="deletePassword"/>
                </b-form-group>
                <b-button size="sm" variant="danger">Confirm Delete</b-button>
            </div>
        </b-modal>
    </div>
</template>

<script>
export default {
    // props:['displayname'],
    data:function(){
        return{
            deletePassword:"",
            clickedDelete:false
        }
    },
    methods:{
        clickDelete:function(){
            this.clickedDelete=true;
        }
    }
}
</script>

<style scoped>
#menubar-container{
    display:flex;
    justify-content:flex-end;
    background-color:yellow;
}
.center{
    width:100%;
}
</style>