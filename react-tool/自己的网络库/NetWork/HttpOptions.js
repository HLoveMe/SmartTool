
/**
 * 方法名
 */
export const HTTPMethod  = {
    GET:"GET",
    POST:"POST",
    DELETE:"DELETE",
    UPDATE:"UPDATE"
}
/**
 * 结果处理
 */
export const ResponseResultType = {
    Json:"JSON",
    Text:"TEXT",
    BLOB:"BLOB"
}
/**
 *  请求参数配置
 * 
 */
export class HttpRequestOptions {
    url = "";
    method =  "GET";
    body = null;

    /***
     *  @options:
     *      可以是fetch 第二个参数包含的对象
     *      也可以是自定义的 在你自定义的请求链中处理
     * 
     *      
     *      resType:ResponseResultType.Json,
     *      headers:{}
     *      mode:""
     *      timeout:10000
     *      ....其他
     * 
     */
    options = null 
    constructor(url = "",method = HTTPMethod.POST,body = {},options={}) {
        this.url = url;
        this.method = method;
        this.body = body;
        this.options = {resType:ResponseResultType.Json,...options}
    }
}

/**
 *  请求结果处理类
 */

export class ResponseResult{
    success = true;
    error = null; //如果出现错误就会中断结果处理链
    result = null;

    constructor(success,error,result) {
        this.success = success || false;
        this.error = error || null;
        this.result = result || null;
    }
}


import { Observable } from 'rxjs';

/*** */

export class HLMChinaError {
    message = "{}"
    constructor(result) {
        this.message = JSON.stringify(result);
    }
}