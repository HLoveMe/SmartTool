
import { ResponseResult } from "../HttpOptions";
import { Interceptor } from "../Interceptor";
import 'rxjs/add/operator/timeout';
import { Observable } from "rxjs";
/**
 *  设置请求超时时间
 *  options = {
 *      timeout:10000
 *  }
 *  NetWorkManager.request(url,method,body,options)
 */
export class TimeOutInterceptor extends Interceptor{
    keyid = "TimeOutInterceptor"
    timeout = 10000;
    intercept(option,next){
        if(option.options && option.options.timeout >= 1){}else{
            option.options.timeout = this.timeout;
        }
        return  next(option).timeout(option.options.timeout)
    }
}