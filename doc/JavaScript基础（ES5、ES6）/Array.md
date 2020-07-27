# Array

### Array.prototype.flat()

>- 扁平化嵌套数据
>- 扁平化数组并清除数组空项

```javascript
var newArray = arr.flat([depth])

var arr = [1,2,[3,4]];
arr.flat(2); // [1,2,3,4]
```
> ECMAScript 2019

### Array.prototype.reduce()

> 方法对数组中的每个元素执行一个由您提供的reducer函数(升序执行)，将其结果汇总为单个返回值。

### Array.prototype.some()

> 方法测试数组中是不是至少有1个元素通过了被提供的函数测试。它返回的是一个Boolean类型的值。

```javascript
const array = [1, 2, 3, 4, 5];

// checks whether an element is even
const even = (element) => element % 2 === 0;

console.log(array.some(even));
// expected output: true
```