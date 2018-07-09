
类
    function Person{ //拥有原型对象
        this.name = ""
        this.say=function(){}
    }

    原型属性s
        prototype
        Person.prototype = Function.prototype

    实例属性
        say 为实例属性
        var obj = new Person()
        obj.xx = func(){}
        xx为实例属性

    方法
        function Person(){
            this.say = function(){
                console.log("Person.say")
            }
        }
        Person.prototype.say = func(){console.log("Person.protptype.say")}
        调用顺序   实例方法|属性  > 原型方法

    原型
        Person.prototype
            Object.prototype

    Object


    
创建
    function Person(){
        this.name = ""
        this.say = function(){
            this
        }
    }
    var person = new Person()

    问题
    this填充问题
        person.say() this为调用者 

        func = person.say
        func() window

    原型链问题
        new Person() new出来的对象 无原型   (new Person().prototype == undefined)
    

继承 | 扩展
    原型链继承
    function Animation(age){
        this.type = "Animation"
        this.age = age
        this.say = function(){
            console.log("AAAAAAA",this.type)
        }
    }
    
    function Person(age){
        Animation.call(this,age)
        this.type = "Person"
        this.say = function(){
            console.log("AAAAAAA",this,this.type)
        }
    }
    Person.prototype = new Animation()
    Person.prototype.constructor = Person


    var p = new Person()


    