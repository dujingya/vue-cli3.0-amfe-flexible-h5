<template>
  <div class="selectItem">
      <ul class="mul-ul less">
        <li  v-for="(item, index) in question.answers" @click="singleChoose(index)" :class="[item.selected ?'mul-checked':'',canEdit? '':'disBtn']">
          {{item.title}}
        </li>
      </ul>
  </div>
</template>
<script>
import moment from 'moment'
import { Toast } from 'vant'
export default {
  props: {
    question: {
      default: () => {}
    },
    img: {
      type: String,
      required: false
    },
    canEdit: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    question () {
      console.log('走这里-----')
      this.questionItem = this.question.wisdomQuestion || {}
      console.log(999, this.questionItem)
      this.questionItem.textValue = ''
    }
  },
  computed: {
    btnDis () {
      if (this.questionItem.type === '2' || this.questionItem.type === 2) {
        let hasChecked = this.questionItem.wisdomQuestionOptionList.findIndex((val) => {
          return val.selected === 1
        })
        if (hasChecked !== -1) {
          return false
        } else {
          return true
        }
      }
      return false
    },
    minDate () {
      if (this.questionItem.type === 6 && this.questionItem.maxRange) {
        let year = new Date().getFullYear()
        return new Date(year - this.questionItem.maxRange, 0, 1)
      } else {
        return new Date(1940, 0, 1)
      }
    }
  },
  data () {
    return {
      questionItem: {},
      qustiontype: '',
      inputval: '输入框----',
      mulRes: [],
      show: false, // 数字输入键盘的控制
      columns: ['是', '否'],
      // minDate: new Date(1960, 0, 1),
      maxDate: new Date(),
      currentDate: new Date() // 日期类型
    }
  },
  methods: {
    singleChoose (index) {
      // 单选
      if (!this.canEdit) {
        return
      }
      let value = ''
      let questionOptionList = this.question.answers
      if (questionOptionList && questionOptionList.length) {
        questionOptionList.map((val, valIndex) => {
          if (valIndex === index) {
            val.selected = 1
            value = val.title
          } else {
            val.selected = 0
          }
        })
      }
      this.question.answers = [...questionOptionList]
      this.toSendValue(this.question, value)
    },
    inputChoose (type) {
      // 文本和数字
      let value = this.questionItem.textValue
      if (type === 4) {
        // 纯数字
        if (value !== 0 && !value) {
          Toast('请输内容')
          return
        }
        if (typeof value !== 'number' || isNaN(value)) {
          Toast('请输入数值')
          return
        }
        if (value > this.questionItem.maxRange) {
          Toast(`数值不能大于 ${this.questionItem.maxRange}`)
          return
        }
        if (value < this.questionItem.minRange) {
          Toast(`数值不能小于 ${this.questionItem.minRange}`)
          return
        }
      } else {
        if (!value) {
          Toast('请输内容')
          return
        }
      }
      let resValue = {
        cacheId: this.question.cacheId,
        index: this.question.curIndex + 1,
        isRequestResult: this.question.isLastOne,
        wisdomQuestionRequest: {
          id: this.questionItem.id,
          options: [],
          textValue: value,
          title: this.questionItem.title,
          type: this.questionItem.type
        }
      }
      this.toSendValue(resValue, value)
    },
    mulChange (item, index) {
      console.log('item---', item)
      item.selected = item.selected ? 0 : 1
      if (item.selected === 1 && item.gatherQuotaCode === '0') {
        // 以上均无
        let newList = []
        this.questionItem.wisdomQuestionOptionList.map((listItem, itemIndex) => {
          if (index !== itemIndex) {
            listItem.selected = 0
          }
          newList.push(listItem)
        })
        this.questionItem.wisdomQuestionOptionList = newList
      } else {
        this.questionItem.wisdomQuestionOptionList.map((listItem, itemIndex) => {
          if (listItem.gatherQuotaCode === '0') {
            listItem.selected = 0
          }
        })
        this.$set(this.questionItem.wisdomQuestionOptionList, index, item)
      }
      console.log('this.questionItem.wisdomQuestionOptionList', this.questionItem.wisdomQuestionOptionList)
    },
    mulChoose () {
      let value = []
      let questionOptionList = this.questionItem.wisdomQuestionOptionList
      if (questionOptionList && questionOptionList.length) {
        questionOptionList.map((val) => {
          if (val.selected === 1) {
            value.push(val.title)
          }
        })
      }
      if (!value.length) {
        Toast('至少选择一项')
        return
      }
      this.doChooseItem(questionOptionList, value.join(','))
    },
    doChooseItem (questionOptionList, value) {
      this.questionItem.wisdomQuestionOptionList = [...questionOptionList]
      let resValue = {
        cacheId: this.question.cacheId,
        index: this.question.curIndex + 1,
        isRequestResult: this.question.isLastOne,
        wisdomQuestionRequest: {
          id: this.questionItem.id,
          options: questionOptionList,
          textValue: '',
          title: this.questionItem.title,
          type: this.questionItem.type
        }
      }
      this.toSendValue(resValue, value)
    },
    writeText () {
      this.$refs['inputBox'].focus()
    },
    writeNum () {
      this.$refs['inputBox2'].focus()
    },
    inputBlur () {
      let u = navigator.userAgent
      let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
      if (isIOS) {
        setTimeout(() => {
          const scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0
          window.scrollTo(0, Math.max(scrollHeight - 1, 0)) // 归位
        }, 20)
      }
    },
    numchange (e) {
      let num = this.questionItem.decimalPlaces // 模拟后台返回小数位
      console.log('num--', num, this.questionItem)
      switch (num) {
        case 0:
          e.target.value = (e.target.value.match(/^\d*/g))[0] || null
          break
        default:
          if (!num) {
            num = 2 // 默认两位小数
          }
          let reg = new RegExp('^\\d*(\\.?\\d{0,' + num + '})', 'g')
          e.target.value = (e.target.value.match(reg))[0] || null
          break
      }
      this.questionItem.textValue = e.target.value ? parseFloat(e.target.value) : null
    },
    dateChoose () {
      // 日期类型
      console.log('currentdata--', moment(this.currentDate).format('YYYY-MM-DD'))
      let value = moment(this.currentDate).format('YYYY-MM-DD')
      let resValue = {
        cacheId: this.question.cacheId,
        index: this.question.curIndex + 1,
        isRequestResult: this.question.isLastOne,
        wisdomQuestionRequest: {
          id: this.questionItem.id,
          options: [],
          textValue: value,
          title: this.questionItem.title,
          type: this.questionItem.type
        }
      }
      this.toSendValue(resValue, value)
    },
    toSendValue (res, value) {
      console.log('----res', res)
      this.$emit('questionRes', res, value)
    }
  }
}
</script>
<style lang="scss" scoped>
  .selectItem{
    .disBtn{
      border:1px solid rgba(185,185,185,1) !important;
      color: #8A8E8E !important;
      background:none!important;
    }
    .mul-ul{
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      padding: 15px 8px 0;
      li{
        padding: 5px 10px;
        line-height: 20px;
        font-size: 14px;
        border-radius: 15px;
        margin:0px 8px 8px;
        word-break: break-all;
        /*min-width: 50px;*/
        width: 102px;
        text-align: center;
        height:35px;
        font-size: 15px;
        line-height: 18px;
        border-radius:4px;
        color: #1FC1C5;
        text-align: center;
        padding: 8px 14px;
        display: inline-block;
        border:1px solid rgba(31,193,197,1);
      }
      .mul-checked{
        background: #DFF7F7;
        color: #1FC1C5;
      }
    }
    .less{
      li{
        flex: 1;
      }
    }
    .textarea-res{
      height: 50px;
      margin: 10px 5% 10px;
      border: 1px solid #dbdbdb;
      width: 90%;
      padding: 10px;
      color: #1C1C1C;
      line-height: 20px;
      font-size: 14px;
      border-radius: 10px;
    }
    .numInput{
      height: 40px;
      border-radius: 25px;
      text-align: center;
      border:1px solid rgba(224,228,238,1)
    }
    //样式覆盖
    .gender .van-picker-column__item{
      color: #3979FF;
    }
  }
  /*@media only screen and (-webkit-device-pixel-ratio: 3) {*/
    /*.selectItem .mul-ul{*/
      /*padding-bottom: 20px;*/
    /*}*/
    /*.selectItem .send-btn{*/
      /*height: 74px!important;*/
    /*}*/
  /*}*/
  @media only screen and (width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
    .selectItem .mul-ul{
      padding-bottom: 20px;
    }
    .selectItem .send-btn{
      height: 60px!important;
    }
  }
  @media only screen and (width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) {
    .selectItem .mul-ul{
      padding-bottom: 20px;
    }
    .selectItem .send-btn{
      height: 60px!important;
    }
  }
  @media only screen and (width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) {
    .selectItem .mul-ul{
      padding-bottom: 20px;
    }
    .selectItem .send-btn{
      height: 60px!important;
    }
  }
</style>
