<template>
    <div class="mainContainer">
        <headerComponent @check-tab="checkTab"></headerComponent>
        <router-view></router-view>
        <registerComponent></registerComponent>
        <commonComponent></commonComponent>
        <footerComponent></footerComponent>
    </div>
</template>

<script>
import headerComponent from '../../components/header'
import registerComponent from '../../components/register'
import commonComponent from '../../components/content'
import footerComponent from '../../components/footer'
export default {
    name: 'mainPage',
    components: {headerComponent,registerComponent,commonComponent,footerComponent},
    data(){
        return{ 
            chooiceTab: 'plane'
        }
    },
    created() {
        this.getUserInfo()
    },
    methods: {
        checkTab(tab){
            this.chooiceTab = tab;
        },
        getUserInfo(){
            let userPhone = window.localStorage.getItem('userphone')
            if(userPhone){
                let userphone = {
                userphone: userPhone
                }
                this.$store.dispatch('GetUserInfo',userphone)
                .then(() => {
                    console.log(this.$store.state.user)
                }).catch(err => {
                    console.log(err)
                })
            }
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

