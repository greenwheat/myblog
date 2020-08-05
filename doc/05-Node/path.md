# path - 路径

## 常用属性或方法
|属性或方法名|描述|返回值|备注|
|-|-|-|-|
|path.join("path1/path2","path3",...)|拼接路径片段|规范化的路径||
|path.resolve([...paths])|将路径或路径片段的序列解析为绝对路径|绝对路径||
|path.basename("../path1/path2/index.html"); // index.html|返回 path 的最后一部分|||
|'foo/bar/baz'.split(path.sep);// 返回: ['foo', 'bar', 'baz']|提供平台特定的路径片段分隔符：Windows 上是 \。POSIX 上是 /。||||
