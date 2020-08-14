<!-- 中医问卷题目 reportlist 备份-->
<template>
  <div class="load-model">
<!--    <div class="load-width">-->
<!--      <van-loading color="#fff" size="30px" />-->
<!--    </div>-->
    <van-overlay :show="show">
      <div class="wrapper">
<!--        <div class="small-block"></div>-->
        <div class="block">
          <i class="icon"></i>
          <span>加载中</span>
        </div>
      </div>
    </van-overlay>
  </div>
</template>

<script>
  // import { Loading } from 'vant'
  export default {
    data () {
      return {
        show: true
      }
    },
    components: {
      // Loading
    },
    mounted () {
    },
    methods: {
    }
  }
</script>

<style lang=scss>
  .load-model{
    display: flex;
    position: fixed;
    width: 100%;
    top: 0;
    height: 100%;
    align-items: center;
    justify-content: center;
    z-index: 1000000000;
    .load-width{
      /*width: 120px;*/
      /*height: 120px;*/
      border-radius: 10px;
      -webkit-border-radius: 10px;
      padding: 30px;
      background: rgba(0,0,0,.5);
    }
    .wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      height: 100%;
      .block{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width:140px;
        height:140px;
        background:rgba(0,0,0,.5);
        border-radius:8px;
        .icon{
          width: 40px;
          height: 40.5px;
          background: url("../assets/img/report/icon_loading@2x.png") no-repeat;
          background-size: 100% 100%;
          margin-bottom: 11px;
          animation: rotate 2s linear infinite;
        }
        @keyframes rotate {
          from {
            transform: rotate(0deg)
          }
          to {
            transform: rotate(360deg)
          }
        }
        span{
          height:19px;
          font-size:14px;
          font-family:PingFangSC-Regular,PingFang SC;
          font-weight:400;
          color:rgba(255,255,255,1);
          line-height:19px;
        }
      }
      .small-block{
        position: absolute;
        bottom: 269px;
        width: 29px;
        height: 30px;
        background: url("../assets/img/report/icon_loading2@2x.png") no-repeat;
        background-size: 100% 100%;
      }
    }
  }
</style>

