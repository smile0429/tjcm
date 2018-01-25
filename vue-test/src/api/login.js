import {Config} from './config' 
import axios from 'axios'
//登陆
export function formLogin(para){
	return axios.post(Config.host+Config.LOGIN, para).then((res) => {
      return Promise.resolve(res.data)
  })
}
