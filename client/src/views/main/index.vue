<template>
    <div class="mainContainer">
        <headerComponent :username = 'username' @check-tab="checkTab"></headerComponent>
        <planeComponent v-show="chooiceTab == 'plane'"></planeComponent>
        <hotelComponent v-show="chooiceTab == 'hotel'"></hotelComponent>
        <carComponent v-show="chooiceTab == 'car'"></carComponent>
        <registerComponent></registerComponent>
        <commonComponent></commonComponent>
        <footerComponent></footerComponent>
    </div>
</template>

<script>
import headerComponent from '../../components/header'
import planeComponent from '../../components/plane'
import registerComponent from '../../components/register'
import hotelComponent from '../../components/hotel'
import carComponent from '../../components/car'
import commonComponent from '../../components/content'
import footerComponent from '../../components/footer'
export default {
    name: 'mainPage',
    components: {headerComponent,planeComponent,
    registerComponent,hotelComponent,carComponent,
    commonComponent,footerComponent},
    data(){
        return{ 
            username: '',
            chooiceTab: 'plane'
        }
    },
    created() {
        if(this.$store.getters.token){
            this.username = this.$store.getters.username
        }
    },
    methods: {
        checkTab(tab){
            this.chooiceTab = tab;
        }
    }

}
</script>

<style lang="scss">
.mainContainer{
    min-width: 21.3em;
    font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
    font-weight: 400;
    font-size: 15px;
    line-height: 1.231;
    color: #17232c;
    -webkit-font-smoothing: antialiased;
    
}
</style>

