<template>
  <header class="header">
    <div class="headerContainer">
      <div class="headerWrapper">
        <div class="headerLeft">
          <div class="headerLogo">
            <img src="../assets/img/bird.png">
            <span>草鹨旅行网</span>
          </div>
          <div class="headerNav">
            <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane label="机票" name="plane"></el-tab-pane>
              <el-tab-pane label="酒店" name="hotel"></el-tab-pane>
              <el-tab-pane label="租车" name="car"></el-tab-pane>
              <el-tab-pane label="更多" name="more"></el-tab-pane>
            </el-tabs>
          </div>
        </div>
        <div class="headerRight">
          <div class="headerLogin">
            <div class="headerTravel">
              <a class="headerA">旅程</a>
            </div>
            <div class="headerLog">
              <a v-if="username" class="headerA">{{username}}</a>
              <a v-if="username" class="headerA" @click="handleLogOut">注销</a>
              <a v-else class="headerA">登录</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'headerComponent',
  props: ['username'],
  data() {
    return {
      activeName: 'plane'
    }
  },
  methods: {
    handleClick(tab) {
      this.$emit('check-tab',tab.name)
    },
    handleLogOut(){
      this.$confirm('确认注销用户？', '提示', {
          cancelButtonText: '取消',
          confirmButtonText: '确定',
          type: 'warning'
        }).then(() => {
          this.$store.dispatch('LogOut').then(() => {
            this.$message.success('注销成功!')
            this.loading = false
            this.$router.push('/')
          }).catch(e => {
              this.loading = false
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });          
        });
    }
  }
}
</script>

<style lang="scss">
.header {
  .headerContainer {
    max-width: 70em;
    margin: 0 auto;
    padding: 0 2em;
    .headerWrapper {
      height: 45px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .headerLeft {
          display: flex;
          align-items: center;
        .headerLogo {
          height: 45px;
          display: flex;
          align-items: center;  
          cursor: pointer;
          span {
            margin-left: 20px;
          }
        }
        .headerNav {
          height: 41px;
          margin-left: 40px;
          .el-tabs {
            .el-tabs__header {
              padding: 0;
              position: relative;
              margin: 0;
            }
          }
          .el-tabs__nav-wrap::after {
            content: '';
            width: 0;
          }
          .el-tabs__item.is-active {
            color: #ea4d1a;
          }
          .el-tabs__item:hover {
            color: #ea4d1a;
          }
          .el-tabs__active-bar {
            content: ' ';
            position: absolute;
            height: 0px;
            width: 0px !important;
            margin-left: 6px;
            border-width: 7px;
            border-style: solid;
            border-color: transparent transparent rgb(234, 77, 26);
            border-image: initial;
            background-color: transparent;
            transform: translateX(0px);
          }
        }
      }
      .headerRight {
        .headerLogin {
          float: right;
          height: 45px;
          display: flex;
          align-items: center;
          .headerTravel{
              .headerA{
                font-size: 14px;
                font-weight: 500;
                margin: 0 10px;
              }
              .headerA:hover{
                  cursor: pointer;
                  color: #ea4d1a;
              }
          }
          .headerLog{
              margin-left: 15px;
              .headerA{
                font-size: 14px;
                font-weight: 500;
                margin: 0 10px;
              }
              .headerA:hover{
                  cursor: pointer;
                  color: #ea4d1a;
              }
          }
        }
      }
    }
  }
}
</style>
