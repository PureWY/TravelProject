<template>
    <div class="mainContainer">
        <headerComponent></headerComponent>
        <titleComponent></titleComponent>
        <div class="airPlaneSearch">
            <div class="airPlaneContent">
                <div class="airPlaneTab">
                    <div class="goAndBack">
                        <el-dropdown trigger="click"> 
                        <span class="el-dropdown-link">
                            往返
                            <i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>往程</el-dropdown-item>
                            <el-dropdown-item>单程</el-dropdown-item>
                            <el-dropdown-item>多程</el-dropdown-item>
                        </el-dropdown-menu>
                        </el-dropdown>
                    </div>
                    <div class="ridePeople">
                        <el-dropdown trigger="click"> 
                        <span class="el-dropdown-link">
                            1名成人
                            <i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>成人</el-dropdown-item>
                            <el-dropdown-item>青年</el-dropdown-item>
                            <el-dropdown-item>儿童</el-dropdown-item>
                        </el-dropdown-menu>
                        </el-dropdown>
                    </div>
                    <div class="rideType">
                        <el-dropdown trigger="click"> 
                        <span class="el-dropdown-link">
                            经济舱
                            <i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>经济舱</el-dropdown-item>
                            <el-dropdown-item>商务舱</el-dropdown-item>
                            <el-dropdown-item>头等舱</el-dropdown-item>
                        </el-dropdown-menu>
                        </el-dropdown>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import headerComponent from '../../components/header'
import titleComponent from '../../components/title'
export default {
    name: 'mainPage',
    components: {headerComponent,titleComponent},
    data(){
        return{ 

        }
    }

}
</script>

<style lang="scss" scoped>
.mainContainer{
    min-width: 21.3em;
    font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
    font-weight: 400;
    font-size: 15px;
    line-height: 1.231;
    color: #17232c;
    -webkit-font-smoothing: antialiased;
    .airPlaneSearch{
        width: 100%;
        background-color: #e9451a;
        .airPlaneContent{
            margin: 0 auto;
            max-width: 70em;
            height: 195px;
            .airPlaneTab{
                height: 20%;
                padding: 30px 30px 0px;
                display: flex;
                .el-dropdown-link{
                display: inline-block;
                position: relative;
                cursor: pointer;
                color: #fff;
                font-size: 15px;
                font-weight: 500;
                } 
                .ridePeople{
                    margin-left: 30px;
                }
                .rideType{
                    margin-left: 30px;
                }
            }
        }
    }
}
</style>

