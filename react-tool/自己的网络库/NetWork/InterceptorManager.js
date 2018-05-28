
import { Subject, Observable } from 'rxjs';
import 'rxjs/add/operator/catch';

import { Interceptor,HttpInterceptorHandler } from "./Interceptor";
import { HLMChinaError ,ResponseResult} from "./HttpOptions";
class NetWorkManagerInterceptor{
    /***
     *
     *
     * */
    constructor(ops) {
        this.interceptors = ops;
    }
    /**
     *  类实例
     *  你添加的会出现在队列头 后添加的 先处理
     * */
    addInterceptor = (interceptor)=>{
        if(interceptor instanceof Interceptor){
            this.interceptors = [interceptor].concat(this.interceptors);
        }
    };
    removeInterceptor(key){
        let index = -1;
        for(var i = 0;i<this.interceptors.length;i++){
            let interceptor = this.interceptors[i];
            if(interceptor.keyid == key){
                index = i;
                break
            }
        }
        if(index != -1){
            return  this.interceptors.splice(index,1).pop();
        }
    }
    /**
        ops: HttpRequestOptions
        
        func :(ops:RequestParamsInterceptor处理之后的 不是HttpRequestOptions 
     * */
    MapInterceptor(ops,func){
        return Observable.create((obs)=>{
            this.interceptors[0]._intercept(ops,new HttpInterceptorHandler(this.interceptors,func)).catch((error)=>{
                obs.error(error);
                return [error]
            }).subscribe(()=>{/*这里是请求完成后的Response回调*/})
        }).catch((error)=>{
            if(error instanceof HLMChinaError){
                return [Object.assign(new ResponseResult(),JSON.parse(error.message))]
            }
            return Observable.of(new Error("处理链 throw new Error("+error.message+")"))
        })
    }
}

import { ChainEndInterceptor } from "./Interceptor";
import { TimeOutInterceptor } from "./interceptors/TimeOutInterceptor";
import { BodyInterceptor } from "./interceptors/BodyInterceptor";
import { RequestParamsInterceptor } from "./interceptors/RequestParamsInterceptor";
import { URLEnCodeInterceptor } from "./interceptors/URLEnCodeInterceptor";
export const  InterceptorManager = new NetWorkManagerInterceptor([
    /**
     * TimeOutInterceptor 提供超时处理功能
     * BodyInterceptor GET方法参数 URL拼接 ,POST 参数处理 
     * URLEnCodeInterceptor URL进行编码
     * RequestParamsInterceptor 将提供的参数  作为Fetch需要的参数
     * InterceptorEnd POST参数处理
     * */
    //... customInterceptor
    new TimeOutInterceptor(),
    new BodyInterceptor(),
    new URLEnCodeInterceptor(),
    new RequestParamsInterceptor(),
    new ChainEndInterceptor()
]);
/**
 *  可选插件
 * 
 *  NetWork / interceptor / LogInterceptor.js 简单的日志输出 
 *  NetWork / interceptor / AllowOriginInterceptor.js 处理fetch 跨域问题 
 *                      ../ DefaultHeadersInterceptor   方便设置统一的请求头信息
 * 
 */
