export let baseUrl = 'https://lk-api-dev.op.laikang.com' // 网关地址
// 区分qa环境和生产环境
if (process.env.NODE_ENV === 'qualityAssurance') {
  let url = ''
} else if (process.env.NODE_ENV === 'production') { // qa和pro是同一个地址
  let url = ''
}

