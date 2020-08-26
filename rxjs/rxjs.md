# RXJS

* 类别

	```
	Observable 订阅(名词)
		被订阅 [冷--被订阅-->热]
		子类
			ConnectableObservable extends Observable
				被订阅后 订阅者不会接受信号量
				只有在connect后 订阅者才会接受到信号量
			ArrayObservable = Observable.from = [Array]
			ArrayLikeObservable ==[ArrayLike]
			AjaxObservable 专处理ajax请求
			BoundCallbackObservable  包装自定义函数
			BoundNodeCallbackObservable 绑定nodejs callBack回调为订阅
			EmptyObservable 一个直接发送complete信号量的订阅
			...
			
	Subject 观察者 and 订阅
		既可以发送信号量 也可以被订阅
		Subject         尽量不直接使用这个类（Observale 或者 下面的代替）
		BehaviorSubject 需要指定初始值 会保留最后发送一次数据 在下一个订阅后立即发出
		ReplaySubject  会保留指定个数的 数据  订阅后发出
		PublishSubject  仅仅把订阅之(后)的数据发送 订阅之(前)的数据不会发送
		AsyncSubject  仅仅发送complete 之前的一个数据
	```
 [Document](https://cn.rx.js.org/manual/usage.html#h13)
* 创建
	
	* new
	
		```
		new Observable((obs)=>{
			obs.next
			obs.error
			return ()=>{}
			return void
			return AnonymousSubscription | Function | void;
		})
		```
	* create
	
		```
		Observable.create(function(obs){
				obs.next
				
            return AnonymousSubscription | Function | void
        })
		```
	* of 
		
		```[ArrayObservable]
		Observable.of(1)
		Observable.of(1,2,3)
		```
	* just | return

		```
		仅仅一个信号量 然后Completed
		```
	* from

		```FromObservable
		Observable.from(
			Subscribable<T> | PromiseLike<T> | ArrayLike<T>;
		)
		Observable.from([])
		Observable.from(Promise.reslove(1))
		Observable.from(
			Observable.range(1,10).take(5).map(a=>a+100)
		)
		```
	* repeat 
		
		```
		创建一个源 重复n次  repeat(value,n)
		Observable.repeat("zzh",2)
			"zzh","zzh"
		```
	* fromPromise

		```PromiseObservable
		
		Observable.fromPromise(Promise.reslove(1))
		```
	* range 包装一个连续递增

		```RangeObservable
		Observable.range(init,count)
		Observable.range(-10,10)
			-10,-9 .....10个
		```
	* interval 创建一个连续间隔 发送信号量的订阅
		
		```IntervalObservable
		Observable.interval(1000)发送一个连续的  1000ms间隔的信号
		```
	* timer 一个具有初始延迟 连续

		```
		Observable.timer(2000,500)
		延迟2000ms发送信号 然后在500ms一直发送
		```	
	* bindCallback	| bindNodeCallback(node 函数)

		```
		包装函数为Observable  
		
		* import * as fs from 'fs';
		* var readFileAsObservable = Rx.Observable.bindNodeCallback(fs.readFile);
		* var result = readFileAsObservable('./roadNames.txt', 'utf8');
		* result.subscribe(x => console.log(x), e => console.error(e));




		funcABCD =(T1,T2,...,callback)=>{
			callback(value)
		}
		//select接受callback的参数value  返回值作为信号量发出
		let boundSomeFunction = bindCallback(funcABCD,selector)
		boundSomeFunction(T1,T2,...).subscribe()
		
		```
	* fromEvent 包装事件

		```
		> DOM EventTarget**
		This is an object with `addEventListener` and `removeEventListener` methods.
		
		> Node.js EventEmitter**
		An object with `addListener` and `removeListener` methods.
		
		> JQuery-style event target**
		An object with `on` and `off` methods
		
		> DOM NodeList**
		`document.querySelectorAll` or `Node.childNodes`.
		 
		> DOM HtmlCollection**
		 
		```
		```
		var clicks = Rx.Observable.fromEvent(document, 'click');
		clicks.subscribe(x => console.log(x));
		```
		
	* empty //Rx.Observable.empty().startWith(7);
	* Never 不发送任何信息
	* Throw 直接发送error信号

* 操作符
	* do | tap | let
        不会改变Obser的任何东西 只是增加一步回调
   * toPromise   被 Observable.toPromise 替代
        只能接受完成信息Promise
   * delay
        消息队列整体延迟多少毫秒
   * scan
       应用一个函数 在每次的信号上   （累加操作）
       [1,2,3,4].scan((x,y)=>x+y,initv) ===>1 3 6 10
        
   * take(num)
        是信号只能发送num次
    
   * takeLast(num) 在结束信号后  仅仅下发最后num次

   * filter
        过滤信号 true 的可以向下执行
   * max | min
        数字 在完成时  发出最大的一个值
   * Map
        改变每个信号
   * skip(num)
        忽略前几个信号
   * skipLast
   
   * startWith 在信号量 最前方加入一个信号
        
        ```
        Observabale.from([1,2,3,4,5]).startWith(0)
        0,1,2,3,4,5, 
        ```
   * debounceTime

		```
		 控制事件触发频率 (以消息为准)

        消息队 1    AD  3     5 
        时间对 ---- 发送1
        时间对      ---- A (有新的消息 D) 放弃消息 重新计时
        时间对       ---- D (有新的消息 3) 放弃消息 重新计时
        时间对           ---- 3 无新的消息 发送3
                        最后一个消息5 必定会发送
		```
	* throttleTime
		
		```
        控制事件触发频率

        消息队 1    AD  3     5 
        时间对 ----|----|----|----|

        时间间隔内 只容许发送一个消息
                1  A  5  最后一个(要看是不是在时间范围类 判断是否发送)
		```
	 * timeInterval 记录信号量时间间隔
	 
	 	```
			timeInterval Obs<T>==>Obs<TimeInterval<T>>
	 	```
    *  timestamp Obs<T>==>Obs<timestamp<T>>     
    	
    	```
    	记录信号的时间错
    	```

	* timeout 接受时间段内的信号 时间段后 会结束信号
    	
    	```
    	.delay(5000)
	    .timeout(200, 'Timeout has occurred.');
	
	    .delay(5000)
	    .timeout(200, Promise.resolve(42));   
    	```

	* publish 转换为ConnectableObservable 可控制信号量
		
		```
		Obs.publish()===> ConnectableObservable
		```
		* publishLast
		
		```
		在源 Completed后 发送给订阅者最后一个信号量
		```
	* replay
	
		```
		确保所有观察者看到相同的信号
		
		replay操作 之后的所有信号会被保存(缓存) 所有订阅者都可以订阅到信号 。即使信号是在被订阅之前发出
		```
	* refCount
		
		```
		ConnectableObservable ===> Observable
		
		内部订阅 ConnectableObservable【源】  
		
		本身被订阅 只是内部进行源信号量的转发
		
		【源】	ConnectableObservable == [Observable1]
			【refCount】===>订阅Observable1(connect) ==> Observable2
				Observable2被订阅1 --->
				Observable2被订阅2 --->
				Observable2被订阅3 --->
				
		源ConnectableObservable 仅仅被订阅一次
				
		```
	* 信号共享 【针对多次被订阅的情况】

		```
		share == publish + refCount
		```

		```
		let sub = Observable.create((obs)=>{
            obs.next(1)
            obs.next(2)
            obs.next(3)
            //会被调用两次
            obs.complete()
        })
        
        sub.subscribe()
        sub.subscribe()
		```
		```
		b = Observable.create((obs)=>{
            //这里只会 调用一次
            obs.next(1)
            obs.next(2)
            obs.next(3)
            obs.complete()
        }).publish().refCount()
        b.subscribe()
        b.subscribe()
		```
	* 组合信号

		* startWith 在信号之前插入信号量

		* zip

			```
			Observable.zip
			多个消息源  
			把 对应索引 下的多个消息源 组合之后在发出 
			必须对应所有索引都有消息 在发出
			Ob.zip(sourceA,sourceB,(A,B)=>T).sub(T)
			```
		* combineLatest

			```
			Observable. combineLatest
			多个消息源  
			每次的消息源 都会组合最近的消息 发出
			1  2   3  
			
			a    c
			
			1a 2a 2c 3c
			
			Ob.combineLatest(sourceA,sourceB,(A,B)=>T).sub(T)
			```
		* merge
			
			```
			组合多个信号源 然后在一次发出
                1    2  3
                   a      b
                  merge
                1 a 2 3 b
			```
	   * pipe
	
			```
			一个管道  可以定义你自己的信号处理过程 （自定义操作符）
	        pipeable 好处是 自定义的操作符 不需要再每个Observable原型上绑定 
	                 直接通过现有pipe就可以达到使用所有操作符的目的
		
	        Observale.timer(1000).pipe(
	            map(index=>index+2),管道1
	            filter(index=>index%2==1),管道2
	            take(3), 管道3
	            CustomPipe()管道4
	        )
	        
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
			```
* 错误处理
	
	* catch

	* retry(num) 当接受到error后 再次创建新的。会先发出之前的num个信号
        Object.from([1,2,onError,3,4,5]).retry(2).subscribe()
        1，2 onError
            1，2，“1，2，3，4，5”
* 订阅
	
	```
	用于处理信号量的发布
 	let froms = Observable.from([])
 	froms.subscribe(next,error,complete)对应处理
 	froms.subscribe(NextObserver<T> | ErrorObserver<T> | CompletionObserver<T>)对接另一个订阅
	```
* 资源释放 Subscription

	```
	let sub = froms.subscribe(next,error,complete);
	
	1:unsubscribe 取消订阅 释放资源
	2:add(AnonymousSubscription | Function | void;)增加子类
	3:remove(Subscription)
	
	本订阅释放掉 其所有子subscriptions也会被释放
	```
* 调度器 Scheduler
	
	```
	用于调度控制事件的发送顺序和速度
	
	> null 会以同步递归的方式发送通知
	> queue 同步 当前事件帧中的队列调度(蹦床调度器)
	> asap 微任务的队列调度 Promise.resolve().then(() => task)
	> async 宏任务 setInterval调度
	> animationFrame 异步 
	subscribeOn 用于指定发送信号量的调度
	
	observeOn 用于改变next error Complete执行时机
		obs.next()| error() | Complete()
	
	可以指定调度器	
		bindCallback
		bindNodeCallback
		combineLatest
		concat
		empty
		from
		fromPromise
		interval
		merge
		of
		range
		throw
		timer
		
	默认同步的操作符，比如：of | from | range,它们默认的调度器为 queue
	默认异步的操作符，比如：timer | interval,它们默认的调度器为 async, 内部使用 setInterval
		
	```
	
	