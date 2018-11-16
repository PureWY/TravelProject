<template>
  <div class="flightPay">
    <div class="titleContent">
      <div class="listTitle">
        <div class="titleStyle">
          <h2 class="title">更优质的售后服务</h2>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'flightPay',
  data() {
    return {}
  }
}
</script>

<style lang="scss">
.flightPay {
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
