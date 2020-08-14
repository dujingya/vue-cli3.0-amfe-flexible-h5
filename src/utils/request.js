/*
 * @Description: new file
 * @Autor: zhan
 * @Date: 2019-08-02 15:51:47
 * @LastEditors: zhan
 * @LastEditTime: 2020-03-10 14:47:18
 */
import axios from 'axios'

const service = axios.create({
  timeout: 60000,
})

export default service
