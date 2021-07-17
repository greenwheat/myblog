



Vite

开发



打包

使用esBuild

浏览器兼容性：默认仅支持现代浏览器，目标浏览器为支持原生ESM脚本标签和原生ESM动态引入的浏览器，参考

`defaults and supports es6-module and supports es6-module-dynamic-import, not opera > 0, not samsung > 0, not and_qq > 0`

可以指定目标浏览器版本，在vite.config.js中的build.target里设置，但最低版本是es2015。。。

要兼容旧版浏览器，则需要安装一个插件：[@vitejs/plugin-legacy](https://github.com/vitejs/vite/tree/main/packages/plugin-legacy)

