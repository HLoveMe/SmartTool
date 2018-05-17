
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
     *  resType:ResponseResultType.Json,
     *  ....
     *  headers:{}
     *  mode:""
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

export class TaskResultSource{
    _taskSource = null;
    Source = null;
    cancel(){
        if(this._taskSource == null){
            this.Source = null ;
            this.Source = Observable.create((obs)=>{
                this._taskSource = obs;
                obs.next(new ResponseResult(false,new Error("已经被取消"),null))
                obs.complete()
            })
        }else if(this._taskSource.closed || this._taskSource.isStopped || this._taskSource.hasError){
        }else{
            this._taskSource.next(new ResponseResult(false,new Error("任务 取消"),null))
            this._taskSource.complete();
        }
    }
}