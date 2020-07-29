### 实现（简易版）

```javascript
function resetViewportScale() {
  var viewportMeta = document.querySelector("meta[name='viewport']");

  var dpr = window.devicePixelRatio;
  var scale = 1 / dpr;

  document.querySelector("html").style.fontSize = 100 * dpr + "px";

  if (viewportMeta) {
    viewportMeta.content =
      "initial-scale=" +
      scale +
      ", maximum-scale=" +
      scale +
      ", minimum-scale=" +
      scale +
      ", user-scalable=no";
  } else {
    var metaDom = document.createElement("meta");
    metaDom.name = "viewport";
    metaDom.content =
      "initial-scale=" +
      scale +
      ", maximum-scale=" +
      scale +
      ", minimum-scale=" +
      scale +
      ", user-scalable=no";

    document.getElementsByTagName("head")[0].append(metaDom);
  }
}
```
