

import { ResponseResultAction } from "../../NetWork/ResponseAction";
import { ResponseResultType ,ResponseResult} from "../../NetWork/HttpOptions";


export class ResponseResultDataAction extends ResponseResultAction{
    /**
     *  该拦截器 处理请求结果 仅仅关心请求结果的data参数
     * 
     */
    keyid = "ResponseResultAction"
    
    isActive(ops,result){
        return true;
    }

    action(ResResult){
        let result = ResResult.result;
        return new ResponseResult(ResResult.success,ResResult.error,result.data);
    }
}