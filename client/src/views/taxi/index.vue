<template>
<div class="taxi">
    <headerComponent check-tab="taxi"></headerComponent>
    <router-view></router-view>
    <div class="footer">
        <footerComponent></footerComponent>
    </div>
</div>
</template>

<script>
import headerComponent from '../../components/header'
import footerComponent from '../../components/footer'
export default {
    name: 'taxi',
    components: {headerComponent,footerComponent},
    data(){
        return{
        }
    },
    created () {
    },
    methods: {
        
    }

}
</script>

<style lang="scss">
.taxi{
    min-width: 21.3em;
    font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
    font-weight: 400;
    font-size: 15px;
    line-height: 1.231; 
    color: #17232c;
    -webkit-font-smoothing: antialiased;
    .footer{
        width: 100%;
        height:275px; 
        position:absolute;
        bottom:0;
        background-color: #ffc0cb;
    }
    
}
</style>

