import wx from 'weixin-js-sdk'
import store from 'store'
export default {
  install (Vue, opt) {
    Vue.prototype.share = (data) => {
      if (!data.imgUrl) {
        data.imgUrl = 'https://lk-upload-api-pro.op.laikang.com/common/fileDownload/qixiu-onlinecourse/a55f28a1-e855-476c-a6e0-81caf943f403.jpg'
      }
      if (!data.title) {
        data.title = '来康大脑'
      }
      if (!data.desc) {
        data.desc = '以“上医治未病”为理念，基于人工智能的智能健康分析及干预系统'
      }
      wx.ready(() => {
        let url = data.url || store.get('indexUrl') || window.location.href
        url = url.split('#');
        let url1 = url[1];
        let url0 = url[0];
        url0 = url0.split('?')[0];
        let resUrl = url0 + '#' + url1
        console.log('url------', data, data.url, url, resUrl)
        url = encodeURI(resUrl);
          /* 分享到朋友 圈 */
        wx.onMenuShareTimeline({
          imgUrl: data.imgUrl,
          title: data.title,
          desc: data.desc,
          link: url,
        });
        wx.onMenuShareAppMessage({
          imgUrl: data.imgUrl,
          title: data.title,
          desc: data.desc,
          link: url,
          type: "", // 分享类型,music、video或link，不填默认为link
          dataUrl: "", // 如果type是music或video，则要提供数据链接，默认为空
          success: () => {
            // 用户点击了分享后执行的回调函数
          },
        });
      });
    };
    Vue.prototype.scrollYPosition = (position) => {
      let scrollPosition = 0;
      if (position) {
        scrollPosition = position;
      }
      setTimeout(() => {
        //  console.log('scrollPosition', scrollPosition)
        document.body.scrollTop = scrollPosition;
        // 兼容google chrome
        document.documentElement.scrollTop = scrollPosition;
      }, 5);
    };
  },
};
