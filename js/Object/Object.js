
Object
    prototype
        constructor  指向函数本身
        __proto__    指向构造器函数的prototype
        hasOwnProperty 判读是自己的属性还是继承的属性
        isPrototypeOf   O.isPrototypeOf(X)  O是否在X的原型链上
        propertyIsEnumerable  判断其中有哪些可枚举的属性
        toString
        ....
    


对象的创建
 class Person{constructor(name){this.name = name}}
 function Person(name){this.name = name}
 var p = new Person("AA")
 new 命令通过构造函数新建对象实例的过程
    其本质是将实例的原型，指向了构造函数的prototype属性，然后在实例上执行构造函数

 等于
    var p = {}
    p.__proto__ = Object.setPrototypeOf({},Person.prototype)
    Person.call(p,"AAA")


prototype 和 __proto__
    __proto__ > 指向他的构造器函数的prototype
    prototype > {__proto__,constructor}
    
> 任何对象都有__proto__ 属性 

> 非函数对象只有一个__proto__属性  【非函数对象.png】
    function Person(){}
    var per = new Person()
        per.__proto__ ==  Person.prototype
            Person.prototype
                __proto__ --> Object 的原型
                constructor --> function Person 函数本身

        per.prototype == undefined

> 函数对象有 __proto__ 和 prototype   【函数对象.png】
    function Function(){}
        __proto__ --> 自己 Function.prototype
        prototype
            __proto__ --> 自己 Function.prototype
            constructor-->Function

    function Person(){} Person函数对象
        __proto__  --> Function.prototype
        prototype
            __proto__  -> Object.prototype
            constructor --> Person 函数


