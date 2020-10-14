 # input隐藏文字或光标
 
```scss
color:transparent; //安卓实现全隐藏 iOS光标不能隐藏
caret-color: transparent;//加上上面样式 iOS全隐藏
background: transparent;
    
text-indent: -999em; 
margin-left: -100%; //实现隐藏 无法点击获取焦点
// 想获取焦点又要隐藏光标，可以加上
width: 200%;


text-indent: -999em; // 隐藏input文字
margin-left: -100%;// 隐藏input光标   
    
visibility: hidden; //实现隐藏 无法点击获取焦点
```

