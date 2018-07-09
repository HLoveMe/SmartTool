
类
    class Person{ 拥有原型对象
        constructor(){}
        static type = "Person"
        name = ""
        say(){}
        say2 = ()=>{}
    }
    编译后
        var Person = function () {
            function Person() {
                _classCallCheck(this, Person);//类型检查
            
                this.say2 = function () {
                };
            }
            //加到原型上
            _createClass(Person, [{
                key: "say",
                value: function say() {
            }
            }]);
        
            return Person;
        }();
        Person.type = "Person"

    

    原型属性
        Person.prototype
        name say 绑定在prototype 为原型属性

    实例属性 
        say2
        是实例拥有 而不是类(原型)拥有
        不会被继承 也不会覆盖父类

    方法
        class Person{
            say(){
                console.log("Person.say")
            }
            say2=()=>{
                console.log("Person.say2")
            }
        }
        //覆盖原型链say方法
        Person.prototype.say = func(){console.log("Person.protptype.say")}
        //增加原型链
        Person.prototype.say2 = func(){console.log("Person.protptype.say2")}

        // person.say2()
        调用顺序   对象方法  > 原型方法

    原型
        Person.prototype

    Object


    
创建
    
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
        var say = person.say
        say2 = person.say2
        say() 不会自动填充this (this=window)
        say2() 自动填充 this
        // person.say()   person.say2() this为调用者 

    原型链问题
        Function | class
        new Person() new出来的对象 无原型   (new Person().prototype == undefined)
    

继承 | 扩展
    es5
        Object_JS_Func 继承
        Object.js 解释

    es6  对之前的进行了修改包装
        class Sub extends Sup {}
        继承语句同时存在两条继承链：一条实现属性继承，一条实现方法继承。
            Sub.__proto__ === Sup;  //继承属性
            Sub.prototype.__proto__ === Sup.prototype;  //继承方法 编译的 _get(xxx,00)

        子类的__proto__指向父类   Sub.__proto__ = Sup
        子类的原型的__proto__     Sub.prototype.__proto__ = Sup.prototype   ()

        class ColorPoint extends Point {
            constructor(x, y, color) {
              super(x, y); // 等同于Point.prototype.constructor(x, y)
              /***
               *    super 当做函数 super()
               *    Point.prototypr.constructor.call(this,..)
               */
              this.color = color;
            }
            toString() {
                /***
                 *  super 当真对象
                 *  super== Point.prototype
                 */
              return this.color + ' ' + super.toString(); // 等同于parent.toString()
            }
        }

    class - Function












class Animation{
    constructor(){

    }
    say(){
        console.log("AAAA-a",this)
    }
}
class Person extends Animation{
    constructor(){
        super()
        this.name = "AAA"
    }
    eat(){
        console.log("AAAA-a",this.name)
      }
    say(){
        super.say()
        this.eat()
    }
}

编译

var _createClass = function () { 
    function defineProperties(target, props) { 
        for (var i = 0; i < props.length; i++) { 
            var descriptor = props[i]; 
            descriptor.enumerable = descriptor.enumerable || false; 
            descriptor.configurable = true; 
            if ("value" in descriptor) 
                descriptor.writable = true; 
            //附加到原型上
            Object.defineProperty(target, descriptor.key, descriptor); 
        }
    } 
    return function (Constructor, protoProps, staticProps) { 
        if (protoProps) 
            defineProperties(Constructor.prototype, protoProps); 
        if (staticProps) 
            defineProperties(Constructor, staticProps); 
        return Constructor; 
    }; 
}();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { 
  if (!self) { 
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  } 
  return call && ((typeof call === "object" || typeof call === "function") ? call : self); 
}

function _inherits(subClass, superClass) { 
  if (typeof superClass !== "function" && superClass !== null) { 
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); 
  } 
  //子类的 subClass.prototype = superClass.prototype + { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }
  /***
   *    Person.prototype = new Animation()
   *    Person.prototype.constructor = Person
   *    
   *    subClass.prototype.
   *        __proto__ = Sup.prototype 
   *        constructor = subClass
   *        
   */
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); 
  if (superClass) 
    /***
     *  subClass.__proto__ = superClass; 
     */
    Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; 
}
// 继承链上得到对应方法 再进行调用
/**
 * object == SupClassFunc
 * property 方法名
 * receiver this
*/
var _get = function get(object, property, receiver) { 
    if (object === null) 
        object = Function.prototype; 
    //父类  实例属性中查找
    var desc = Object.getOwnPropertyDescriptor(object, property); 
    //实例属性中找不到  再原型链中查找
    if (desc === undefined) { 
        
        var parent = Object.getPrototypeOf(object);
        if (parent === null) { 
            return undefined; 
        } else { 
            return get(parent, property, receiver); 
        } 
    } else if ("value" in desc) { 
        // 得到方法
        return desc.value;
    } else { 
        var getter = desc.get; 
        if (getter === undefined) { 
            return undefined; 
        } 
        return getter.call(receiver); 
    } 
};
    
var Animation = function () {
    function Animation() {
        _classCallCheck(this, Animation);
    }

    _createClass(Animation, [{
        key: "say",
        value: function say() {
        console.log("AAAA-a", this);
        }
    }]);

    return Animation;
}();

var Person = function (_Animation) {
    /***
        Person.__proto__ === Animation; 
        Person.prototype.__proto__ === Animation.prototype; 
     */
    _inherits(Person, _Animation);

    function Person() {

        _classCallCheck(this, Person);

        /**
         * 调用父类
         * var _this = SupClass.call(this,...)
         * 
         */
        var call = (Person.__proto__ || Object.getPrototypeOf(Person)).call(this)
        /**
         *  _this7 = call
         */
        var _this7 = _possibleConstructorReturn(this, call);

        _this7.name = "AAA";
        return _this7;
    }
    //附加在原型链上
    _createClass(Person, [{
        key: "eat",
        value: function eat() {
          console.log("AAAA-a", this.name);
        }
      },{
        key: "say",
        value: function say() {
            //Animation原型 或者Person原型
            //super
            var pro = Person.prototype.__proto__ || Object.getPrototypeOf(Person.prototype)
            //super.say()
            _get(pro, "say", this).call(this);
        }
    }]);

    return Person;
}(Animation);