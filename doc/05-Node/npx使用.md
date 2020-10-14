# npx 使用

### 调用项目内部安装的模块

在使用某些 npm 工具时，如 tsc，在需要使用局部安装的 node_modules 时，需要这样：

```bash
# 项目的根目录下执行
$ node_modules/.bin/tsc --version
```

但如果使用 npx 就简单很多，可以直接：

```bash
npx tsc --version
```

npx 的原理很简单，就是运行的时候，会到 node_modules/.bin 路径和环境变量\$PATH 里面，检查命令是否存在。

```bash
# 运行的是全局模块
$ tsc --version               
Version 3.7.4

# 运行的是项目内部模块
$ npx tsc --version
Version 4.0.3
```


### 避免全局安装模块

例如：

```bash
$ npx create-react-app my-react-app
```

上面代码运行时，npx 将 create-react-app 下载到一个临时目录，使用以后再删除。所以，以后再次执行上面的命令，会重新下载 create-react-app。
