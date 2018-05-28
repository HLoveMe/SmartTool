
es6 新增
    1:是第7个基础（表示独一无二）
        null,underfined,number,boolean,string,object,Symbol

    2:由于是基础数据创建不能使用new
        static方法
            let sy1 = Symbol()  会返回不同对象
            let sy2 = Symbol("desction")   会返回不同对象 仅仅作为标识 用作标记调试
            let sy3 = Symbol.for("key") 会返回同一对象

            let s = Symbol.for("脚本之家");
            console.log(Symbol.keyFor(s));

        static属性
        Symbol.iterator
                代表 iterator 标识
                    var arr = [1,3,4]
                    arr[Symbol.iterator]  得到迭代器方法

                    let ite = arr[Symbol.iterator]() 得到并执行
                    ite.next()....

                申明(替换)对应的迭代器方法 当你调用forin 系统会调用你 申明(替换）的方法

            Symbol.hasInstance
            Symbol.isConcatSpreadable
            Symbol.iterator
            Symbol.match
            Symbol.prototype
            Symbol.replace 替换行为
            Symbol.search 
            Symbol.species
            Symbol.split
            Symbol.toPrimitive
            Symbol.toStringTag
            Symbol.unscopables
    
    3:Symbol 
        对象有点类似string 可以作为属性key

        let target = {}
        let sy1 = Symbol("one property")
        target[sy1] = "NNNN"
        console.log(target[sy1])

        > 不能使用.语法得到Symbol键的值 
        > 会被forin Object.keys Object.getOwnPropertyNames 忽略
        > Object.getOwnPropertySymbols(xx) 得到 忽略系统内置Symbol


枚举
    const MessageType = {
        TextMessage:"TextMessage" ==> TextMessage:Symbol()
    }

私有变量
    var o = {
        val: 10,
        [ Symbol("random") ]: "I'm a symbol",
    }; 

    class Person{
        let _pri = Symbol()
        constructor(){
            this[Symbol.for("private")] = "AA"
            this[this._pri] = ""
        }
        AA(){
            return this[Symbol.for("private")]
            return this[this._pri]
        }
    }

申明 | 替换
    string.replace 系统方法
        replace(searchValue: { [Symbol.replace](string: string, replaceValue: string): string; }, replaceValue: string): string;
            "ABCD".replace(source,"00")
                会调用source的[Symbol.replace] 接受 "ABCD" 和 "00" 返回结果  并作为最终结果  

    申明行为
        var ABCD = {
            [Symbol.replace](a,b){
                return a + "_" + b
            }
        }
        "AB".replace(ABCD,"CD")   => "AB_CD"

    替换
        var myIterable = {};
        myIterable[Symbol.iterator] = function* () {
            yield 1;
            yield 2;
            yield 3;
        };
        console.log([...myIterable]); // [1, 2, 3]
