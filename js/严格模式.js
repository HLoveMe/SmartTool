
1:"use strict"

2:使用

    <script>
　　　　"use strict";
　　　　console.log("这是严格模式。");
　　</script>

    function strict(){
    　　　"use strict";
    　　　return "这是严格模式。";
    }

影响
    1：变量必须声明
        非严格模式  name = 1;
        严格模式下  var name = 1; 必须声明

    2：delete 必须是可编辑的属性

    3：保留关键字
        implements, interface, let, package, private, protected, public, static, yield

    4：this不容许指向window (严格模式下)
        function test1(){
            return !this
        }
        test1() ==>false

        function test2(){
            "use strict"
            return !this
        }
        test2() ==>true (!undefined)
    
    5:属性不能重复赋值
        {
            name:1,
            name:2 非严格模式 name=2 | 严格模式下报错
        }

    6:函数和参数
        function abcd(a,a,b="aaa"){
            1:非严格模式下 a为第二个参数
            2:严格模式下 报错

            b = "bbb"
            
            1:非严格模式下 b的值会影响arguments   arguments[2]//bbb    
            2:严格模式下  b的赋值不会影响arguments arguments[2]//aaa    


        }