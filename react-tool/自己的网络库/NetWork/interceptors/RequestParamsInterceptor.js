
import { ResponseResult } from "../HttpOptions";
import { Interceptor } from "../Interceptor";

/**
 *  吧 传递的options参数设置 组装成Fetch参数
 * 
 */
export class RequestParamsInterceptor extends Interceptor{
    keyid = "RequestParamsInterceptor"
    intercept(option,next){
        let RequestOps = {
            url:option.url,
            options:{
                method:option.method,
                ...option.options
            }
        };
        return next(RequestOps);
    }
    
}