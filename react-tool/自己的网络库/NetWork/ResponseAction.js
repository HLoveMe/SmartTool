/**
 * Created by zhuzihao on 2017/11/29.
 */

import { ResponseResult } from "./HttpOptions";
export class ResponseResultAction{
    keyid = "ResponseResultAction"
    constructor(){}
    /***
     *  ops HttpRequestOptions请求参数
     *  response 得到的JSON/TEXT结果
     *
     *  是否进行拦截
     * */
    isActive(ops,responseJson){
        return false;
    }
    /***
     *  拦截动作   返回 新的结果
     * 
     *  return ResponseResul
     * */
    action(ResponseResult){
        return {};
    }
}

class _ResponseResultActionManager{
    _actions  = null;
    constructor(actions) {
        this._actions = actions || [];
    }
    /***
     *  处理拦截网络结果
     *  先添加到的先处理
     */
    addAction(action){
        if (action instanceof ResponseResultAction){
            this._actions.push(action);
        }
    }
    removeAction(key){
        let index = -1;
        for(var i = 0 ;i<this._actions.length ;i++){
            if(this._actions[i].keyid == key){
                index = i;
                break
            }
        }
        if(index != -1){
            return  this._actions.splice(index,1).pop();
        }
    }
    /**
     * 处理请求链
     *  ops:HttpRequestOptions
     *  return result
     * */
    MapResponseAction(ops,json){
        let start = this._actions[0];
        let re_start = start.action(json);
        let result = re_start;
        for (var i = 1;i<this._actions.length;i++){
            let one = this._actions[i];
            if(one.isActive(ops,json)){
                result = one.action(result);
                if(result == null){
                    throw new Error(`${one}的 action 不能返回null`);
                }else  if(!(result instanceof ResponseResult)){
                    throw new Error(`${one}的 action 必须返回新的ResponseResult 对象`)
                }
                if(result.error != null){
                    //产生错误 请求处理链中断
                    return result;
                }
            }
        }
        return result;
    }
}

class  ResponseResultActionStart extends ResponseResultAction{
    constructor() {
        super();
    }
    isActive(ops,responseJson){
        return true;
    }
    action(responseJson){
        return new ResponseResult(true,null,responseJson);
    }
}


export  const ResponseActionManager = new _ResponseResultActionManager([new ResponseResultActionStart()]);