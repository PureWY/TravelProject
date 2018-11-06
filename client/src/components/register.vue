<template>
    <div class="commonRegister">
        <div class="noRegister">
            <div class="joinImg"></div>
            <div class="joinText">
                <p>加入我们</p>
                <span>现在注册，获取最新旅游新闻。</span>
            </div>
            <div class="joinMethod">
                <input>
                <button>注册</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'registerComponent',
    data(){
        return{

        }
    }
}
</script>

<style lang="scss">
.commonRegister{
    max-width: 70em;
    margin: 30px auto 0;
    height: 100%;
    padding: 0 2em;
    .noRegister{
        width: 100%;
        height: 144px;
        padding: 20px 0;
        background-color: #F1F4F7;
        border: 1px solid #D9E1E8;
        display: flex;
        justify-content: space-around;
        align-items: center;
        .joinImg{
            width: 200px;
            height: 150px;
            background-image: url(../assets/img/joinus.png);
            background-size: cover;
        }
        .joinText{
            width: 240px;
            height: 120;
            margin-top: -20px;
            p{
                font-weight: 600;
                color: #1E93F5;
            }
        }
        .joinMethod{
            width: 450px;
            display: flex;
            align-items: center;
            input{
                width: 260px;
                height: 43px;
                border: 1px solid #D9E1E8;
                font-size: 1.1rem;
            }
            button{
                width: 168px;
                height: 45px;
                margin-left: 10px;
                color: #fff;
                cursor: pointer;
                font-weight: 500;
                background-color: #4494F5;
            }
        }
    }
}
</style>

