import { join } from "path";

    Subject == （Observer和Observable）
    是被观察者(信号) 也是观察者(订阅者)
{
    Observable 可操作对象
    ConnectableObservable extends Observable
        拥有Observable所有特点
        区别
            他的数据并不观察者订阅时开始发送
            而是必须进行connect 操作才能进行数据发送

        connect 使其可以发送数据
        refCount 转为普通的Observable对象


    Subject         尽量不直接使用这个类（Observale 或者 下面的代替）
    BehaviorSubject 需要指定初始值 会保留最后发送一次数据 在下一个订阅后立即发出
    ReplaySubject  会保留指定个数的 数据  订阅后发出
    PublisSubject  仅仅把订阅之(后)的数据发送 订阅之(前)的数据不会发送
    AsyncSubject  仅仅发送complete 之前的一个数据

    subscribe(next,err,complete)
    subscribe(new Subject())
}
{
    ConnectableObservable
        obs = Observable.interval(1000).publish()
        obs.connect() //变为连接对象 开始发送数据
        setTimeout(()=>{
            obs.subscribe((inex)=>{
                index 从 3开始
            })
        },3500)

}

创建
    new Observable((obs)=>{
        obs.next()
        obs.error()
        return xxObs.subscribe(()=>{

        })
        return ()=>{

        }
        return void

        return AnonymousSubscription | Function | void
    })
    Observable.of(1)/(1,2,3,4,5)
    Observable.interval(1000)发送一个连续的 保存 1000ms间隔的信号
    Observable.timer(初始时间点,时间间隔) 首先间隔多次时间 再发送连续的时间间隔信号
    create 自定义初始逻辑
        Observable.create(function(obs){


            return AnonymousSubscription | Function | void
        })
    fromPromise(PromiseLike)
    from([]|迭代器对象|PromiseLike|Subscribable)
    range 指定信号的一个范围 range(0,10)
    defer 延迟Observable的创建 直到被订阅
        欧巴桑 = Observable.defer(function () {
            if (Math.random() > 0.5) {
                return Rx.Observable.fromEvent(document, 'click');
            } else {
                return Rx.Observable.interval(1000);
            }
        });
    just 创建一个源的信号
    repeat 创建一个源 重复n次  repeat(value,n)
    timer(init,time) 创建连续的时间间隔信号
    bindCallback(func,selector)
        func 包装函数
        selector ()=>{}可选获取回调函数的参数，返回值作为信号值      

        吧一个函数包装为Obser
        这个函数的最后一个参数为回调函数
        function GETData(params,callback){
            fetch(params).then((res)=>{
                callback(res)
            })
        }
        obsFunc = Observable.bindCallback(GETData)
        obsFunc({url:xxx}).subscribe
    fromEvent
        >Observable.fromEvent( $('#input'), 'click');
        >
            var eventEmitter = new EventEmitter();
            Observable.fromEvent(
                eventEmitter,
                'EVENNAME',
                selector ()=>{}可选获取回调函数的参数，返回值作为信号值      
            );
            eventEmitter.emit("EVENNAME",..)
    
    timeInterval Obs<T>==>Obs<TimeInterval<T>
        记录信号的索引和间隔
    timeout 规定信号执行时间 时间段后 会结束信号
        .delay(5000)
        .timeout(200, 'Timeout has occurred.');

        .delay(5000)
        .timeout(200, Promise.resolve(42));

订阅
    let obser = Observable.create()
    let sub = obser.subscribe(next,err,complate)
    sub.unsubscribe()
    
    subscribe(
        PartialObserver(Subject 及其子类)
        ()=>{},()=>{},()=>{}
    )

操作符 原型链上
    do | tap | let
        不会改变Obser的任何东西 只是增加一步回调
    toPromise   被 Observable.toPromise 替代
        只能接受完成信息Promise
    delay
        消息队列整体延迟多少毫秒
    scan
       应用一个函数 在每次的信号上   （累加操作）
       [1,2,3,4].scan((x,y)=>x+y,initv) ===>1 3 6 10
        
    take(num)
        是信号只能发送num次
    
    takeLas(num) 仅仅下发最后num次

    filter
        过滤信号 true 的可以向下执行
    max | min
        数字 在完成时  发出最大的一个值
    Map
        改变每个信号
    skip(num)
        忽略前几个信号
    skipLast
    retry
    startWith 在信号量 最前方加入一个信号
        Observabale.from([1,2,3,4,5]).startWith(0)
        0,1,2,3,4,5,  
    pipe    
        一个管道  可以定义你自己的信号处理过程 （自定义操作符）
        pipeable 好处是 自定义的操作符 不需要再每个Observable原型上绑定 
                 直接通过现有pipe就可以达到使用所有操作符的目的

        Observale.timer(1000).pipe(
            map(index=>index+2),管道1
            filter(index=>index%2==1),管道2
            take(3), 管道3
            CustomPipe()管道4
        )


    debounceTime
        控制事件触发频率 (以消息为准)

        消息队 1    AD  3     5 
        时间对 ---- 发送1
        时间对      ---- A (有新的消息 D) 放弃消息 重新计时
        时间对       ---- D (有新的消息 3) 放弃消息 重新计时
        时间对           ---- 3 无新的消息 发送3
                        最后一个消息5 必定会发送
        
        
        

    throttleTime
        控制事件触发频率

        消息队 1    AD  3     5 
        时间对 ----|----|----|----|

        时间间隔内 只容许发送一个消息
                1  A  5  最后一个(要看是不是在时间范围类 判断是否发送)
        
    replay  --> ConnectableObservable
        变为可连接对象 使所有订阅者都能收到所有数据
        replay(buffersize) 指定个数
    

    publish  -->ConnectableObservable
        变为普通的可连接对象    

    publisgLast

    信号源共享   
        (
            "rxjs": "^5.5.0" share() 不一样 (why)
        )
        publish + refCount
        b = Observable.create((obs)=>{
            //这里只会 调用一次
            obs.next(1)
            obs.next(2)
            obs.next(3)
            obs.complete()
        }).publish().refCount()
        b.subscribe((res)=>{
            console.log("_onTopClick1",res)
        })
        b.subscribe((res)=>{
            console.log("_onTopClick2",res)
        })
    
    信号组合
        zip
            多个消息源  
            把 对应索引 下的多个消息源 组合之后在发出 
                
            必须对应所有索引都有消息 在发出

        combineLatest
            多个消息源  
            每次的消息源 都会组合最近的消息 发出

        merge
            组合多个信号源 然后在一次发出
                1    2  3
                   a      b
                  merge
                1 a 2 3 b
                
        withLatestFrom
            只有当主要这个的 Observabale 发出值 时使⽤用每个源的最后⼀一个值
            
            (主要obs).withLatestFrom([a,b,c,d],func)



自定义操作符  纯函数
    操作符:Observale<T> => Observable<R>
    function CustomPipe(num){
        return (source)=>{
            return Observable.create((obs)=>{

                 return source.take(num).subscribe((s)=>obs.next(s),(err)=>{
                    obs.error(err)
                },()=>{
                    obs.complate()
                })
            })
        }
    }
    Observale.create().pipe(
        CustomPipe(100),
        map(xxx)
    )

自定义操作符  原型链上定义
    https://cn.rx.js.org/manual/usage.html#h13