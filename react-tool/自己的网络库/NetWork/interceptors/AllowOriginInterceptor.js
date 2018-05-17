import { Interceptor } from "../Interceptor";
/**
 *  处理跨域插件
 *  服务器需要支持跨域
 * 
 *  不作为默认插件  需要手动加入
 */
export class AllowOriginInterceptor extends Interceptor{
    keyid = "AllowOriginInterceptor"
    
    ops = null;
    /*** 
     *  {
     *      headers:{
     *          ...
     *      }
     *      mode:""
     *      ...
     *  }
     * 
    */
    constructor(props) {
        super(props);
        this.ops = props;
        
    }
    intercept(option,next){
        debugger
        option = {
            ...option,
            options:{
                ...option.options,
                ...this.ops,
                headers:{
                    ...option.options.headers,
                    ...this.ops.headers,
                },
                
            }
        }

        let headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Request-Method': '*',
            ...option.options.headers
        };
        let newoption = {
            ...option,
            options:{
                mode:"cors",
                ...option.options,
                headers,
            } 
        }
        return next(newoption)
    }
}