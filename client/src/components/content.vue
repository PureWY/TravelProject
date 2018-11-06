<template>
  <div class="commonContent">
    <div class="localHot">
      <div class="hotTitle">南京热门之选</div>
      <div class="hotInfo">
        <div class="infoCard" v-for="n in loop1" :key="n">
          <div class="cardImg"></div>
          <div class="cardText">
            <div class="cardCountry">曼谷</div>
            <div class="cardLine">南京(NKG)至曼谷(BKK) </div>
            <div class="cardDate">12月24日 – 12月29日 • 5天 </div>
          </div>
          <div class="cardPlane">
            <div class="cardIcon"></div>
            <div class="cardPrice">
              <div class="price">¥1103起</div>
              <div class="type">直飞</div>
            </div>
            <div class="cardSearch">
              <button>搜索航班</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="localHot">
      <div class="hotTitle">热门沙滩目的地</div>
      <div class="hotInfo">
        <div class="infoCard" v-for="n in loop1" :key="n">
          <div class="cardImg1"></div>
          <div class="cardText">
            <div class="cardCountry">帕南海滩</div>
            <div class="cardLine">南京(NKG)至普吉岛(HKT) </div>
            <div class="cardDate">12月1日 – 12月3日 • 2天 </div>
          </div>
          <div class="cardPlane">
            <div class="cardIcon"></div>
            <div class="cardPrice">
              <div class="price">¥1103起</div>
              <div class="type">直飞</div>
            </div>
            <div class="cardSearch">
              <button>搜索航班</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="yourPlan">
      <div class="planTitle">
        <h2>从这里开始计划你的旅行</h2>
        <p>搜索机票、酒店及租车</p>
      </div>
      <div class="planSelect">
        <div class="selectDetail" v-for="n in loop1" :key="n">
          <div class="selectContent" v-for="n in loop" :key="n">
            <el-select v-model="values" placeholder="曼谷">
              <el-option v-for="item in cities" :key="item.value" :label="item.label" :value="item.value">
                <span style="float: left">{{ item.label }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
              </el-option>
            </el-select>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'commonComponent',
  data() {
    return {
        loop: [0,1,2,3,4],
        loop1: [0,1,2],
      cities: [
        {
          value: '¥427起',
          label: '航班 武汉 - 曼谷 (WUH - BKK)'
        },
        {
          value: '¥462起',
          label: '航班 广州 - 曼谷 (CAN - BKK)'
        },
        {
          value: '¥510起',
          label: '航班 深圳 - 曼谷 (SZX - BKK)'
        },
        {
          value: '¥730起',
          label: '航班 南京 - 曼谷 (SZX - BKK)'
        },
        {
          value: '¥813起',
          label: '航班 上海 - 曼谷 (SZX - BKK)'
        },
        {
          value: '¥917起',
          label: '航班 成都 - 曼谷 (SZX - BKK)'
        }
      ],
      values: ''
    }
  }
}
</script>

<style lang="scss">
.commonContent {
  max-width: 70em;
  margin: 70px auto 0;
  .localHot {
    height: 400px;
    padding-bottom: 60px;
    .hotTitle {
      font-size: 22px;
      font-weight: 600;
      margin-bottom: 24px;
    }
    .hotInfo {
      display: flex;
      justify-content: space-between;
      .infoCard {
        width: 32%;
        height: 350px;
        border: 1px solid #d9e1e8;
        .cardImg {
          height: 184px;
          background-image: url(../assets/img/mangu.jpg);
          background-size: cover;
        }
        .cardImg1 {
          height: 184px;
          background-image: url(../assets/img/beach.jpg);
          background-size: cover;
        }
        .cardText {
          height: 61px;
          padding: 18px 18px 0;
          .cardCountry {
            line-height: 16px;
            font-size: 16px;
            padding-bottom: 5px;
          }
          .cardLine {
            line-height: 20px;
            color: #6d8494;
          }
          .cardDate {
            line-height: 20px;
            color: #6d8494;
          }
        }
        .cardPlane {
          height: 88px;
          padding: 0 18px;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          .cardIcon {
            width: 22px;
            height: 22px;
            background-image: url(../assets/img/plane.png);
            background-size: cover;
          }
          .cardPrice {
            width: 95px;
            height: 38px;
            padding: 0 20px 0 30px;
            .price {
              line-height: 22px;
              font-size: 16px;
              font-weight: 500;
            }
            .type {
              font-size: 12px;
              color: #6d8494;
              line-height: 16px;
            }
          }
          .cardSearch {
            button {
              width: 122px;
              height: 34px;
              color: #fff;
              background-color: #1e93f5;
            }
          }
        }
      }
    }
  }
  .yourPlan {
    height: 550px;
    padding-bottom: 30px;
    .planTitle {
      height: 135px;
      margin-bottom: 60px;
      text-align: center;
      h2 {
        padding-top: 40px;
        color: #17232c;
        font-size: 36px;
        font-weight: 200;
        margin: 0;
      }
      p {
        color: #92aabb;
        font-size: 22px;
        font-weight: 400;
      }
    }
    .planSelect {
      height: 355px;
      display: flex;
      justify-content: space-between;
      .selectDetail {
        width: 313px;
        height: 100%;
        padding: 0 20px;
        .selectContent {
          height: 58px;
          padding-bottom: 13px;
          .el-select {
            width: 100%;
            .el-input__inner {
              border-color: #92aaba;
            }
            .el-select__caret {
              color: #92aaba;
            }
            .el-input__inner {
              color: #2D3941;
              font-weight: 500;
            }
            .el-input__inner::-webkit-input-placeholder {
              color: #2D3941;
              font-weight: 500;
            }
            .el-input__inner::-moz-placeholder {
              color: #2D3941;
              font-weight: 500;
            }
            .el-input__inner::placeholder {
              color: #2D3941;
              font-weight: 500;
            }
          }
        }
      }
    }
  }
}
</style>

