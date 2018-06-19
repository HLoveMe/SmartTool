
类
    class Person{ 拥有原型对象
        constructor(){}
        name = ""
        say(){}
        say3 = ()=>{}
    }
    原型属性
        prototype

    实例属性
        class A{
            xx = ()=>{}
        }
        等于
            var obj = new A()
            obj.xx = func(){}
             
            是实例拥有 而不是类(原型)拥有
            不会被继承 也不会覆盖父类
    方法
        Function
            function Person(){
                this.say = function(){
                    console.log("Person.say")
                }
            }
            Person.prototype.say = func(){console.log("Person.protptype.say")}
            调用顺序   对象方法  > 原型方法
            
        class
            class Person{
                say(){
                    console.log("Person.say")
                }
                say2=()=>{
                    console.log("Person.say2")
                }
            }
            Person.prototype.say = func(){console.log("Person.protptype.say")}
            Person.prototype.say2 = func(){console.log("Person.protptype.say2")}

    原型
        Person.prototype
            constructor  为创建函数 function ABCD(){...}   (constructor(){})

    Object


    
创建
    Function
        function Person(){
            this.name = ""
            this.say = function(){
                this
            }
        }
        var person = new Person()

    class
        class Person(){
            name = null
            constructor (name) {
                this.name = name
            }
            say(){

            }
            say2 = ()=>{

            }
        }
        var person = new Person("AA")

    问题
    this填充问题
        class 
              var say = person.say
                  say2 = person.say2
                say() 不会自动填充this (this=window)
                say2() 自动填充 this
            // person.say()   person.say2() this为调用者 

    原型链问题
        Function | class
        new Person() new出来的对象 无原型   (new Person().prototype == undefined)
    
    属性问题
        class
            name say 为原型属性 会在原型链上
            say2 为实例属性 在具体对象上 不参与继承

            var per = new Person()
            per.say3 = function(){}
            say3为实例属性

继承 | 扩展
    Function

    class

    class - Function

