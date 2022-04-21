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
		// PublishSubject  仅仅把订阅之(后)的数据发送 订阅之(前)的数据不会发送
		AsyncSubject  仅仅发送complete 之前的一个数据
	```
 [Document](https://cn.rx.js.org/manual/usage.html#h13)
 [Document2](https://cn.rx.js.org/class/es6/Observable.js~Observable.html)
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
  	
  * defer

  	```
  	等待订阅时，才会创建订阅信号。每次订阅都是新的
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
  	* result.subscribe(x => console.log(x), e => console.error(e))
  	funcABCD =(T1,T2,...,callback)=>{
  	    callback(value)
  	}
  	//select接受callback的参数value  返回值作为信号量发出
  	let boundSomeFunction = bindCallback(funcABCD,selector)
  	boundSomeFunction(T1,T2,...).subscribe()

  * fromEvent 包装事件

    ````
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
    var clicks = Rx.Observable.fromEvent(document, 'click');
    clicks.subscribe(x => console.log(x));
    ```
     

  * fromEventPattern 

    ```
    const someAPIObservable = fromEventPattern(
      function(回调函数) { 
      	return const A = someAPI.registerEventHandler(回调函数); 
      }, 
      function(回调函数, A) {
      	someAPI.unregisterEventHandler(A); 
      }
    );
    
    fromEventPattern(
      handler=>document.addEventListener('click', handler);,
      hander=>document.removeEventListener('click', handler);
    );
    clicks.subscribe(x => console.log(x));
    ```

    

  * generate 迭代

    ```
    range(5) => 0,1,2,3,4
    ===
    generate(
    0,
    (value)=>{
    	return value>=5，
    },
    v=>v+1, // 叠加
    null,// 启用
    调度
    )
    ```

    

  * empty //Rx.Observable.empty().startWith(7);

  * Never 不发送任何信息

  * Throw 直接发送error信号

* 操作符

  * audit 
  	
    ```
    为‘信号源’设置‘启动源’
    参数:启动源
    只有当‘启动源’next之后，才能发送‘信号源’的缓存的最新一个消息
    ```
    
    
    
  * auditTime

    ```
    设置间期时间。
    当收到第一个消息后，开始忽略这个消息和间期时间内的所有消息。间期时间结束后会发送消息源的最新的消息
    ```

  * concat

    ```
    等待信号源完成后，拼接另一个信号
    (1,2,3).concat(5,6,7)=>1,2,3,5,6,7
    
    A.pipe(
    	concat(B,C)// B完成 才能拼接C
    )
    ```

  * concatAll

    ```
    将高阶 Observable 转化为一阶 Observable 
    会将多个消息源缓存所有消息。
    通过顺序的连接内部Observable, 只有当一个完成后才能进行发送下一个源的消息
    
    const example = fromEvent(document.body, 'click')
    .pipe(
      map(e => {
        return interval(1000).pipe(take(3))
      }，
      concatAll(),// 比如快速点击三次，会按顺序输出三次 0,1,2。
      switchAll 快速点击，只输出一次0,1,2，也就是说老的舍去只保留最新的
      mergeAll(2可并发数) 快速点击，会重复的输出多次0，1等。点击越多下，最后送出的频率就会越快。不会舍去，每次都会输出
      exhausAll(),等待第一个源完成，才能开始下一个消息源。在第一个源完成前，会丢弃下一个源的消息
    ),
    concatAll:如果消息源不能保证同步顺序,内部会缓存数据,数据流完成后，它会订阅下一个缓存的数据
    //of(A,B,C).pipe(concatAll())
    
    ```

  * concatMap === map+concatAll
  
    ```
    等待上一个信号完成后在进行拼接下一个信号源
    容许后面的Observer 可以接受到之前的信号源
    const example = fromEvent(document.body, 'click')
    example.pipe(
      concatMap((event)=>{
        console.log("event",event)
        // 容许接受上一个信号
        return interval(1000).pipe(take(3))
      }，function(
      	outerValue: 来自源的值
        innerValue: 来自投射的 Observable 的值
        outerIndex: 来自源的值的 "index"
        innerIndex: 来自投射的 Observable 的值的 "index"
      ){
        return R
      })
    ).subscribe({
      next:v=>console.log('re:',v)
    })
    // 快速点击多次。依次打印0,1,2。重复多次
    ```

    

    
  
  * do | tap | let
    
    不会改变Obser的任何东西 只是增加一步回调
    
  * count 统计计数
    
  * every 判断每一个是否满足条件，结束后发出是否所有的都满足条件
    
  * find 只发出第一个满足条件的值。
    
  * findIndex 只发出第一个满足条件的值所在的索引
    
  * first 发出第一个值 | 第一个满足条件的值
    
  * single 完成后 发出满足条件的第一个值 如果多个会error，没有满足的就是undefine
    
  * elementAt 只发出源的第i个值，并结束。 
    
   * toPromise   被 Observable.toPromise 替代
        只能接受完成信息Promise
  
   * delay
        消息队列整体延迟多少毫秒
  
   * delayWhen 延迟消息，延迟到什么时候由参数决定
     
   * scan 类似数组 并发送中间值
       应用一个函数 在每次的信号上   （累加操作）
       [1,2,3,4].scan((x,y)=>x+y,initv) ===>1 3 6 10
  
   * reduce 累加 并在结束后发送累加的值
     
   * ignoreElements 仅仅发送complate error
     
   * isEmpty 源发出值则转为false,源完成前没有发出任何值则发出true
     
   * materialize 将Observer源信号转为Notifacation发送
     
   * take(num)
        是信号只能发送num次 

   * takeLast(num) 在结束信号后  仅仅下发最后num次

    * takeLastWithTime 在结束信号后  仅仅下发规定时间内的信号

    * takeLastBuffer(3);在结束信号后  会把最后num信号 作为一个信号发出

    * takeLastBufferWithTime(5000);

    * distinct 他会根据返回值和 [之前所有的返回值] 来判断不同，不同的才容许发送
  
        ```
        此操作符会使用 Set 的最小化实现，此实现在底层依赖于 Array 和 indexOf
        Observable.of(1, 1, 2, 2, 2, 1, 2, 3, 4, 3, 2, 1)
          .distinct()
          .subscribe(x => console.log(x)); // 1, 2, 3, 4
          
        Observable.of<Person>(
            { age: 4, name: 'Foo'},
            { age: 7, name: 'Bar'},
            { age: 5, name: 'Foo'})
            .distinct((p: Person) => p.name)
            .subscribe(x => console.log(x)); 
            // { age: 4, name: 'Foo'},
            //{ age: 7, name: 'Bar'},
        ```

        
  
   * distincUntilChanged 和distinct 类似。但是只需要和前一个信号比较不同就可以。
     
   * distinctUntilKeyChanged
  
      ```
      Observable.of<Person>(
          { age: 4, name: 'Foo'},
          { age: 7, name: 'Bar'},
          { age: 5, name: 'Foo'},
          { age: 6, name: 'Foo'})
      .distinctUntilChanged((p: Person, q: Person) => p.name === q.name)
      .distinctUntilKeyChanged('name') 
      .distinctUntilKeyChanged('name'，(x: string, y: string) => x.substring(0, 3) === y.substring(0, 3))
      ```

      
  
   * groupBy 按照某个归着分组，派发信号为GroupedObservable 每一组为GroupedObservable
     
      ```
      of<{id:number,name:string}>(
       { id: 1, name: 'aze1' },
        { id: 2, name: 'sf2' },
        { id: 2, name: 'dg2' },
        { id: 1, name: 'erg1' },
        { id: 1, name: 'df1' },
        { id: 2, name: 'sfqfb2' },
        { id: 3, name: 'qfs3' },
        { id: 2, name: 'qsgqsfg2' }
      ).
      pipe(
        groupBy(
        (p) => p.id,
        分组存活时间
        ),
        let((group)=>{
        	//新的分组就会触发
       	return group
        })
        flatMap(group =>{
          return group.pipe(
            reduce((acc,cur)=>[...acc,cur],[]), // 将数据组合为数组 完成后在派发
          )
        }),
      )
      .subscribe(p => console.log(p));
      ```
      
      
      
   * partition 通过筛选器将源 分为两个信号源
      
   * filter
      过滤信号 true 的可以向下执行
  
      * first | last  仅仅发送第一个 |最后一个信号(完成前的第一个)
  
   * max | min
     
        ```
        数字 在完成时  发出最大的一个值
        或者指定比较函数来判断
        ```
        
        
        
   * pluck 解构 |  Map 改变每个信号
  
       ```
       from([{value:0},{value:1}])
       .map(x=>x.value)
       ==
       .pluck("value") 
       .pluck("value",'xxx') == v.value.xxx 
       ```
  
  * mapTo mapTo('Hi')====>map(x=>'Hi')

    
    
  * flatMap === mergeMap 适用于inner Observable  高阶
  
    ```
    适用多层级Oberver  打平 信号
    
    * A:源Observable =>AValue
    * B:投射Observable => BValue
    * C:才是被订阅的值 any 默认是BValue
    * D:concurrent A源 最大并发订阅数
    * 
    * A.mergeMap((Avalue,Ainex)=>B,(AValue,BValue,Aindex,Bindex)=>C|Any,D)
    
    
    Obs.rang(0,10).map(x=>Obs.timer(1000).map(()=>x)) ==> 得到的是Observer 信号，而不是真的值
    
    Observable.fromEvent("#input","keyup")
    .map(event=>inpuText)
    .flatMap(text=>http.get(text))//高阶转一阶
    .sub((result)=>{
    })
    
    输入框.pipe(
    	flatMap(url=>http(url),(url,json)=>json,4),
    	map(json=>json_data)
    ).subscribe(json_data=>{})
    ```
    
   * switchAll
     
        ```
        输入框.pipe(
        	flatMap(url=>http(url),(url,json)=>json,1),
        	map(json=>json_data)
        ).subscribe(json_data=>{})
        
        // 问题 后请求的数据可能会先到达
        
        输入框.pipe(
        	flatMap(url=>http(url),(url,json)=>json,1),
        	switchAll(),// 新的数据来 会取消之前的信号
        	map(json=>json_data)
        ).subscribe(json_data=>{})
        
        ```
        
        
        
   * skip(num)
        忽略前几个信号

   * skipLast

   * endWith 在信号量 最后方加入一个信号
  
   * startWith 在信号量 最前方加入一个信号
  
        ```
        Observabale.from([1,2,3,4,5]).startWith(0)
        0,1,2,3,4,5, 
        ```
  
   * debounce 只有当duration Observer 发出信号(或完成)后，才会发送source 缓存的最后的一个值
  
        ```
        var clicks = Rx.Observable.fromEvent(document, 'click');
        var result = clicks.debounce(() => Rx.Observable.interval(1000));
        result.subscribe(x => console.log(x));
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

  * defaultifEmpty 源 Observable 在完成之前没有发出任何 next 值，则发出给定的值
  
  * throttleTime
  
    ```
        控制事件触发频率
    
        消息队 1    AD  3     5 
        时间对 ----|----|----|----|
    
        时间间隔内 只容许发送一个消息
                1  A  5  最后一个(要看是不是在时间范围类 判断是否发送)
    ```
  
   * mergeMaptimeInterval 记录信号量时间间隔

        ```
        timeInterval Obs<T>==>Obs<TimeInterval<T>>
        ```

        
  
    * timestamp Obs<T>==>Obs<timestamp<T>>     

        ```
        记录信号的时间错
        ```
  
        
  
  * timeout 接受时间段内的信号 时间段后 会结束信号
    	
    	
    	.delay(5000)
    	.timeout(200, 'Timeout has occurred.');
    	
    	.delay(5000)
    	.timeout(200, Promise.resolve(42));   

    
    
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

  * 多播
  
    * 说明
  
      ```
      单播：不管这个 Observable被几个 Observer订阅，我一次只会给一个 Observer推送
      多播：当源头有值发出时，这个值会同一时间发给所有的 Observer。
      Observable都是单播
      Subject都是多播
      单播
      	import { range } from 'rxjs';
      	const source$ = range(5);
      	source$.subscribe(value => console.log('A: ' + value));
      	source$.subscribe(value => console.log('B: ' + value));
      	// 先输出A: 0,A：1..A完成后,再输出B: 0...
      多播
      	const source$ = range(5);
      	const subject = new Subject();
      	subject.subscribe(value => console.log('A: ' + value));
      	subject.subscribe(value => console.log('B: ' + value));
      	source$.subscribe(subject)// 使用Subject多播
      	A:0,B:0,A:1,B:1 ,A,B交替输出
      ```

      
  
    * multicast 将Observer转为ConnectableObservable 多播
  
      ```
      类似上面使用Subject转多播
      const source = interval(2000).pipe(take(5));
      const example = source.pipe(
        tap(_ => console.log('Side Effect #2')),
        mapTo('Result Two!')
      );
      const multi  = example.pipe(multicast(() => new Subject()));
      const subscriberOne = multi.subscribe(val => console.log(val));
      const subscriberTwo = multi.subscribe(val => console.log(val));
      const subscriptionConnect =multi.connect();
      //
      subscriberOne.unsubscribe()
      subscriberTwo.unsubscribe()
      subscriptionConnect.unsubscribe() 要调用
      ```

      
  
    * refCount
  
      ```
      使用 multicast  需要connect 清除还需要 subscriptionConnect.unsubscribe()
      refCount 会自动connect 当所有订阅都unsubscribe 自动调用 subscriptionConnect.unsubscribe()
      
      const source = interval(500);
      const refCounted = source.pipe(
        multicast(new Subject()),
        refCount()
      );
      ```

      
  
    * publish 转换为ConnectableObservable 可控制信号量
  
      ```
      Obs.publish()===> ConnectableObservable
      ConnectableObservable 只有调用connect 之后才会发送
      
      source.pipe(multicast(new Subject()), refCount());
      等价于
      source.pipe(publish(), refCount());
      ```

      * publish      multicast(new Subject()) === publish()

      * publishBehavior    publishBehavior(0)`=> `new BehaviorSubject(0)

      * publishReplay    publishReplay(2)`=> `new ReplaySubject(2)

      * publishLast  publishLast()`=> `new AsyncSubject()

        

    * share 信号共享 【针对多次被订阅的情况】
  
    * shareReplay  === share + 缓存指定格式 新的订阅后发出
  
      ```
      share == multicast + refCount 的简化版本
      
      
      let sub  = interval(2000).pipe(take(5));
      const example = source.pipe(
       // 多个订阅，每个信号都会调用2次，共10次
        tap(_ => console.log('Side Effect #2')),
        mapTo('Result Two!')
      );
      example.subscribe()
      example.subscribe()
      
      ///////////////////
      
      let sub  = interval(2000).pipe(take(5));
      const example = source.pipe(
       // 多个订阅共享源，每个信号都会调用1次，共5次
        tap(_ => console.log('Side Effect #shape')),
        mapTo('Result Two!'),
        share()
      );
      example.subscribe()
      example.subscribe()
      ```

      
  
  * buffer (缓存信号 直到边界信号出现) 
  
    ```
    	let source =Observel.interval(1000) //信号源
    	var clicks = Rx.Observable.fromEvent(document, 'click');//边界信号
    	source.buffer(clicks).sub(a:[]=>{})
    	
    	收集每次点击事件之前的信号并组合发送
    	-1--2-3-|---4-5|-6-7-8-9-10-|-
    	[1,2,3] [4,5] [6,,7,8,9,10]
    ```
  
  * bufferWhen ~=buffer
  
    ```
    var clicks = Rx.Observable.fromEvent(document, 'click');
    var buffered = clicks.bufferWhen(() =>
      Rx.Observable.interval(1000 + Math.random() * 4000)
    );
    buffered.subscribe(x => console.log(x));
    1：立刻开启缓存
    2：When-next关闭缓存 发送收集的所有信号
    3：开启缓存，等待下一个When-next
    收集 [点击后 ~~ When信号],[],[]
    ```

    
  
  * bufferCount(bufferSize,startBufferEvery?) 基于buffer
  
    ```
    bufferCount(2) 有两个信号后将其组合发送
    startBufferEvery：number 分配一组之后 向后偏移多少
    
    1 2 3  4 5 6 7
    bufferCount(2) [1,2][3,4][5,6][7]
    bufferCount(2,1) ==>[1,2] [2,3],[3,4],[4,5] [5,6][ 6,7]
    bufferCount(2,3) ==>[1,2],[4,5] [7]
    ```
  
  * bufferTime(bufferTimeSpan: number, bufferCreationInterval: number, maxBufferSize: number) 缓存一定时间内的信号 然后组合发出
  
    ```
    bufferTime(1000)//组合一秒内的信号
    bufferTime(1000,2000)//组合一秒内的信号  下一次组合 和上一次组合间隔2000ms
    bufferTime(1000,2000,10) 。。。最多组合10个信号
    ```
  
  * bufferToggle 缓存 两个信号之间的原始信号
  
    ```
    bufferToggle(SubscribableOrPromise,(value)=>SubscribableOrPromise)
    var source = Observable.interval(1000);
    var Bclicks = Rx.Observable.fromEvent(document, 'click');
    
    Bclicks.bufferToggle(source,(event)=>{
    	return Rx.Observable.interval(10000)
    })
    收集  [在点击事件之后的 ,10s内] 信号
    ```

    
  
  * 管道 pipe
  
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
            return (source:Observable)=>{
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


* 组合信号

  * concat  静态方法或者操作符 订阅源完成，再订阅下一个

  * concatAll 见上

  * pairwise 默认将信号数据 两两组合 

  * toArray() 在信号完成之前将所有信号组合为一个数组

  * forkJoin 在多个信号完成后 将每一个最后一个信号组合发送

  * zip

    ```
    import { zip  } from 'rxjs'
    多个消息源  
    把 对应索引 下的多个消息源 组合之后在发出 
    必须对应所有索引都有消息 在发出
    zip(sourceA,sourceB,(A,B)=>T).sub(T)
    ```

    

  * combineLatest

    ```
    Observable. combineLatest
    多个消息源  
    每次的消息源 都会组合最近的消息 发出
    1  2   3  
    
    a    c
    
    1a 2a 2c 3c
    
    sourceA.combineLatest,sourceB,(A,B)=>T).sub(T)
    ```

  * combineAll

    ```
    当所有外部Observable 完成后，应用 combineLatest。得到的消息和combineLatest一致,会将高阶转为一阶
    
    const source = interval(1000).pipe(take(2));
    
    const example = source.pipe(
    	map(val => interval(1000).pipe(map(i => `Result (${val}): ${i}`), take(5)))
    );
    /*
    等待example完成
    soure 中的2个值会被映射成2个(内部的) interval observables，
    这2个内部 observables 每秒使用 combineLatest 策略来 combineAll，
    每当任意一个内部 observable 发出值，就会发出每个内部 observable 的最新值。
    */
    const combined = example.pipe(combineAll());
    /*
    输出:
    ["Result (0): 0", "Result (1): 0"]
    ["Result (0): 1", "Result (1): 0"]
    ["Result (0): 1", "Result (1): 1"]
    ["Result (0): 2", "Result (1): 1"]
    ["Result (0): 2", "Result (1): 2"]
    ["Result (0): 3", "Result (1): 2"]
    ["Result (0): 3", "Result (1): 3"]
    ["Result (0): 4", "Result (1): 3"]
    ["Result (0): 4", "Result (1): 4"]
    */
    const subscribe = combined.subscribe(val => console.log(val));
    ```

  * merge

    ```
  组合多个信号源 然后在一次发出
    1    2  3
     a      b
      merge
    1 a 2 3 b
    ```

  * mergeAll(2并发数)见上

  * mergeMapTo  将每个信号都转为xx 

  * mergeScan merge上增加累计器

    

    

    

* 高阶Observer  信号量为Observer
	
	```
	flatMap===mergeMap
	combineAll 等待所以输入链全部完成 然后再往下处理 然后将高阶Observable转为一阶 【见上】
	concatAll 保证一次输入完成后在处理第二次输入  然后将高阶Observable转为一阶 【见上】
	mergeAll 单纯合并所有输入 然后将高阶Observable转为一阶 【见上】
	switchAll 如果下一次输入时 ，上一个输入没有完成 会舍弃上一次。仅处理这一次 。然后将高阶Observable转为一阶【见上】
	```
	
* 错误处理
	
	* catch

		```
		.catch((error)=>throw Error()).sub({error:()=>{}})//处理异常
		caught.map().catch((error,caught)=>caught).sub() //再次订阅
		caught.map().catch(()=>Observer.of()).//订阅新的源
		```

	* retry(num) 当接受到error后 再次订阅源
        Object.from([1,2,onError,3,4,5]).retry(2).subscribe()
    
    * retryWhen
  
* 订阅
	
	```
	用于处理信号量的发布
	let froms = Observable.from([])
	froms.subscribe(next,error,complete)对应处理
	froms.subscribe(NextObserver<T> | ErrorObserver<T> | CompletionObserver<T>)对接另一个订阅

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
	
```
export { Subject, AnonymousSubject } from './Subject';
export { Observable } from './Observable';
export { AsyncSubject } from './AsyncSubject';
export { ReplaySubject } from './ReplaySubject';
export { BehaviorSubject } from './BehaviorSubject';
export { ConnectableObservable } from './observable/ConnectableObservable';

export { Notification } from './Notification';

export { TestScheduler } from './testing/TestScheduler';
export { VirtualTimeScheduler } from './scheduler/VirtualTimeScheduler';
export { AjaxRequest, AjaxResponse, AjaxError, AjaxTimeoutError } from './observable/dom/AjaxObservable';

import { AsapScheduler } from './scheduler/AsapScheduler';
import { AsyncScheduler } from './scheduler/AsyncScheduler';
import { QueueScheduler } from './scheduler/QueueScheduler';
import { AnimationFrameScheduler } from './scheduler/AnimationFrameScheduler';

export { pipe } from './util/pipe';
export { audit } from './operators/audit';
export { auditTime } from './operators/auditTime';
export { catchError } from './operators/catchError';
export { combineAll } from './operators/combineAll';
export { combineLatest } from './operators/combineLatest';
export { concat } from './operators/concat';
export { concatAll } from './operators/concatAll';
export { concatMap } from './operators/concatMap';
export { concatMapTo } from './operators/concatMapTo';
export { count } from './operators/count'; 记录信号数量 
export { debounce } from './operators/debounce';
export { debounceTime } from './operators/debounceTime';
export { defaultIfEmpty } from './operators/defaultIfEmpty';
export { delay } from './operators/delay';
export { delayWhen } from './operators/delayWhen';
export { dematerialize } from './operators/dematerialize';
export { distinct } from './operators/distinct';
export { distinctUntilChanged } from './operators/distinctUntilChanged';
export { distinctUntilKeyChanged } from './operators/distinctUntilKeyChanged';
export { elementAt } from './operators/elementAt';
export { every } from './operators/every';
export { exhaust } from './operators/exhaust';
export { exhaustMap } from './operators/exhaustMap';
export { expand } from './operators/expand';
export { filter } from './operators/filter';
export { finalize } from './operators/finalize';
export { find } from './operators/find';
export { findIndex } from './operators/findIndex';
export { first } from './operators/first';
export { groupBy } from './operators/groupBy';
export { ignoreElements } from './operators/ignoreElements';
export { isEmpty } from './operators/isEmpty';
export { last } from './operators/last';
export { map } from './operators/map';
export { mapTo } from './operators/mapTo';
export { materialize } from './operators/materialize';
export { max } from './operators/max';
export { merge } from './operators/merge';
export { mergeAll } from './operators/mergeAll';
export { mergeMap } from './operators/mergeMap';
export { mergeMap as flatMap } from './operators/mergeMap';
export { mergeMapTo } from './operators/mergeMapTo';
export { mergeScan } from './operators/mergeScan';
export { min } from './operators/min';
export { multicast } from './operators/multicast';
export { observeOn } from './operators/observeOn';
export { onErrorResumeNext } from './operators/onErrorResumeNext';
export { pairwise } from './operators/pairwise';
export { partition } from './operators/partition';
export { pluck } from './operators/pluck';
export { publish } from './operators/publish';
export { publishBehavior } from './operators/publishBehavior';
export { publishLast } from './operators/publishLast';
export { publishReplay } from './operators/publishReplay';
export { race } from './operators/race';
export { reduce } from './operators/reduce';
export { repeat } from './operators/repeat';
export { repeatWhen } from './operators/repeatWhen';
export { retry } from './operators/retry';
export { retryWhen } from './operators/retryWhen';
export { refCount } from './operators/refCount';
export { sample } from './operators/sample';
export { sampleTime } from './operators/sampleTime';
export { scan } from './operators/scan';
export { sequenceEqual } from './operators/sequenceEqual';
export { share } from './operators/share';
export { shareReplay } from './operators/shareReplay';
export { single } from './operators/single';
export { skip } from './operators/skip';
export { skipLast } from './operators/skipLast';
export { skipUntil } from './operators/skipUntil';
export { skipWhile } from './operators/skipWhile';
export { startWith } from './operators/startWith';
/**
 * TODO(https://github.com/ReactiveX/rxjs/issues/2900): Add back subscribeOn once it can be
 * treeshaken. Currently if this export is added back, it
 * forces apps to bring in asap scheduler along with
 * Immediate, root, and other supporting code.
 */
export { switchAll } from './operators/switchAll';
export { switchMap } from './operators/switchMap';
export { switchMapTo } from './operators/switchMapTo';
export { take } from './operators/take';
export { takeLast } from './operators/takeLast';
export { takeUntil } from './operators/takeUntil';
export { takeWhile } from './operators/takeWhile';
export { tap } from './operators/tap';
export { throttle } from './operators/throttle';
export { throttleTime } from './operators/throttleTime';
export { timeInterval } from './operators/timeInterval';
export { timeout } from './operators/timeout';
export { timeoutWith } from './operators/timeoutWith';
export { timestamp } from './operators/timestamp';
export { toArray } from './operators/toArray';
export { window } from './operators/window';
export { windowCount } from './operators/windowCount';
export { windowTime } from './operators/windowTime';
export { windowToggle } from './operators/windowToggle';
export { windowWhen } from './operators/windowWhen';
export { withLatestFrom } from './operators/withLatestFrom';
export { zip } from './operators/zip';
export { zipAll } from './operators/zipAll';

```