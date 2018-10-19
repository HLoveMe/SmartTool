import { ResponseResult, HLMChinaError } from "../HttpOptions";
import { Interceptor } from "../Interceptor";

/**
 *  直接拦截网络请求
 *  可以用来模拟网络请求 返回自己定义数据
 */
export class SimulateRequestInterceptor extends Interceptor {
    keyid = "SimulateRequestInterceptor"
    handle = null;
    constructor(handle) {
        this.handle = handle;
    }

    intercept(option, next) {
        if(this.handle && Object.prototype.toString.call(this.handle) == "[object Function]"){
            let result = this.handle(option);
            if(result != null && result instanceof ResponseResult){
                //new HLMChinaError(new ResponseResult(true, null, { status: 200, message: "模拟网络请求", info: "RequestParamsInterceptor" }))
                throw result;
            }
        }
        
        return next(option);
    }

}