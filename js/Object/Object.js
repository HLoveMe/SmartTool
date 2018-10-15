
Object
    prototype
        constructor  指向函数本身
        __proto__    指向 构造该对象的构造函数的原型
        hasOwnProperty 判读是自己的属性还是继承的属性
        isPrototypeOf   O.isPrototypeOf(X)  O是否在X的原型链上
        propertyIsEnumerable  判断其中有哪些可枚举的属性
        toString

        for / in 语句块   可枚举的（自身和继承）的属性列表
        Object.keys(obj) 返回可枚举属性列表
        Object.getOwnPropertyNames(obj)  得到自身属性列表（可枚举 和 不可枚举）
        ....

    属性声明（属性描述符）
        let person = new Person()
        person.name = "ZZH"
        //defineProperties
        Object.defineProperty(person,"name",{
            configurable:false, // 设置为通过delete 不能删除
            enumerable:false,  // 设置为通过for - in 循环不能返回该属性
            writable:false, // 设置为不能修改属性值
            value:"ZZH" //包含这个属性的数据值，能写入，能读取
            get:func,
            set:func
        })

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
    __proto__ > 指向构造该对象的构造函数的原型 
        Person.__proto__ == Function的原型
        person.__proto__ == Person函数的原型 == Person.prototype

    prototype > { Person原型为Function原型
        __proto__, 指向构造该对象的构造函数的原型 (Function原型对象  的  构造器函数的原型 ->Object原型)
        constructor  （Person函数本身）
    }
    
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
        prototype （Function原型）
            __proto__  -> Object.prototype
            constructor --> Person 函数





