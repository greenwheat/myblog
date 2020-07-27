## 预解释
> **预解释**

> 在当前作用域下，JS代码执行之前，首先会把带`var`和`function`关键字的变量进行提前声明(declare)或者定义(define)。
> `var`只是提前声明，`function`是提前的声明+定义都完成了

-----------------------------

**1\. 不管条件是否成立都要进行预解释**
````javascript
    if(!('a' in window)){
        var a = 12;
    }
    console.log(a); //-> undefined
````
**2\. 只对“=”左边的进行预解释，右边的不进行预解释，当执行代码到这一行时，再进行赋值运算。**
````javascript
    fn1(); //-> 输出1
    function fn1(){console.log(1);}
    fn1(); //-> 输出1

    fn2(); //-> undefined
    var fn2 = function(){console.log(2);}
    fn2(); //-> 输出2
````
> **<span style='display:inline-block;background:yellow;border:1px solid black;color:black;padding:5px;'>\>Tips</span>** *在项目中，我们一般用函数表达式的方式定义函数，就是想让它在上面定义，并且只能在下面执行，避免混乱。*

**3\. 自执行函数不进行预解释**
```javascript
    // window下预解释时不会声明和定义自执行函数move
    (function move(){
        // 执行的时候在函数内形成的私有作用域中进行预解释
        window.setTimeout(move,10);
        //window.setTimeout(arguments.callee,10);
        // 一般情况下不使用arguments.callee，因为在严格模式(“use strict”)下屏蔽了它的使用
    })();
```
```javascript
    var fn = function(num){
        arguments[0] = 12; //-> 把第一个传递进来的参数值修改为了12，在非严格模式下可以映射到我们的num形参上，使num = 12；在严格模式下不会和形参产生映射
    };
```
> **<span style='display:inline-block;background:yellow;border:1px solid black;color:black;padding:5px;'>\>Tips</span>** *严格模式在JS代码最顶端的位置，我们写上`"use strict";`这样的话我们接下来的代码就都要使用严格模式了
 严格模式下，`caller`、`callee`、`arguments`属性也许将不可访问，也不能通过`arguments`对象调用他们。*
<br/> **<span style='display:inline-block;background:red;border:1px solid black;color:black;padding:5px;'>\>Warning</span>** *JS中，函数的参数是 **按值传参** 的，不是按变量，如果传递的参数是基本数据类型，那么当函数内形参值改变时，不会影响源变量的值。如果传递的参数是引用数据类型，那么要看是否开辟了新的堆内存。*

````javascript
    var arr = [1,2,3];
    (function(a){
       a[0] = 100;
        console.log(arr); //-> [100,2,3]形参a和全局变量arr指向同一内存
        a = [];
        a[0] = 200;
        console.log(arr); //-> [100,2,3]形参a已经指向了新的内存，因此改变a不会影响arr
        console.log(a); //-> [200]
    })(arr);
````

**4\. 函数执行形成的私有作用域的预解释**

```javascript
    var fn = function(){
       // step 1: 给形参赋值
       // step 2: 预解释
       // step 3: 代码从上到下依次执行
        return function(){}; // 返回值，return右边的var和function不参与预解释，如果返回的是引用数据类型，则会开辟一个堆内存返回一个地址
        var num = 12;
    };
    fn(); // step 4: 执行完毕后，如无特殊情况，私有作用域将会被销毁
```
**5\. 不重复声明，但会重复定义**

````javascript
    fn(); //step4: 输出2
    function fn(){alert(1);} //step1:声明并定义fn
    fn(); // step5: 输出2
    var fn = 13; //step2：var fn不再重复声明  //step6: 赋值fn=13
    fn(); //step7: 相当于‘13()’，Error: fn is not a function
    function fn(){alert(2);} //step3: 重新定义fn
````
--------------------------------
## 作用域

**1\. 作用域**

- **`window`全局作用域(顶级作用域)**：页面关掉的时候才会被销毁
- **私有作用域**：函数执行时形成，执行完毕销毁

> **<span style='display:inline-block;background:yellow;border:1px solid black;color:black;padding:5px;'>\>Tips</span>** *函数在执行时，形成一个私有作用域，外界无法访问和修改私有变量，这种保护机制叫做“闭包”。*

**2\. JS中的内存分类**

- **栈内存**：提供代码执行环境的（如全局作用域、私有作用域）
- **堆内存**：保存具体数据的，如存储对象的键值对、函数的函数体，即引用空间

**3\. 全局变量和私有变量**

- **全局变量**：是在全局作用域下声明的变量
- **私有变量**：是在私有作用域下声明的变量（包括`var`、`function`、形参）

**4\. 作用域查找机制**

代码执行中，在查找变量时，会先在自己的作用域中查找，看有没有形参、带`var`或`function`的，如果没有，就再逐级向上查找，直到`window`对象（顶级作用域）。

**5\. 作用域销毁**

> 一般情况下，函数执行形成的私有作用域，当执行完成后就销毁了。

- 1\) 作用域不立即销毁

````javascript
    function fn(){
        var i = 10;
        return function(n){
            console.log(n+i++);
        }
    }
fn()(15); //先执行fn，有一个私有的变量i=10，返回一个堆内存地址xxxfff000，我们发现这个地址还要用到一次，那么当前的这个fn执行时形成的私有作用域(A)就不能立即销毁了，xxxfff000(15)->输出25，A中的i变成11，当xxxfff000执行完了，发现这个地址没用了，浏览器就会把A、xxxfff000都释放掉。
fn()(20); //在执行fn时又会重新形成另一私有作用域，与上一行代码之间互相独立->输出30
````
- 2\) 作用域不销毁

````javascript
    function fn(){
        var i = 10;
        return function(n){
            console.log(n+i++);
        }
    }
    var f = fn(); //先执行fn，形成一个私有作用域(A)，将返回的函数的堆内存地址xxxfff111赋值给了外部变量f，此时fn执行的私有作用域(A)将不会销毁
    f(15); // xxxfff111(15)，形成另一个私有作用域(B)，形参赋值n=15，执行代码，发现变量i，通过作用域查找机制，找到上级作用域(A)中的i，因此输出25，i变为11
    f(20); // xxxfff111(15)，形成另一个私有作用域(C)，形参赋值n=20，执行代码，发现变量i，通过作用域查找机制，找到上级作用域(A)中的i，此时i经过上一步计算已经变成11，因此输出31，i变为12
````
> **<span style='display:inline-block;background:yellow;border:1px solid black;color:black;padding:5px;'>\>Tips</span>** *如果我们知道f已经失去作用，为了优化性能，应当将f=null，这样的话(A)和xxxfff111没有了外部引用，浏览器会在空闲时对其进行‘垃圾回收’，否则(A)和xxxfff111将一起被占用，无法释放内存。*

**6\. 几种构建不销毁作用域的常用形式**

- 1\) 函数执行，返回一个引用数据类型的值，并将其赋值给外部变量，那么当前函数形成的私有作用域就不再销毁，例如*5-2*)。

- 2\) 函数A执行，将内部定义的函数B绑定给了DOM元素的事件C，那么当前函数B也相当于被外部占用了，函数A执行形成的作用域也不会销毁了

````javascript
    // e.g. 选项卡循环绑定点击事件，每一次循环，自执行函数都会形成一个私有作用域（一共形成oLis.length个），在每一个私有作用域中，都把里面定义的函数绑定给了外面元素的点击事件，这们的话每一次形成的作用域都不销毁了（有oLis.length个不销毁的作用域）
    var oLis = document.getElementsByTagName("li");
    for(var i=0;i<oLis.length;i++){
        ~function(index){
            oLis.item(index).onclick=function(){
                tabChange(index);
            };
        }(i);
    }
````
- 3\) 在使用`setTimeout`实现轮询动画的时候，如果`move`需要传参，那么像下面这样的写法会形成很多嵌套的不销毁的作用域，非常耗性能

````javascript
function move(tar){
    <!--javascript code-->
    //window.setTimeout(move,10); ->这样第二次运行的时候没有传递参数
    window.setTimeout(function(){
        move(tar);
    },10); //-> 这样可以实现，但是每一次执行定时器都会形成一个私有的作用域（匿名函数形成的）A，在A中使用了上级作用域中的tar的值，而且执行了move又形成了一个小的作用域（而在小的作用域中会使用tar的值），这样每一次定时器形成的A都不能销毁了
}
move(100); //-> 第一次执行传递100
````
**7\. 内存空间的释放/回收**

> 一般地，堆内存在没有变量或对象属性占用或引用后，栈内存在代码执行完毕后、内部定义的变量没有被外部占用时，浏览器会将其回收释放。

*【谷歌浏览器】* 间隔一段时间检查动态开辟的内存是否被占用，没有被占用的内存将会被回收；

*【火狐&IE】* 计数器`counter`方式，当内存被占用一次，`counter++`；当引用减少一次，`counter--`。当`counter==0`时，浏览器将内存释放；但是有些情况下（尤其是IE）`counter`的计算会出现混乱，内存无法释放。

## THIS
- this的