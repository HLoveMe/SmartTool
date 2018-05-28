
import { Interceptor } from "../Interceptor";
import { HTTPMethod } from "../HttpOptions";

/*
 *  设置fetch 默认请求头
 *  
 *  不作为默认插件  需要手动加入
 */
export class DefaultHeadersInterceptor extends Interceptor{
    keyid = "DefaultHeadersInterceptor"
    defaultHeaders = {}
    constructor(props) {
        super(props);
        this.defaultHeaders = props;
    }

    intercept(option,next){
        let newoption = {
            ...option,
            options:{
                ...option.options,
                headers:{
                    ...option.options.headers,
                    ...this.defaultHeaders,
                },
            } 
        }
        return next(newoption)
    }
}