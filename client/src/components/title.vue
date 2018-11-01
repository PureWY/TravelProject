<template>
  <div class="searchContainer">
    <div class="photoContent">
      <section class="photoFont">
        <div class="fontStyle">
          <h2 class="title">同时搜索数百家旅游网站</h2>
        </div>
      </section>
      <section>

      </section>
    </div>

  </div>
</template>

<script>
export default {
  name: 'titleComponent',
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.searchContainer {
  width: 100%;
  margin-top: -3px;
  background-color: #e9451a;
  .photoContent {
    margin: 0 auto;
    max-width: 70em;
    .photoFont {
      height: 81px;
      .fontStyle {
        display: flex;
        align-items: flex-end;
        padding: 0 30px;
        .title{
            font-family: "Forza-Black",Helvetica,Arial,sans-serif;
            font-weight: 800;
            text-align: left;
            color: #fff;
            font-size: 38px;
        }
      }
    }
  }
}
</style>

