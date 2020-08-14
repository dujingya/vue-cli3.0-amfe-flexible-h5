<template>
<div class="error_page_404" v-bgcolor data-bgcolor="">
    <!-- <custom-header :headerData="this.headerData"></custom-header> -->
    <div class="error_main" style="text-align:center" v-if="!img">
<!--        <img src="../assets/img/img_404.png">-->
        <div class="error_404_text">
            <p> 很抱歉，您要访问的页面不存在！</p>
            <!--<p><span>3秒</span>后系统制动跳回上一页</p>-->
        </div>
        <!--<div class="error_btn" @click="goback">返回上一页</div>-->
    </div>
    <div v-else class="gifError">
        <div class="imgBox">
<!--            <img src="../assets/img/img_404.png" alt="" class="gif">-->
            <p>网络连接失败</p>
            <div class="error_btn" @click="goback">点击重试</div>
        </div>
    </div>
</div>
</template>
<script>
export default {
  props: {
    img: {
      type: String,
      required: false
    }
  },
  mounted () {
    setTimeout(() => {
      this.goback()
    }, 3000)
  },
  methods: {
    goback () {
      this.$router.go(-1)
    }
  },
  components: {}
}
</script>

<style lang="scss">
// @import "../../style/vars.scss";
.error_page_404 {
    .error_main {
        img {
            text-align: center;
            width: 176px;
            height: 80px;
            margin: 211px auto 0;
        }
        .error_404_text {
            width: 254px;
            margin: 0 auto 30px;
            p{
              font-size: 14px;
              color: #464749;
              text-align: center;
              span{
                color: #51B79C;
              }
            }
        }
        .error_btn {
            width: 120px;
            height: 34px;
            border-radius: 17px;
            /*border: 1px solid #51B79C;*/
            font-size: 15px;
            color: #fff;
            /*color: #2ECD93;*/
            background: #5D41ED;
            /*background-color: #eafaf4;*/
            line-height: 34px;
            position: relative;
            margin: 0 auto;

        }
    }
    .gifError{
        height: 100%;
        background-color: #ffffff;
        text-align: center;
        .imgBox{
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            left: calc(50% - 90px);
            width: 180px;
        }
        .gif{
            width: 54px;
            height: 46px;
            margin-bottom: 5px;
        }
        p{
            font-size: 12px;
            color: #292929;
        }
        .error_btn {
            height: 35px;
            border-radius: 5px;
            font-size: 15px;
            color: #2ECD93;
            background-color: #eafaf4;
            line-height: 35px;
            position: relative;
            margin: 8px auto 0;
        }
    }
}
</style>
