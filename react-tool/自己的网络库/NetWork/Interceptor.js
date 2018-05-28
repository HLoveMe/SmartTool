/**
 * Created by zhuzihao on 2017/11/28.
 */
import { Subject } from 'rxjs';
/**
 *
 *  请求过程 拦截器
*/
export class HttpInterceptorHandler{
    interceptors = [];
    index = 0;
    constructor(interceptors,func){
        this.interceptors = interceptors;
        this.func = func;
        this.index = 0;
    }
    nextInterceptor(){
        this.index += 1;
        let interceptor = this.interceptors[this.index];
        return interceptor;
    }
}
export class Interceptor{
    keyid = "Interceptor"
    /**
     *  option  HttpRequestOption
     *  next (option)=>{return Observeable}  默认返回的是Subject
     *  return Observe
     *  自定义拦截器 仅仅需要重写该方法即可
     *
     *  可以对请求参数进行拦截  对返回Response 进行扩展操作 不能修改
     *  
     *  链 报错会被拦截 
     *      throw new HLMChinaError(ResponseResult)会被拦截
     *             会作为请求正常结果进行处理
     * */
    intercept(option,next){
        /**
         *  return next(option).do((response)=>{
         *
         *  })
         * */
        return next(option);
    }
    _intercept(ops,inter){
        if(this instanceof ChainEndInterceptor){
            return this.intercept(ops,(ops,sub)=>{
                inter.func(ops,sub);
            });
        }
        return this.intercept(ops,(ops)=>{
            let interceptor = inter.nextInterceptor();
            if (interceptor instanceof ChainEndInterceptor){
                return interceptor.intercept(ops,(ops,sub)=>{
                    inter.func(ops,sub);
                });
            }
            return interceptor._intercept(ops,inter);
        })
    }
}

export class ChainEndInterceptor extends Interceptor{
    keyid = Symbol()
    constructor(props) {
        super(props);
        
    }
    
    intercept(option,next){
        let sub = new Subject();
        next(option,sub);
        return sub;
    }
}