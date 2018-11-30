<template>
    <div class="mainContainer">
        <headerComponent></headerComponent>
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
        }
    },
    created() {
        this.getUserInfo()
    },
    methods: {
        getUserInfo(){
            let userPhone = window.localStorage.getItem('userphone')
            if(userPhone){
                let userphone = {
                userphone: userPhone
                }
                this.$store.dispatch('GetUserInfo',userphone)
                .then(() => {
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
    padding-bottom: 275px;
    font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
    font-weight: 400;
    font-size: 15px;
    line-height: 1.231;
    color: #17232c;
    -webkit-font-smoothing: antialiased;
    
}
</style>

