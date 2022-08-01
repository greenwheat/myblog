# VS Code

### 1. VS 调试在 PATH 上找不到运行时“node”。是否已安装“node”?

> 解决方案：在首次配置了 launch.json 后 Run 如果提示这个，可以尝试重新启动 vscode。

### 2. node 调试使用的 launch.json 示例

```json
{
  // 使用 IntelliSense 了解相关属性。
  // 悬停以查看现有属性的描述。
  // 欲了解更多信息，请访问: https://go.microsoft.com/fwlink/?linkid=830387
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Run hello.js",
      "skipFiles": ["<node_internals>/**"],
      "program": "${workspaceFolder}/js/hello.js",
      "stopOnEntry": false,
      "args": [],
      "cwd": "${workspaceRoot}",
      "preLaunchTask": null,
      "runtimeExecutable": null,
      "runtimeArgs": ["--nolazy"],
      "env": {
        "NODE_ENV": "development"
      },
      "console": "internalConsole",
      "sourceMaps": false,
      "outFiles": ["${workspaceFolder}/dist/.js"]
    }
  ]
}
```

### 3. 在调试台中运行的时候，如果控制台里查看打印的变量详情，会提示 No debug adapter, can not send 'variables' / 无调试适配器，无法发送"variables"

> 解决方案：在代码里打个断点，就能捕获到了

### 4. 今天往 setting.json 里加了个 prettier 的配置，结果所有文件都打不开了。。。Onz 可以通过清除所有的 setting 和 config 来重置配置项

```bash
   sudo rm -rf \$HOME/Library/Application\ Support/Code
```

### 5. 另外在此记录下卸载 vscode 的步骤。

- 记录下你所有的扩展插件（没有导出的方法，我是截屏）和自定义的 setting（JSON）；
- 退出 vscode
- 清除所有 setting 和 config

```
  sudo rm -rf $HOME/Library/Application\ Support/Code  
                
  // if you're using insider*                                       
  sudo rm -rf $HOME/Library/Application\ Support/Code\ -\ Insiders/
```

- 删除所有的扩展插件（extensions）

```
  sudo rm -rf $HOME/.vscode                

  // if you're using insider*                                                              
  sudo rm -rf $HOME/.vscode-insiders/
```

- 这时，你就可以从应用程序里删除 vscode 了
- 下载并重新安装（为啥这么费劲）
  
  > 翻译自：https://medium.com/@jimkang/complete-uninstall-remove-vscode-mac-5e48bef3bdec



### 6. VSCode的snippets中的一些变量

例如:

  TM_SELECTED_TEXT The currently selected text or the empty string 当前被选中的文字或空串
  TM_CURRENT_LINE The contents of the current line 当前一行的内容
  TM_CURRENT_WORD The contents of the word under cursor or the empty string 光标选中的字符内容或空串
  TM_LINE_INDEX The zero-index based line number 
  TM_LINE_NUMBER The one-index based line number
  TM_FILENAME The filename of the current document
  TM_FILENAME_BASE The filename of the current document without its extensions
  TM_DIRECTORY The directory of the current document
  TM_FILEPATH The full file path of the current document
  CLIPBOARD The contents of your clipboard
  WORKSPACE_NAME The name of the opened workspace or folder

可以插入当前日期和时间:

  CURRENT_YEAR The current year
  CURRENT_YEAR_SHORT The current year’s last two digits
  CURRENT_MONTH The month as two digits (example ‘02’)
  CURRENT_MONTH_NAME The full name of the month (example ‘July’)
  CURRENT_MONTH_NAME_SHORT The short name of the month (example ‘Jul’)
  CURRENT_DATE The day of the month
  CURRENT_DAY_NAME The name of day (example ‘Monday’)
  CURRENT_DAY_NAME_SHORT The short name of the day (example ‘Mon’)
  CURRENT_HOUR The current hour in 24-hour clock format
  CURRENT_MINUTE The current minute
  CURRENT_SECOND The current second

For inserting line or block comments, honoring the current language:

  BLOCK_COMMENT_START Example output: in PHP /* or in HTML <!–
  BLOCK_COMMENT_END Example output: in PHP */ or in HTML -->
  LINE_COMMENT Example output: in PHP // or in HTML <!-- -->

