## VUE3.0

### 新特性

- [组合式 API](https://v3.cn.vuejs.org/guide/composition-api-introduction.html)
- [Teleport](https://v3.cn.vuejs.org/guide/teleport.html)
- [片段](https://v3.cn.vuejs.org/guide/migration/fragments.html)
- [触发组件选项](https://v3.cn.vuejs.org/guide/component-custom-events.html)
- [来自 `@vue/runtime-core` 的 `createRenderer` API](https://github.com/vuejs/vue-next/tree/master/packages/runtime-core) 创建自定义渲染器
- [单文件组件组合式 API 语法糖 (``)](https://github.com/vuejs/rfcs/blob/sfc-improvements/active-rfcs/0000-sfc-script-setup.md) <font size="2" color="red">实验性</font>
- [单文件组件状态驱动的 CSS 变量 (``)](https://github.com/vuejs/rfcs/blob/sfc-improvements/active-rfcs/0000-sfc-style-variables.md) <font size="2" color="red">实验性</font>
- [单文件组件 `` 现在可以包含全局规则或只针对插槽内容的规则](https://github.com/vuejs/rfcs/blob/master/active-rfcs/0023-scoped-styles-changes.md)



#### 一、创建项目

使用 vite2 + vue3

版本要求：

> 保证node.js版本>=12.0.0

>  "@vitejs/plugin-vue": "1.2.1" 依赖@vue/compiler-sfc版本^3.0.6
>
> @vue/compiler-sfc 3.0.6 依赖 vue版本^3.0.6

> 与vue3相匹配的是vue-router 4和vuex 4版本







#### 二、与2.x的不同之处

##### 1. 模板

2.x只允许一个根节点，3.x可以多个根节点，但需要显式指明由父组件传递的$attr（指非prop的属性，如class、id、data-）要添加到哪个根节点上

```vue
<template>
	<header>{{title}}</header>
	<section v-bind="$attrs"></section>
	<footer></footer>
</template>
```



##### 2. v-model

明确了双向绑定的API，即v-model

- v-bind.sync修饰符已移除，替换为v-model。2.x时，v-model默认在props里添加modelValue属性，并可通过update:modelValue来修改；
- v-model不再与dom的value属性相关联；
- 可通过v-model:property1自定义prop，组件内通过update:property1来修改；

- v-model，2.x只允许组件上使用一个，3.x可以添加多个；

- 增加了v-model修饰符