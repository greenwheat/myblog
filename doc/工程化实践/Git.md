# Git及Github

## 常用命令

#### 1. 从 `remote` 分支拉取更新到本地时，使用`git pull -- rebase`。

#### 2. 当完成 `bug` 修复或新功能时，使用 `merge` 将子分支合并到主分支。

#### 3. 撤销某次commit

```bash
  git revert <commit id>
```

即可，git 会生成一个新的 commit，将指定的 commit 内容


#### 4. 设置提交远程分支

```bash
  git push --set-upstream origin dev_btgold_credit_repay
```

#### 5. 清除trace(解决:尽管已经在 ignore 列表里,依然 会被 git trace 到每个文件的变化) 

```bash
  git rm -r --cached .
```

#### 6. 查看单个文件的修改记录 

```bash
  git log -p [文件路径] 
```

#### 7. 放弃本地修改: 

- `git checkout .` #本地所有修改的。没有的提交的，都返回到原来的 状态
- `git stash` #把所有没有提交的修改暂存到`stash`里面。可用`git stash pop`恢复。 
- `git reset --hard HASH` #返回到某个节点，不保留修改。 
- `git reset --soft HASH` #返回到某个节点。保留修改 
- `git clean -df` #返回到某个节点
> `git clean` 参数:
>- `-n`  显示将要删除的文件和目录 
>- `-f` 删除文件
>- `-df`  删除文件和目录 

也可以使用: 
```bash
   git checkout . && git clean -xdf
```

#### 8. 保存账号密码 
   git config --global credential.helper store

#### 9. 删除本地分支: 

```bash
   git branch -D BranchName
```

其中`-D`也可以是`--delete`，如:
```bash
  git branch --delete BranchName 
```

#### 10. 删除本地的远程分支: 
```bash
   git branch -r -D origin/BranchName
```

#### 11. 远程删除git服务器上的分支: 

```bash
   git push origin -d BranchName
```

其中`-d`也可以是`--delete`，如: 
```bash
   git push origin --delete BranchName
```

#### 12. 修改 下载仓库为淘宝镜像 

```bash
   npm config set registry http://registry.npm.taobao.org/
```

#### 13. 如果要发布自己的镜像需要修改回来 

```bash
   npm config set registry https://registry.npmjs.org/
```

#### 14. 安装cnpm 
```bash
   npm install -g cnpm --
   registry=https://registry.npm.taobao.org
```

## SSH-KEY配置（多Git账号）

