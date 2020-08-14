/*
 * @Description: new file
 * @Autor: zhan
 * @Date: 2020-03-10 09:13:38
 * @LastEditors: zhan
 * @LastEditTime: 2020-03-10 17:56:51
 */
module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    ['import', {
      libraryName: 'vant',
      libraryDirectory: 'es',
      style: true
    }, 'vant']
  ]  
}
