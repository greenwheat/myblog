# Promise.all([ .. ])和 Promise.race([ .. ])

两个 Promise API 的静态辅助函数，都是用来处理 promise 数组的，及多个 promise 的结果处理。两个函数的返回值仍然是一个 promise，其 resolve 的参数由传入的 promise 数组决定。

### 比较

- Promise.all([ .. ])：传入的所有 promise 都完成，返回的 promise 才能完成，并在这个返回的 promise 中得到一个数组，其中包含的是传入的所有 promise 的结果值。但如果有任何一个 promise 失败，则返回的 promise 都会立即失败（抛弃其他 promise 的结果）；

- Promise.race([ .. ])：顾名思义，是由传入的 promise 数组的跑的最快的决定返回的 promise 的结果。第一个有了结果（成功或失败），都将立即作为返回 promise 的结果。

### 示例

```javascript
const p1 = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("a");
    }, 2000);
  });
};
const p2 = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("b");
    }, 1000);
  });
};
const p3 = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("c");
    }, 3000);
  });
};

Promise.all([p1(), p2(), p3()]).then(args => {
  console.log(args);
});

Promise.race([p1(), p2(), p3()]).then(args => {
  console.log(args);
});
```

<details>
  <summary>打印结果（点击展开）</summary>
  <code>b</code>
  <br>
  <code>["a", "b", "c"]</code>
</details>

