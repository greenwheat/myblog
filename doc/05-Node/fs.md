# fs - 文件系统

## fs.Dir类 - 目录流

|常用方法|描述|返回值|示例|
|-|-|-|-|
|fs.read(callback)|读取目录项，读不到返回null|||
|fs.readSync()|读取目录项，同步方法|返回:fsDirent或null|||

## fs.stat 和 fs.access

- fs.stat 获取文件的状态信息，如访问不到，回调中返回err
- fs.access 测试用户对文件的访问权限，包括是否存在和读写的权限

如果仅检查文件是否存在，没有其他操作，建议使用 fs.access() 。

不要在调用 fs.open()、 fs.readFile() 或 fs.writeFile() 之前使用 fs.access() 或 fs.stat() 检查文件的可访问性。 **这样做会引入竞态条件，因为其他进程可能会在两个调用之间更改文件的状态**。 而是，应该直接打开、读取或写入文件，并且当文件无法访问时处理引发的错误。