<template>
    <div class="mainContainer">
        <headerComponent></headerComponent>
        <planeComponent v-show="chooiceTab == 'plane'"></planeComponent>
        <hotel-component v-show="chooiceTab == 'hotel'"></hotel-component>
        <carComponent v-show="chooiceTab == 'car'"></carComponent>
        <commonComponent></commonComponent>
    </div>
</template>

<script>
import headerComponent from '../../components/header'
import planeComponent from '../../components/plane'
import commonComponent from '../../components/content'
import hotelComponent from '../../components/hotel'
import carComponent from '../../components/car'
export default {
    name: 'mainPage',
    components: {headerComponent,planeComponent,commonComponent,hotelComponent,carComponent},
    data(){
        return{ 
            chooiceTab: 'plane'
        }
    },
    methods: {
        
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

