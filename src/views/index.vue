<template>
  <div class="contentClass">
    <header>
      <div class="container">
        <a href="#"><img src="../assets/img/5.jpg"></a>
        <nav>
          <a href="#" class="active">导航</a>
          <a href="#">导航</a>
          <a href="#">导航</a>
          <a href="#">导航</a>
          <a href="#">导航</a>
        </nav>
      </div>
    </header>

    <section class="banner">
      <ul>
        <li class="left"><img src="../assets/img/1.jpg"></li>
        <li class="active"><img src="../assets/img/2.jpg"></li>
        <li class="right"><img src="../assets/img/3.jpg"></li>
      </ul>
    </section>

    <section class="main">
      <aside>
        <h1>左边<samp>标题</samp></h1>
        <dl>
          <dt>小标题</dt>
          <dd class="text">文字内容哦~</dd>
          <dd class="pic"><img src="../assets/img/1.jpg"></dd>
        </dl>
        <dl>
          <dt>小标题</dt>
          <dd class="text">文字内容哦~</dd>
          <dd class="pic"><img src="../assets/img/2.jpg"></dd>
        </dl>
        <dl>
          <dt>小标题</dt>
          <dd class="text">文字内容哦~</dd>
          <dd class="pic"><img src="../assets/img/3.jpg"></dd>
        </dl>
      </aside>
      <article>
        <h1>右边<samp>标题</samp></h1>
        <p>这是右边文章内容哦~</p>
        <img src="../assets/img/6.jpg">
        <p>这是右边文章内容哦~</p>
      </article>
    </section>

    <footer>
      <div class="container">
        <p>版权信息</p>
        <span>
                <img src="../assets/img/3.jpg">
                <img src="../assets/img/4.jpg">
                <img src="../assets/img/5.jpg">
                <img src="../assets/img/7.jpg">

            </span>
      </div>
    </footer>
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
  }
</style>
