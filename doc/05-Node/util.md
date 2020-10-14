# util （实用工具）

### util.promisify(original)

- original \<Function\>

传入一个遵循常见的错误优先的回调风格的函数（即以 (err, value) => ... 回调作为最后一个参数），并返回一个返回 promise 的版本。

示例：

```javascript
const access = util.promisify(fs.access);

async function exists(path) {
  try {
    await access(path);
    return true;
  } catch (e) {
    return false;
  }
}
```
