
import { Interceptor } from "../Interceptor";
import { HTTPMethod } from "../HttpOptions";

/**
 *  GET POST 请求参数拼接
 * 
 */
export class  BodyInterceptor extends Interceptor{
    keyid = "BodyInterceptor"
    constructor(ops){
        super(ops)
    }
    intercept(option,next){
        if(option.method == HTTPMethod.GET && option.body != null){
            let  body = option.body;
            let  url = option.url;
            let paramsArray = [];
            //拼接参数
            Object.keys(body).forEach(key => paramsArray.push(key + '=' + body[key]));
            if(paramsArray.length >= 1){
                if (url.search(/\?/) === -1) {
                    url += '?' + paramsArray.join('&')
                } else {
                    url += '&' + paramsArray.join('&')
                }
            }
            option["url"] = url;
            delete option["body"];
        }else if(option.method == HTTPMethod.POST && option.body != null){
            let  body = option.body;
            let formData = new FormData();
            for(var key in body){
                formData.append(key,boby[key]);
            }
            option["body"] = formData;
            // let bodyArray = [];
            // //拼接参数
            // let keys = Object.keys(body);
            // keys.forEach(key => bodyArray.push(key + '=' + body[key]));
            // if(keys.length >= 1){
            //     option["body"] = bodyArray.join("&");
            // }else{
            //     delete option["body"];
            // }
        }
        return next(option);
    }
}