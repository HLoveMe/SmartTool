

import { ResponseResultAction } from "../../NetWork/ResponseAction";
import { ResponseResultType ,ResponseResult} from "../../NetWork/HttpOptions";
const CodeMessages = {
    "200": '服务器成功返回请求的数据',
    "201": '新建或修改数据成功。',
    "202": '一个请求已经进入后台排队（异步任务）',
    "204": '删除数据成功。',
    "400": '发出的请求有错误，服务器没有进行新建或修改数据,的操作。',
    "401": '用户没有权限（令牌、用户名、密码错误）。',
    "403": '用户得到授权，但是访问是被禁止的。',
    "404": '发出的请求针对的是不存在的记录，服务器没有进行操作',
    "406": '请求的格式不可得。',
    "410": '请求的资源被永久删除，且不会再得到的。',
    "422": '当创建一个对象时，发生一个验证错误。',
    "500": '服务器发生错误，请检查服务器',
    "502": '网关错误',
    "503": '服务不可用，服务器暂时过载或维护',
    "504": '网关超时',
};

export class ErrorStatusAction extends ResponseResultAction{
    keyid = "ErrorStatusAction"
    /**
     * data:""
     * message:"uid or token error"
     * status:1 // 0 成功 1 失败
     * status_code:200 // 表示请求API状态
     */
    isActive(ops,result){
        if(ops.options && ops.options.resType == ResponseResultType.Json){
            let code = result.result.status_code;
            let status =  result.result.status
            if(code != 200 || status == 1){
                return true;
            }
        }
        return false;
    }

    //ResponseResult
    action(ResResult){
        let result = ResResult.result;
        let code = result.status_code + "";
        let codeM = CodeMessages[code] || "请求失败";
        return new ResponseResult(false,new Error(codeM),result);
    }
}