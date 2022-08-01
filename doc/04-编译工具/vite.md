

### 新建项目

```bash 
#使用 NPM:
npm init vite@latest

#使用 Yarn:
yarn create vite
```

vite社区提供了很多基本模板，也可以使用这些模板启动一个新项目

```bash 
npx degit user/project my-project
cd my-project

npm install
npm run dev
```

(模板地址)[!https://github.com/vitejs/awesome-vite#templates]





### vite兼容低版本浏览器

使用esBuild

浏览器兼容性：默认仅支持现代浏览器，目标浏览器为支持原生ESM脚本标签和原生ESM动态引入的浏览器，参考

`defaults and supports es6-module and supports es6-module-dynamic-import, not opera > 0, not samsung > 0, not and_qq > 0`

可以指定目标浏览器版本，在vite.config.js中的build.target里设置，但最低版本是es2015。。。

要兼容旧版浏览器，则需要使用@vitejs/plugin-legacy插件

安装方法：

```base
$ npm i -D @vitejs/plugin-legacy
```

```javascript
// vite.config.js
import legacy from '@vitejs/plugin-legacy'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    legacy({
      targets: ['defaults', 'not IE 11']
    })
  ]
})
```

https://github.com/browserslist/browserslist#best-practices



### vite环境变量

defineConfig的函数参数注入了两个参数：command和mode。

```javascript
export default defineConfig(({ command, mode }) => {})
```

command为dev时，默认mode是development；build时，默认mode是production

可以通过--mode <name>来指定其他mode

根目录下可新建.env.[mode]，来区分不同环境下的变量，例如：

```
# .env.development
VITE_APP_TITLE=测试
VITE_BASE_PATH=/vite-test/

# .env.development
VITE_APP_TITLE=生产
VITE_BASE_PATH=/aaaa/bbbb/vite-test/
```

在vite.config.ts中使用环境变量：

```typescript
import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ command, mode }) => {
  const config = {
    base: loadEnv(mode, process.cwd()).VITE_BASE_PATH
    // ... 其他配置项
  }
  return config;
})
```

在其他位置使用环境变量：

```typescript
// main.ts
document.title = String(import.meta.env.VITE_APP_TITLE) || "";
```





### 安装scss

```bash 
npm install --save-dev sass
```

不再需要安装`sass-loader`、`node-sass`



### 安装vuex、vue-router

vue3的vuex、vue-router均要使用4.x的版本，命令如下：

```bash
npm install --save-dev vuex@4
npm install --save-dev vue-router@4
```
