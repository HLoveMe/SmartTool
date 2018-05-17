

import { InterceptorManager } from "../NetWork/InterceptorManager";
import { DefaultHeadersInterceptor } from "../NetWork/interceptors/DefaultHeadersInterceptor";
import { AllowOriginInterceptor } from "../NetWork/interceptors/AllowOriginInterceptor";

const HeaderInter = new DefaultHeadersInterceptor({
    'Accept': 'application/json',
    'Content-Type': 'application/json',
})
const AllowOriInter = new AllowOriginInterceptor({
    heaeders:{
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Request-Method': '*'
    },
    mode:"cros"
})

InterceptorManager.addInterceptor(HeaderInter);
InterceptorManager.addInterceptor(AllowOriInter);

import { ErrorStatuAction } from "./Actions/ErrorStatuAction";
import { ResponseActionManager  } from "../NetWork/ResponseAction";

ResponseActionManager.addAction(new ErrorStatuAction());

import { NetWorkManager } from "../NetWork/NetWorkManager";

//export async function get(url) {
export async function get(url){
    return NetWorkManager.GET(url)
}

export async function post(url, body){
    return NetWorkManager.POST(url,body)
}

export function request(url,options) {
    return NetWorkManager.Request(url,options.method,options.body,options).Source.toPromise();
}
