// 访问地址和参数 http://localhost:8090/#/index?userId=7088&appKey=cLH0hbqiR&appSecret=78cb693c-8308-4674-88dd-6835ea6666ff
// pro在线访问地址： http://m.op.laikang.com/pro/healthyStatePro/#/index?appKey=fPEPQ6jig&appSecret=59cd7a0c-f892-47fa-9f2a-f6d06adb0ad2&v=1.4
// appKey=cLH0hbqiR
// qa在线访问地址： https://m.op.laikang.com:443/qa/healthyStateQa/#/index?appKey=cLH0hbqiR&appSecret=78cb693c-8308-4674-88dd-6835ea6666ff&v=1.0
// ?userId=6948&appKey=cLH0hbqiR&appSecret=78cb693c-8308-4674-88dd-6835ea6666ff&userToken=5E490C846DD4D30BDEA2676569D8A865A99842EF2A99E682081996A77C87E9E8A604B690E704798F06F0B12FE75E9E559E4363C4D903414DF75B36204A2E1F3084B3566FA98F6231791ACBFCC02F43A68C6BC411D5E8EB149E11CF06ACC013BA8492AC3E11DC88BB31926D2C97D2258CD7F5099AA597F7ECACE303001772FED0AE3C62545C648FCE12E755A38DC86F1C841E83E46A29CEDDFDBAA6121244C4A95E7807BD4860B0187992225AEFB2390C&theme=&LKfrom=
export let lkwebUrl = 'https://m.op.laikang.com' // 公众号项目路径
export let AuthorizeUrl = 'https://ftdw-wx-test.op.laikang.com'
export let phrAppKey = 'c26652c5e4bab1f9'
export let phrAppSecrect = 'f134abdec26652c5e4bab1f93ad8855b'
// qa
export let baseUrl = 'https://lk-api-dev.op.laikang.com' // 网关地址
export let questionNaireUrl = lkwebUrl + '/qa/Questionnaire/#/'// 问卷的地址 qa
export let vdItemClickUrl = lkwebUrl + '/qa/audioQa/#/' // 声音辩识 qa
export let pdItemClickUrl = lkwebUrl + '/qa/conWebQa/#/' // 体质辨识 qa
export let zhengClickUrl = lkwebUrl + '/qa/disWebQa/#/' // 辩证型 qa
export let mobileCode = 'https://lk-sso-wx-qa.op.laikang.com' // 手机验证码
export let balanceReport = 'https://m.op.laikang.com/pro/balance-report/#/index' // 平衡秤报告
export let phrUrl = 'http://lk-phr-test.cloud.enndata.cn' //
export let fetchServiceUrl = 'qa'
let URL = '/api'
// pro
// export let baseUrl = 'https://api.op.laikang.com' // 网关地址
// AuthorizeUrl = 'https://lk-xchx-mianshezhen-web-pro.op.laikang.com'
// export let wxAppKey = 'fPEPQ6jig'
// console.log(wxAppKey)
// export let questionNaireUrl = 'https://lk-m-questionnaire-pro.op.laikang.com/#/' // 问卷的地址
// export let vdItemClickUrl = lkwebUrl + '/pro/audioPro/#/' // 声音辩识
// export let pdItemClickUrl = lkwebUrl + '/pro/conWebPro/#/' // 体质辨识
// export let zhengClickUrl = lkwebUrl + '/pro/disWebPro/#/' // 辩证型
// export let assessment = lkwebUrl + '/pro/brainPro/#/reportList' // 评估记录
// export let mobileCode = 'https://lk-sso-pro.op.laikang.com'
// export let balanceReport = 'https://m.op.laikang.com/pro/balance-report/#/index' // 平衡秤报告
// export let phrUrl = 'https://lk-phr-pro.op.laikang.com' //
// let URL = '/api'

if (process.env.NODE_ENV === 'qualityAssurance') {
    mobileCode = 'https://lk-sso-wx-qa.op.laikang.com'
    AuthorizeUrl = 'https://ftdw-wx-test.op.laikang.com'
    baseUrl = 'https://lk-api-dev.op.laikang.com' // 网关地址
    questionNaireUrl = lkwebUrl + '/qa/Questionnaire/#/' // 问卷的地址 qa
    vdItemClickUrl = lkwebUrl + '/qa/audioQa/#/' // 声音辩识 qa
    pdItemClickUrl = lkwebUrl + '/qa/conWebQa/#/' // 体质辨识 qa
    zhengClickUrl = lkwebUrl + '/qa/disWebQa/#/'
    balanceReport = 'http://balance-report.op.laikang.com' // 平衡秤报告 暂无pro环境地址
    phrUrl = 'http://lk-phr-test.cloud.enndata.cn' // phr 跳转链接域名 qa
    fetchServiceUrl = 'qa'
} else if (process.env.NODE_ENV === 'production') {
    baseUrl = 'https://api.op.laikang.com' // 网关地址
    AuthorizeUrl = 'https://lk-xchx-mianshezhen-web-pro.op.laikang.com'
    mobileCode = 'https://lk-sso-pro.op.laikang.com'
    questionNaireUrl = 'https://lk-m-questionnaire-pro.op.laikang.com/#/' // 问卷的地址 pro
    vdItemClickUrl = lkwebUrl + '/pro/audioPro/#/' // 声音辩识 pro
    pdItemClickUrl = lkwebUrl + '/pro/conWebPro/#/' // 体质辨识 pro
    zhengClickUrl = lkwebUrl + '/pro/disWebPro/#/'
    phrUrl = 'https://lk-phr-pro.op.laikang.com' // phr 跳转链接域名 pro
    fetchServiceUrl = 'pro'
}
export const wxWebLogin = '/h5/webLogin/wxWebLogin' // 微信登录
export const knowledgeCategory = '/knowledge/health/category' // 获取五养列表
// export const getUserHistoryCount = '/phr/healthRecord/getUserHistoryCount' // 评估记录条数
export const getUserTags = '/phr/userTag/getUserTags' // 健康态分数
export const getUserBaseInfo = '/phr/h5/getUserBaseInfo' // 获取用户基本信息
export const updateUserBaseInfo = '/phr/h5/updateUserBaseInfo' // 保存用户基本信息
export const queryEnergyTag = '/ehr/healthStatus/queryEnergyTag' // 获取能量态标签
export const queryEnergyDetail = '/ehr/healthStatus/queryEnergyDetail' // 能量态详细数据
export const getDiseaseByCode = '/disease/getDiseaseByCode' // 根据code查详情
export const queryDetail = '/ehr/healthStatus/queryDetail' // 查询健康态详细数据
export const queryBiologyStatus = '/ehr/healthStatus/queryBiologyStatus' // 查询生物态详细数据
export const queryQuestionnaireReport = '/phr/health/queryQuestionnaireReport' // 查询健康态详细数据
export const url = URL + '/'
export const queryNounDesc = '/knowledge/common/getNounsExplanation' // 查询名词解释
export const getLastQuotaByUserId = '/phr/quota/getLastQuotaByUserId' // 获取用户最后一次指标数据
export const insertQuotaOne = '/phr/quota/insertQuotaOne' // 插入指标接口
// export const queryHealthDataRatio = '/ehr/healthStatus/queryHealthDataRatio' // 查询健康数据百分比
// export const queryUserBaseInfoRatio = '/ehr/healthStatus/queryUserBaseInfoRatio' // 查询用户基本信息百分比
export const getUserMedicalHistory = '/phr/h5/getUserMedicalHistory' // 获取用户病史信息
export const updateUserMedicalHistory = '/phr/h5/updateUserMedicalHistory' // 更新用户病史信息
// export const queryUserPreviousHistoryRatio = '/ehr/healthStatus/queryUserPreviousHistoryRatio' // 既往史百分比
export const queryUserHealthStatusRatio = '/ehr/healthStatus/queryUserHealthStatusSyntheticData'
export const sendSmsVcode = '/sso/sendSmsVcode' // 获取手机验证码
export const getUserResultList = '/phr/healthRecord/getUserResultList' // 历史报告接口
export const getBalanceInfoBySeqNo = '/phr/balance/getBalanceInfoBySeqNo' // 查看平衡秤详情
export const queryEveryDayHealthScore = '/ehr/healthTags/queryEveryDayHealthScore' // 查询多天的健康分数和信息态分数
export const queryEnergyAllTagByType = '/ehr/healthStatus/queryEnergyAllTagByType' // 信息态数据
