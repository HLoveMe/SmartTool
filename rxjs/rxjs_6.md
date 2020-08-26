* PublisSubject 不在提供
* 操作符面向函数

	```
	Observable.of(1) == of(1)
	
	Observable.from([1,2,4,5]).map(x=>x*x)
	map(x=>x*x)(from([1,2,3,4]))
	
	Observable.from([1,2,4,5]).map(x=>x*x).filter(x=>x>5).first()
	 ==
	first()(filter(x=>x>5)(map(x=>x*x)(from([1,2,3,4]))))
	 ==
	from([1,2,4,5]).pipe(
		map(x=>x*x),
		filter(x=>x>5),
		first()
	)
	```