# 解决 1px 的问题

### 为什么会有 1px 的问题

对于 Retina 屏幕，其物理像素和 CSS 像素（或设备独立像素）并不是 1 对 1 的换算方式，这样就会导致 CSS 设置的

```scss
border: 1px solid #eee;
```

在很多的手机移动端中会视觉上变粗。

Retina 屏幕有一个参数为设备像素比 DPR（device pixel ratio），它定义了手机屏幕的物理像素和设备独立像素的比：

```
  设备像素比 = 物理像素 / 设备独立像素
```

简单地来说，如果手机的 DPR=2，那就是 1 个设备独立像素对应着 4 个物理像素。

### 解决 1px 的几种方案

没有被设计师追着改过 1px 问题的前端开发不是一个好的外卖骑手～

略过一些储如 `box-shadow`、`background gradient` 的视觉欺骗的方案，希望记录几个实际中用过的方案。

#### 1、viewport + rem/vw

按照设备比的不同，在 meta 里设置不同的 viewport 比率。

当 `devicePixelRatio`=2，设置为：

```html
<meta
  name="viewport"
  content="initial-scale=0.5, maximum-scale=0.5, minimum-scale=0.5, user-scalable=no"
/>
```

当`devicePixelRatio`=3，设置为：

```html
<meta
  name="viewport"
  content="initial-scale=0.3333333333333333, maximum-scale=0.3333333333333333, minimum-scale=0.3333333333333333, user-scalable=no"
/>
```

这样在样式里可以直接写 1px，显示的也会是 1px。

但这种方式，意味着整个 web 应用的样式都要与之匹配。如果是在已有项目上改造，影响范围为全局，可能成本会比较大。比较适合新项目（另，关于使用 viewport+rem/vw 的移动端适配方案详细见[这里](./使用viewport+rem或vw的移动端适配方案.md)）。

#### 2、伪类 + transform

```scss
.jrm-border-1px {
  position: relative;
}

.jrm-border-1px:before {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 0;
  display: block;
  visibility: visible;
  overflow: auto;
  content: "";
  -webkit-transform: scale(1);
  transform: scale(1);
  -webkit-transform-origin: 0 0;
  transform-origin: 0 0;
  pointer-events: none;

  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
}

@media only screen and (-webkit-min-device-pixel-ratio: 2) {
  .jrm-border-1px:before {
    right: -100%;
    bottom: -100%;
    -webkit-transform: scale(0.5);
    transform: scale(0.5);
  }
}

@media only screen and (-webkit-min-device-pixel-ratio: 3) {
  .jrm-border-1px:before {
    right: -200%;
    bottom: -200%;
    -webkit-transform: scale(0.333333);
    transform: scale(0.333333);
  }
}
.jrm-border-1px {
  &.jrm-border-all:before {
    border: 1px solid #eee;
  }

  &.jrm-border-top:before {
    border-top: 1px solid #eee;
  }

  &.jrm-border-bottom:before {
    border-bottom: 1px solid #eee;
  }

  &.jrm-border-left:before {
    border-left: 1px solid #eee;
  }

  &.jrm-border-right:before {
    border-right: 1px solid #eee;
  }
}
```

这样能解决大多数情况下的1px边框问题，但会有几个问题：

- 注意设置边框的元素是否已经设置了伪类，可以通过加层嵌套解决；
- 设置圆角border-radius，需要设置在伪类中，且需要对不同的dpr做媒体查询适配；