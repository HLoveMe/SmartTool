import { Interceptor } from "../Interceptor";

import "rxjs/operator/do"
/**
 *  简单的日志输出插件
 *  不作为默认插件  需要手动加入
 */
export class LogInterceptor extends Interceptor {
    keyid = "LogInterceptor"
    /**
     * 回调函数
     */
    logFunc = null;
    constructor(props) {
        super(props);
        this.logFunc = props;
    }
    intercept(option, next) {
        let start = new Date().getDate();
        return next(option).do((response) => {
            let func = this.logFunc ? this.logFunc : console.log;
            let end = new Date().getDate();
            func({
                params: option, //请求参数
                result: response,//请求结果
                start,//开始时间
                end//结束时间
            })
        })
    }
}