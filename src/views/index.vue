<template>
  <div class="contentClass">
        <img src="../assets/img/5.jpg"/>
        <img src="../assets/img/1.jpg"/>
        <img src="../assets/img/2.jpg"/>
        <img src="../assets/img/3.jpg"/>
        <img src="../assets/img/1.jpg"/>
        <img src="../assets/img/2.jpg"/>
        <img src="../assets/img/3.jpg"/>
        <img src="../assets/img/6.jpg"/>
        <img src="../assets/img/3.jpg"/>
        <img src="../assets/img/4.jpg"/>
        <img src="../assets/img/5.jpg"/>
        <img src="../assets/img/7.jpg"/>
  </div>
</template>
<script>
  export default {
    name: 'index',
    components: {
    },
    data () {
      return {
        birthShow: false,
        type: 1,
        routerParams: {},
        checkTypeCode: ''
      }
    },
    mounted () {
    },
    methods: {
    },
    beforeRouteEnter (to, from, next) {
      if (from.name === 'cookbookDetail' || from.name === 'foodList') {
        to.meta.isBack = true
      } else {
        to.meta.isBack = false
      }
      next()
    },
    activated () {
      console.log('activated--333--indexMounted', this.$route.meta.isBack)
      if (!this.$route.meta.isBack) {
        this.init()
      }
    }
  }
</script>

<style lang="scss">
  .contentClass{
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    overflow: hidden;
    img{
      width: 100px;
      margin: 10px 0;
    }
  }
</style>
