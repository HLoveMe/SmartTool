
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


    Subject
    BehaviorSubject 需要指定初始值 会保留最后发送一次数据 在下一个订阅后立即发出
    ReplaySubject  会保留指定个数的 数据  订阅后发出
    PublisSubject
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
    Observable.of(1)/(1,2,3,4,5)
    Observable.interval(1000)发送一个连续的 保存 1000ms间隔的信号
    Observable.timer(初始时间点,时间间隔) 首先间隔多次时间 再发送连续的时间间隔信号
    create 自定义初始逻辑
        Observable.create()
    fromPromise(PromiseLike)
    from([]|迭代器对象|PromiseLike|Subscribable)
    range
    defer
        欧巴桑 = Observable.defer(function () {
            if (Math.random() > 0.5) {
                return Rx.Observable.fromEvent(document, 'click');
            } else {
                return Rx.Observable.interval(1000);
            }
        });
    
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

操作符

    delay
        消息队列整体延迟多少毫秒

    take(num)
        是信号只能发送num次
        
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
                1  A  5  最后一个肯定会发送
        
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

