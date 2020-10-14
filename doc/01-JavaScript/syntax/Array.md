# Array

### Array.prototype.flat()

> - 扁平化嵌套数据
> - 扁平化数组并清除数组空项

```javascript
var newArray = arr.flat([depth]);

var arr = [1, 2, [3, 4]];
arr.flat(2); // [1,2,3,4]
```

> ECMAScript 2019

### Array.prototype.reduce()

> 方法对数组中的每个元素执行一个由您提供的 reducer 函数(升序执行)，将其结果汇总为单个返回值。

```javascript
const arr = [1, 2, 3, 4];
const sum = arr.reduce((acc, cur) => acc + cur, 0); // 10
```

### Array.prototype.some()

> 测试数组中是不是至少有 1 个元素通过了被提供的函数测试。它返回的是一个 `Boolean` 类型的值。

```javascript
const array = [1, 2, 3, 4, 5];

// checks whether an element is even
const even = element => element % 2 === 0;

console.log(array.some(even));
// expected output: true
```

### Array.prototype.every()

> 测试数组中的所有元素是否都通过了指定函数的测试，返回一个 `Boolean` 类型的值。

```javascript
const isBelowThreshold = currentValue => currentValue < 40;

const array1 = [1, 30, 39, 29, 10, 13];

console.log(array1.every(isBelowThreshold));
// expected output: true
```

### Array.prototype.from()

> 将类数组转化为数组
