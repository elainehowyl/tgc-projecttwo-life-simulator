<template>
    <div>
        <div id="main-screen-container">
            <div id="taskbar-container">
                <img v-b-modal.store src="images/storeicon.png" height=100% width="13%"/>
                <img v-b-modal.inventory src="images/handphone_icon.png" height=100% width="17%"/>
            </div>
            <b-modal id="store">
                <h1>Hi</h1>
            </b-modal>
            <img src="/images/home_3.jpg" height=100% width=100%/>
            <img src="/images/girl.png" height=55% width=25% id="character-sprite" v-on:click="testing"/>
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
        testing:function(){
            console.log(typeof this.$store.state.money)
            this.$store.state.money += 1
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
#character-sprite{
    position:absolute;
    left:50%;
    top:38%;
    /* bottom:65%;
    left:15%; */
    /* z-index:2 */
}
#taskbar-container{
    /* border:solid; */
    height:20%;
    position:absolute;
    display:flex;
    justify-content:flex-end;
}
</style>