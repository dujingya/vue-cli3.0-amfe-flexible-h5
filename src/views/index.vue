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
  * { font-size: 14px; margin: 0; padding: 0; border: none;}
  a { text-decoration: none;}
  ul { list-style: none;}

  /*浏览器兼容解决*/
  header,nav,section,aside,article,footer{display: block;}

  /*头部*/
  header { width: 100%; height: 60px; background-color: #000;}
  .container { width: 1200px; margin: 0 auto;}
  .container > a { display: block; float: left; width: 150px; height: 60px; padding-left: 10px;}
  .container > a img { height: 40px; padding-top: 10px;}
  nav { font-size: 0; float: right; padding-right: 10px;}
  nav > a { font-size: 16px; line-height: 60px; display: inline-block; width: 100px; height: 60px; cursor: pointer; text-align: center; color: #fff;}
  nav > a:first-child { background: rgb(212, 1, 18);}
  nav > a:nth-child(2) { background: rgb(254, 184, 0);}
  nav > a:nth-child(3) { background: rgb(120, 185, 23);}
  nav > a:nth-child(4) { background: rgb(242, 124, 1);}
  nav > a:last-child { background: rgb(1, 127, 203);}
  nav > a:hover, nav > a.active { padding-bottom: 5px;}

  /*banner*/
  .banner { background: #ccc;}
  .banner ul { position: relative; width: 1200px; height: 400px; margin: 0 auto; padding-top: 100px;}
  .banner ul li { position: absolute; z-index: 1; top: 0; bottom: 0; overflow: hidden; width: 500px; height: 250px; margin: auto;}
  .banner ul li img { overflow: hidden; width: 100%;}
  .banner ul li.active { z-index: 2; right: 0;    /*设置水平居中*/ left: 0; width: 600px; height: 300px;}
  .banner ul li.left { /*设置在左边*/ left: 0;}
  .banner ul li.right { /*设置在右边*/ right: 0;}

  /*主体部分*/
  .main { width: 1200px; height: 350px; margin: 0 auto;}
  aside { float: left; width: 600px;}
  article { float: right; width: 600px;}
  .main h1 { font-size: 24px; font-weight: lighter; margin: 20px 0;}
  .main h1 samp { color: #7d7d7d;}
  aside img { height: 70px;}
  aside dl { position: relative; margin-bottom: 10px;}
  aside dl dt { position: absolute; top: 0; left: 90px;}
  aside dd.pic { overflow: hidden; width: 70px; height: 70px;}
  aside dd.text { position: absolute; top: 20px; left: 90px;}
  article > img { overflow: hidden; height: 130px;}
  article > p { margin-bottom: 10px;}

  /*底部*/
  footer { background-color: #000;}
  footer > .container { width: 1200px; height: 60px; margin: 0 auto;}
  footer > .container > p { line-height: 60px; float: left; color: #fff;}
  footer > .container > span { float: right;}
  footer > .container > span > img { width: 25px; height: 25px; margin-left: 10px; padding-top: 17px; cursor: pointer; opacity: .7;}
  footer > .container > span > img:hover { opacity: 1;}
  /*# sourceMappingURL=style.css.map */
</style>
