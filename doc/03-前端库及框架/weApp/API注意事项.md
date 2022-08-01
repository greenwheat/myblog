

#### 异步API的Promise风格调用

基础库2.10.2起，异步API支持`callback`和`promise`两种调用方式。

示例：

```javascript
// callback 形式调用
wx.chooseImage({
  success(res) {
    console.log('res:', res)
  }
})

// promise 形式调用
wx.chooseImage().then(res => console.log('res: ', res))

```

##### 注意事项：







#### 属性：wx.env

值：`{USER_DATA_PATH: string}`

实例：

本地开发时值为`{USER_DATA_PATH: "http://usr"}`

真机上值为`{USER_DATA_PATH: "wxfile://usr"}`



#### api的回调success、fail、complete

success/fail的回调同步执行完成后再会走到complete方法里，但success/fail里的异步代码不会阻塞complete的执行



#### web-view中的页面判断当前是否小程序环境

方案一：通过userAgent，从微信7.0.0版本（2018.12.21发版）开始

```javascript
// 小程序web-view环境下
navigator.useAgent.toLowerCase().match(/miniprogram/i) == "miniprogram"; // true
```

方案二：通过小程度的全局变量`window.__wxjs_environment`，需要在`WeixinJSBridgeReady`回调中使用

```javascript
// web-view下的页面
function ready(){
  if(window.__wxjs_environment === "miniprogram"){
    // do Something...
  } else {
    // do else...
  }
}

if(!window.WeixinJSBridge || !WeixinJSBridge.invoke) {
  document.addEventListener("WeixinJSBridgeReady", ready, false)
} else {
  ready()
}
```



