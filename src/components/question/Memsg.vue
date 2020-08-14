<template>
  <div :class="['msgli', className]">
    <div class="msg-list right" :class="!msgItem?'imgList':''">
      <div class="name">
        <img :src="headImg" v-if="headImg">
        <img src="../../assets/img/head_user.png" v-else>
      </div>
      <!-- <div class="content" v-if="msgItem && msgItem.value !== 'test'">
        <template v-if="isLoading">
          <div class="loading-msg">
            <i></i>
            <i></i>
            <i></i>
          </div>
        </template>
        <template v-else>
          <div class="result" v-html="msgItem.value"></div>
        </template>
      </div>
      <div class="content content2" v-if="msgItem && msgItem.value === 'test'">
        <slot name="more"></slot>
      </div> -->
      <div :class="['content', msgItem && msgItem.value === 'test' ? 'content2' : '']" v-if="msgItem">
        <template v-if="isLoading">
          <div class="loading-msg">
            <i></i>
            <i></i>
            <i></i>
          </div>
        </template>
        <template v-else>
          <template v-if="msgItem.value !== 'test'">
            <div class="result" v-html="msgItem.value"></div>
          </template>
          <template v-else>
            <slot name="more"></slot>
          </template>
        </template>
      </div>
      <div class="imgBox" v-else>
        <template v-if="isLoading">
          <div class="loading-msg">
            <i></i>
            <i></i>
            <i></i>
          </div>
        </template>
        <template v-else>
          <slot name="more"></slot>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    msgItem: {
      default: () => {}
    },
    itemIndx: {
      default: 0
    },
    showEdit: {
      default: false
    },
    headImg: {
      default: ''
    },
    isLoading: {
      default: false // 是否是加载状态
    },
    className: ''
  },
  data () {
    return {}
  },
  methods: {
    changeAnswer (item, index) {
      this.$emit('changeAnswer', item, index)
    }
  }
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
      color: #4A4A4A ;
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
    .imgBox{
      padding: 0px;
      margin-right: 36px;
      img{
        border:1px solid rgba(237,240,243,1);
        border-radius: 24px 2px 24px 24px;
      }
    }
  }
  .imgList{
    max-width: 50%;
  }
  .right{
    float: right;
    text-align: right;
    margin-bottom: 20px;
    .name{
      float: right;
    }
    .content{
      margin-right: 36px;
      background: #1FC1C5;
      color: #fff;
      border-radius: 24px 2px 24px 24px;
      border:1px solid rgba(28,175,179,1);
    }
    .content2{
      background-color: transparent;
      border: none;
    }
  }
  @keyframes load-msg{
    0%{
      transform:scale(1);
      opacity:1;
    }
    50%{
      transform:scale(.4);
      opacity:0.3;
    }
    100%{
      transform:scale(1);
      opacity:1;
    }
  }
  .loading-msg{
    text-align: center;
  }
  .loading-msg i{
    display:inline-block;
    width:8px;
    height:8px;
    border-radius:50%;
    background:#3979FF;
    margin:0 2px;
  }
  .loading-msg i:nth-child(1){
    -webkit-animation:load-msg 1s ease-in .1s infinite;
    -moz-animation:load-msg 1s ease-in .1s infinite;
    animation:load-msg 1s ease-in .1s infinite;
  }
  .loading-msg i:nth-child(2){
    -webkit-animation:load-msg 1s ease-in .3s infinite;
    -moz-animation:load-msg 1s ease-in .3s infinite;
    animation:load-msg 1s ease-in .3s infinite;
  }
  .loading-msg i:nth-child(3){
    -webkit-animation:load-msg 1s ease-in .5s infinite;
    -moz-animation:load-msg 1s ease-in .5s infinite;
    animation:load-msg 1s ease-in .5s infinite;
  }
  .doctorBox{
    .right{
      margin-bottom: 10px;
    }
    .imgList{
      max-width: 75%;
    }
  }
</style>
