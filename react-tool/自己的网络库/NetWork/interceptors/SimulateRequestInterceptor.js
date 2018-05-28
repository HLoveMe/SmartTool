import { ResponseResult,HLMChinaError } from "../HttpOptions";
import { Interceptor } from "../Interceptor";

/**
 *  直接拦截网络请求
 *  可以用来模拟网络请求 返回自己定义数据
 */
export class SimulateRequestInterceptor extends Interceptor{
    keyid = "SimulateRequestInterceptor"
    intercept(option,next){
        throw new HLMChinaError(new ResponseResult(true,null,{status:200,message:"模拟网络请求",info:"RequestParamsInterceptor"}))
        return next(option);
    }
}