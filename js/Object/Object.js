
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
        get | set 
            1：属性配置中设置
            2：a = {
                get name(){

                },
                set name(){

                },
                //es6
                get [window.name+"sasa"](){//使用变量作为名称

                }
            }

    属性:
        1：自身属性 和 原型属性是分开的 
            obj.xxx (先查找自身属性 在 查找原型属性)
            let obj = {name:"zzh"}
            Object.defineProperty(obj.__proto__,"age",{get:()=>25}
            obj.age // 25
            obj.age = 16
            obj.age //依然25 
            
            Object.defineProperty(obj,"age",{value:18,configurable:true,writable:true})
            obj.age //18
            obj.age= 100
            obj.age //100
            delete obj["age"]//删除自身属性
            obj.age //25 向上查到到原型链



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



对象的拷贝
    1：浅拷贝 仅仅对属性进行拷贝
        function copy(obj){
            let target = {}
            for(key in obj){
                target[key] = obj[key]
            }
            return target
        }
        obj1 ={a:{name:1},name:"",fly:()=>{}}
        obj2 = copy(obj1) //浅拷贝 a属性是个对象  依然会影响前后两个对象
    2:深拷贝
        function deepCopy(obj){
            if(typeof obj != 'object'){
                return obj;
            }
            var newobj = {};
            for ( var attr in obj) {
                newobj[attr] = deepCopy(obj[attr]);
            }
            return newobj;
        }
1：obj Function Object
    > 任何对象 或者（Function | Object）有 __proto__ 指向创建该对象的函数的原型链
    > 只有函数(function ABCD{} || Function) 和 Object 才会有prototype

        function ABCD(){}; let one = new ABCD();
        one.__proto__ 指向 ABCD.prototype
            ABCD.prototype.__proto__ == Object.prototype

        Function.__proto__ == Function.prototype

        Object.__proto__ == Function.prototype
        Object.prototype(对象)
            对象.__proto__ == null

    > 函数(类) 和 实例 都是 __proto__ 完成继承
      person = {}
      person.name 
        1:在person本身上查找 null
        2:在原型链上查找 persopn.__proto__( == Persion.prototype )上查找
        3:最后会一直查找到 Object.prototype 上







