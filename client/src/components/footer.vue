<template>
    <div class="footerContainer">
        <div class="linkContent">
            <div class="col">
                <div class="title">公司</div>
                <p>关于</p>
                <p>工作机会</p>
                <p>工作模式</p>
            </div>
            <div class="col">
                <div class="title">联系方式</div>
                <p>帮助与问题</p>
                <p>合作伙伴</p>
                <p>电子邮箱</p>
            </div>
            <div class="col">
                <div class="title">资讯</div>
                <p>旅游信息</p>
                <p>旅游线路</p>
                <p>旅游热门</p>
            </div>
            <div class="col">
                <div class="title">更多</div>
                <p>航空公司费用</p>
                <p>低价票小贴士</p>
                <p>直飞航线</p>
            </div>
        </div>
        <div class="copyRight">
            <span>隐私政策</span>
            <span>条款和条件</span>
            <span>©2018 草鹨旅行网</span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'footerComponent'
}
</script>

<style lang="scss">
.footerContainer{
    width: 100%;
    height:275px; 
    position:absolute;
    bottom:0;
    background-color: #17232C;
    .linkContent{
        color: #fff;
        max-width: 70em;
        margin: 0 auto;
        height: 133px;
        padding: 40px 0 0;
        display: flex;
        justify-content: space-between;
        .col{
            height: 100%;
            width: 133px;
            .title{
                padding-bottom: 10px;
                font-size: 1.1rem;
            }
            p{
                font-size: 0.7rem;
            }
        }
    }
    .copyRight{
        max-width: 70em;
        margin: 0 auto;
        padding: 40px 0 10px;
        height: 20px;
        color: #92aabb;
        text-align: center;
        span{
            margin: 0 20px;
            font-size: 0.7rem;
        }
    }
}
</style>

