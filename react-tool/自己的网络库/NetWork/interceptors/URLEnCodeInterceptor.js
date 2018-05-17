

import { Interceptor } from "../Interceptor";
/**
 * URL 编码
 */
export class URLEnCodeInterceptor extends Interceptor{
    constructor(props) {
        super(props);
    }
    intercept(option,next){
        option.url = encodeURI(option.url)
        return next(option);
    }
    
}
