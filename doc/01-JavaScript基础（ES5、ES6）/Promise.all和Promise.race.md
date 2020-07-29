# Promise.all([ .. ])和Promise.race([ .. ])

两个Promise API的静态辅助函数，都是用来处理promise数组的，及多个promise的结果处理。两个函数的返回值仍然是一个promise，其resolve的参数由传入的promise数组决定。

### 比较

- Promise.all([ .. ])：传入的所有promise都完成，返回的promise才能完成，并在这个返回的promise中得到一个数组，其中包含的是传入的所有promise的结果值。但如果有任何一个promise失败，则返回的promise都会立即失败（抛弃其他promise的结果）。