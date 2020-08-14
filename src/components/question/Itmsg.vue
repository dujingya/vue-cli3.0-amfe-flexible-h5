<template>
  <div :class="['msgli', className]">
    <div class="msg-list left">
      <div class="name">
        <img :src="headImg" v-if="headImg">
        <img src="../../assets/img/head_AI.png" v-else>
      </div>
      <div class="content" v-if="type == 1">
        <div class="result" v-if="textStr">{{textStr}}</div>
        <slot name="more"></slot>
      </div>
      <div class="UIcontent" v-if="type == 2">
        <slot  name="UISlot"></slot>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    textStr: {
      default: ''
    },
    type: {
      default: 1
    },
    headImg: {
      default: ''
    },
    className: ''
  },
  data () {
    return {}
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
  .msgli{
    position: relative;
    display: block;
    overflow: hidden;
    /*ios，如果不行可以加一个透明遮罩层*/
    -webkit-touch-callout:none;
    touch-callout:none;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    -webkit-tap-highlight-color:transparent;
    /*安卓*/
    -webkit-user-select: none;
    user-select: none;
  }
  .msg-list{
    max-width: 321px;
    margin: 0;
    /*ios，如果不行可以加一个透明遮罩层*/
    -webkit-touch-callout:none;
    touch-callout:none;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    -webkit-tap-highlight-color:transparent;
    /*安卓*/
    -webkit-user-select: none;
    user-select: none;
    .name{
      width: 30px;
      height: 30px;
      border-radius: 36px;
      -webkit-border-radius: 36px;
      /*ios，如果不行可以加一个透明遮罩层*/
      -webkit-touch-callout:none;
      touch-callout:none;
      -webkit-tap-highlight-color: rgba(0,0,0,0);
      -webkit-tap-highlight-color:transparent;
      /*安卓*/
      -webkit-user-select: none;
      user-select: none;
      img{
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    .content{
      text-align: left;
      padding: 15px;
      font-size: 15px;
      line-height: 25px;
      color: #1C1C1C ;
      /*ios，如果不行可以加一个透明遮罩层*/
      -webkit-touch-callout:none;
      touch-callout:none;
      -webkit-tap-highlight-color: rgba(0,0,0,0);
      -webkit-tap-highlight-color:transparent;
      /*安卓*/
      -webkit-user-select: none;
      user-select: none;
      .result{
        white-space: pre-line;
      }
      .feedDis{
        color: #bdbdbd !important;
      }
      .feedBack{
        position: absolute;
        bottom: 0;
        right: 44px;
        text-align: right;
        font-size: 12px;
        color: #3979FF;
      }
    }
    .UIcontent{
      margin-left: 36px;
      border-radius: 2px 20px 20px 20px;
      border: 1px solid rgba(240,247,249,1);
      overflow: hidden;
    }
  }
  .left{
    float: left;
    margin-bottom: 20px;
    text-align: left;
    /*ios，如果不行可以加一个透明遮罩层*/
    -webkit-touch-callout:none;
    touch-callout:none;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    -webkit-tap-highlight-color:transparent;
    /*安卓*/
    -webkit-user-select: none;
    user-select: none;
    .name{
      float: left;
    }
    .content{
      margin-left: 36px;
      background: #fff;
      border-radius: 2px 20px 20px 20px;
      border:1px solid rgba(237,240,243,1);
      /*ios，如果不行可以加一个透明遮罩层*/
      -webkit-touch-callout:none;
      touch-callout:none;
      -webkit-tap-highlight-color: rgba(0,0,0,0);
      -webkit-tap-highlight-color:transparent;
      /*安卓*/
      -webkit-user-select: none;
      user-select: none;
    }
  }
  .doctorBox{
    .left{
      margin-bottom: 10px;
    }
  }
</style>
