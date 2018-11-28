<template>
    <div class="houseInfo">
        <div class="titleContent">
        <div class="listTitle">
        <div class="titleStyle">
          <h2 class="title">更优选的酒店信息</h2>
        </div>
    </div>
    </div>
    </div>
</template>

<script>
export default {
    name: 'houseInfo',
    data(){
        return{

        }
    },
    created() {
        console.log(this.$store.getters.queryHotel)
    },
    methods: {

    }
}
</script>

<style lang="scss">
.houseInfo{
.titleContent{
        margin-top: -3px;
        background-color: #e9451a;
        .listTitle {
            margin: 0 auto;
            max-width: 70em;
            height: 81px;
            .titleStyle {
                display: flex;
                align-items: flex-end;
                .title{
                    font-family: "Forza-Black",Helvetica,Arial,sans-serif;
                    font-weight: 800;
                    text-align: left;
                    color: #fff;
                    font-size: 38px;
                    margin: 20px 0 0;
                }
            }
    }
    }
}
</style>

