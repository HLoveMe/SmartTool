
import {Observable} from 'rxjs';
import 'rxjs/add/operator/catch';
import "rxjs/operator/publish"
import {  HttpRequestOptions ,HTTPMethod ,ResponseResultType,ResponseResult,TaskResultSource} from "./HttpOptions";

import { InterceptorManager } from "./InterceptorManager";
import { ResponseActionManager } from "./ResponseAction";
/***
 * 
 *  Interceptor3  Interceptor2 Interceptor1
 *  --------------------------------------->
 *                                        |
 *                                        |NetWork
 *                                        |
 *                                        |
 *  <---------------------------------------
 *       Acion3   Action2     Action1    
 */
export class NetWorkManager {
    /**
     * @param {*} url 
     * @param {*} method HTTPMethod
     * @param {*} body {}
     * @param {*} header {}
     * @param {*} options  HttpRequestOptions 对象的options参数{resType:ResponseResultType.Json,...}
     * return TaskResultSource 可取消
     * let taskS = NetWorkManager.Request(...)
     * taskS.Source.toPromise().then(....)
     * taskS.cancelTask()//取消
     */
    static Request(url,method,body,options){
        let sturct = new TaskResultSource();
        let Source = Observable.create((obs)=>{
            sturct.taskSource = obs;
            let _options = new HttpRequestOptions(url,method,body,options);
            //interceptor信号
            let interun = InterceptorManager.MapInterceptor(_options,(ops,sub)=>{
                fetch(ops.url,ops.options).then(response => {
                    if(obs.closed || obs.isStopped || obs.hasError){
                        sub.complete();
                    }else{
                        sub.next(response)
                        sub.complete();
                        //结果处理
                        let _result = null;
                        switch (ops.options.resType){
                            case ResponseResultType.Json:
                                _result = response.json();
                                break
                            case ResponseResultType.Text:
                                _result = response.text();
                                break
                            case ResponseResultType.BLOB:
                                _result = response.blob();
                                break
                            default:
                                _result = response.json();
                        }
                        _result.then((result)=>{
                            let res = ResponseActionManager.MapResponseAction(_options,result);
                            obs.next(res);
                            obs.complete();
                        })
                    }
                    //清除
                    interun && interun.unsubscribe();
                }).catch((error)=>{
                    obs.error(new ResponseResult(false,error,null));
                })
            }).subscribe((data)=>{
                //处理请求拦截器链 
                if(data instanceof ResponseResult){
                    obs.next(data);
                    obs.complete();
                }else{
                    obs.error(data);
                }
            },(err)=>{/**错误已经被拦截处理*/},()=>{
                obs.complete()
            })
        }).publish().refCount();

        sturct.Source = Source;
        return sturct;
    }
    /**
     * NetWorkManager.GET(url,body).then((res)=>{}).catch(()=>{})
     * @param {*} url 地址
     * @param {*} body 参数
     * @param {*} options 
     */
    static GET(url,body,options){
        return NetWorkManager.Request(url,HTTPMethod.GET,body,options).Source.toPromise();
    }
    /**
     *
     * NetWorkManager.POST(url,body).then((res)=>{}).catch(()=>{})
     * @param {*} url 地址
     * @param {*} body 参数
     * @param {*} options 
     */
    static POST(url,body,options){
        return NetWorkManager.Request(url,HTTPMethod.POST,body,options).Source.toPromise();
    }
    /**
     * ......
     */
}
