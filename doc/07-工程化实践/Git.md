

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
   npm install -g cnpm --registry=https://registry.npm.taobao.org
```

#### 15 添加.gitignore无效

把某些目录或文件加入忽略规则，按照上述方法定义后发现并未生效，原因是.gitignore只能忽略那些原来没有被追踪的文件，如果某些文件已经被纳入了版本管理中，则修改.gitignore是无效的。那么解决方法就是先把本地缓存删除（改变成未被追踪状态），然后再提交：

```bash
git rm -r --cached .
git add .
git commit -m 'update .gitignore'
```



#### 16. 自定义多个远程仓库

查看下当前的远程仓库

```bash 
$ git remote -v
origin	git@git.jd.com:consumer-finance-jt/goldbullion.git (fetch)
origin	git@git.jd.com:consumer-finance-jt/goldbullion.git (push)
```

增加新的远程仓库

```bash
$ git remote add coding git@coding.jd.com:zhengli80/goldbullion.git
```

再看下此时的远程仓库配置

```bash 
$ git remote -v
coding	git@coding.jd.com:zhengli80/goldbullion.git (fetch)
coding	git@coding.jd.com:zhengli80/goldbullion.git (push)
origin	git@git.jd.com:consumer-finance-jt/goldbullion.git (fetch)
origin	git@git.jd.com:consumer-finance-jt/goldbullion.git (push)
```

当我们在提交代码时，可选择提交哪一个仓库

```bash 
# 提交coding
$ git push coding
# 提交初始仓库
$ git push origin
```

更换默认远程仓库

```bash 
# 移除原origin仓库
$ git remote rm origin
# 添加新远程仓库作为默认仓库
$ git remote add origin git@coding.jd.com:zhengli80/goldbullion.git
```

或者直接替换

```bash
$ git remote set-url origin git@coding.jd.com:consumer-finance-jt/goldbullion.git
```



#### 17、git 设置文件大小写敏感

- 方法一
命令设置Git大小写敏感：
git config core.ignorecase false

- 方法二
找到项目的 .git 文件夹（window默认是隐藏的，设置显示隐藏的项目即可出现） 下的 config 文件打开，将

​		ignorecase = true 设置成 ignorecase = false

​		即可

- 方法三
先删除文件，提交；
再添加进去，提交







## SSH-KEY配置（多Git账号）



**Git****管理多个****SSH****密钥，****Git****多帐号配置**

2017年04月06日 22:55:56

阅读数：10243

版权声明：转载必须注明本文转自严振杰的博客：[http://blog.yanzhenjie.com](http://blog.yanzhenjie.com/)

首先这篇文章适用于Windows和Linux的配置，本人没有条件去验证Mac，所以不确定是否可以，不过和Linux一样属于Unix系统，应该理论上都是可以的，如果有人实验了可以给我个反馈。

这段时间在Ubuntu上做开发，又一次发现命令是真好用，加上这段时间把服务器从Windows迁到CentOS，也渐渐习惯了Vim。

之前一直在Winodws下开发，开发中使用的版本管理工具是SVN和Git，不过都会使用Tortoise类似的客户端工具，对于Git多帐号的情况，它可以动态管理SSH-KEY。不顾我在在Ubuntu下开发时没有发现这样的工具，几个IDE也需要配置SSH，于是干脆用命令了，在配置多个SSH-KEY花了我一个多小时才搞定，中间也由于细节不熟悉浪费了点时间，现在仅仅做个记录，如果能帮到其它遇到同样问题的同学也就更棒了。

 

**SSH****之于****Git****的原理**

Git提交时有Https和SSH两种验证方式，Https的方式需要帐号和密码比较好理解，不过它需要在每次提交时输入帐号和密码，有点麻烦；而SSH的功能可以粗暴的理解为记住帐号密码，不过对这个过程有人会有点疑惑。首先，我们用SSH命令生成一个公钥-私钥对，我们会把公钥添加到Git的服务器，把私钥放在本地。提交文件的时候Git服务器会用公钥和客户端提交私钥做验证（具体细节不究），如果验证通过则提交成功，那么我们在把公钥添加到服务器的时候肯定是需要登录Git服务器的，这个过程其实可以理解为帐号和密码托管给SSH了，所以也是相当于输入了帐号密码，但是由SSH帮你记住了。这么理解是可以，但是SSH的意义不仅仅是这样，关于SSH的更详细内容看客可以自行再了解。

**生成****SSH-KEY**

打开命令行、终端，用命令进入到你要保存SSH-KEY文件的文件夹，我们先用命令测试下终端是否支持SSH：

ssh -V

 

如果你的终端支持SSH，那么你可能看到类似如下的版本信息：

OpenSSH_7.3p1, OpenSSL 1.0.2j 26 Sep 2016

 

测试时如果提示不识别SSH命令，需要安装SSH。

Ubuntu安装SSH：

sudo apt-get install openssh-client openssh-server

 

CentOS安装SSH：

yum install openssh-client openssh-server

 

Windows可以在当前文件夹右键，选择**Git Bash Here**，会自动在当前文件夹打开一个MINGW的命令行窗体，它是自带SSH的。

接下来在刚才的文件夹，使用SSH命令在当前文件夹生成一对SSH-KEY：

ssh-keygen -t rsa -C "邮箱地址"

 

例如：

ssh-keygen -t rsa -C "[smallajax@foxmail.com](mailto:smallajax@foxmail.com)"

 

接下来会出来提示信息，完整的大概是这样：

$ ssh-keygen -t rsa -C "[smallajax@foxmail.com](mailto:smallajax@foxmail.com)"

Generating public/private rsa key pair.

Enter file in which to save the key (~/.ssh/id_rsa):

 

这里需要输入SSH-KEY的文件名字，这里名字理论上可以随便取，但是我们今天要说配置多个SSH-KEY，所以请分别查看以下两节：

·     单个Git帐号的配置——全局Git配置

·     多个Git帐号的配置——局部Git配置

**单个****Git****帐号的配置****——****全局****Git****配置**

大部分人使用Git一般是一个帐号，所以接着上面的讲。

上面说到输入ssh-keygen命令生成SSH-KEY密钥对文件时需要输入文件名称，如果你仅仅要配置一个帐号，那么我们输入默认名称即可：id_rsa。

接着会要求输入私钥的密码，并且需要确认密码，为了安全在密码输入的时候不会反显，什么都看不到，这个密码你自己设置，但是你一定要记住：

Enter passphrase (empty for no passphrase):

Enter same passphrase again:

 

到这里生成SSH-KEY的事就完成了，你在当前文件夹会看到两个文件：

id_rsa id_rsa.pub

 

SSH-KEY生成了，接着给服务器和客户端配置SSH-KEY。

\1.    第一步把id_rsa.pub中的公钥内容添加到Git的SSH中，如果你使用Github或者Gitlib，在个人设置中会找到。

\2.    第二步把SSH-KEY配置给SSH，让系统的SSH知道这个KEY。

Linux把id_rsa文件拷贝到~/.ssh文件夹下，命令如下：

cp id_rsa ~/.ssh/

 

Window把id_rsa文件拷贝到C:/Users/你的用户名/.ssh文件夹下。

拷贝完成后，把.ssh文件夹下的id_rsa文件添加到SSH-Agent，命令如下：

ssh-add id_rsa文件的路径

 

例如Linux：ssh-add ~/.ssh/id_rsa，如果命令行此时正在.ssh文件夹下：ssh-add id_rsa即可，Windows同理。

此时添加时如果遇到错误，请参考本文最后一节：**添加****SSH****到****SSH-Agent****时报错**。

最后，执行以下命名配置Git全局用户和邮箱：

git config --global user.name "你的名字"

git config --global user.email "你的邮箱"

 

例如：

git config --global user.name "YanZhenjie"

git config --global user.email "[smallajax@foxmail.com](mailto:smallajax@foxmail.com)"

 

配置全局用户和邮箱完成后，我们可以查看： 

Linux用户打开~/.gitconfig文件即可看到配置：

vim ~/.gitconfig

 

Windows用户打开C:/Users/你的用户名/.gitconfig即可看到配置，内容大概如下：

[user]

  name = YanZhenjie

  email = [smallajax@foxmail.com](mailto:smallajax@foxmail.com)

 

此时配置全部结束，请查看下方**测试****SSH-KEY****配置是否成功**进行测试。

**多个****Git****帐号的配置****——****局部****Git****配置**

又有很多人同时使用多个Git帐号，比如Github、OSChina、Gitlib等，再接着上面讲配置多个Git帐号。

上面说到输入ssh-keygen命令生成SSH-KEY密钥对文件时需要输入文件名称，如果你要配置多个帐号，就根据爱好输入KEY文件的名字吧，例如为Github配置就输入：id_rsa_github，为OSChina配置就输入：id_rsa_oschina。

接着会要求输入私钥的密码，并且需要确认密码，为了安全在密码输入的时候不会反显，什么都看不到，这个密码你自己设置，但是你一定要记住：

Enter passphrase (empty for no passphrase):

Enter same passphrase again:

 

到这里生成SSH-KEY的事就完成了，你在当前文件夹会看到两个文件：

id_rsa_github id_rsa_github.pub

 

SSH-KEY生成了，接着给服务器和客户端配置SSH-KEY。

\1.    第一步把id_rsa_github.pub中的公钥内容添加到Git的SSH中，如果你使用Github或者Gitlib，在个人设置中会找到。

\2.    第二步为SSH配置私钥位置，这里和上面配置单个Git帐号不一样，不过单个帐号也可以按照多个帐号的配置方法来配置。

下面我们需要在.ssh文件夹新建一个名为config的文件，用它来配置多个SSH-KEY的管理。

Linux进入.ssh文件夹：cd ~/.ssh，新建config文件：touch config；或者：touch ~/.ssh/config。这里要注意，没有.ssh文件夹的要新建一个.ssh名的文件夹。

Window进入C:/Users/你的用户名/.ssh文件夹，右键新建一个文本文件，改名为config即可。这里要注意，没有.ssh文件夹的要新建一个.ssh名的文件夹。

下面来填写config文件的内容，我以Github、Gitlib、OSChina，局域网为例：

Host github.com

  HostName github.com

  User smallajax@foxmail.com

  PreferredAuthentications publickey

  IdentityFile /home/Workspace/ssh/id_rsa_github

Host gitlib.com

  HostName gitlib.com

  User smallajax@foxmail.com

  PreferredAuthentications publickey

  IdentityFile id_rsa_gitlib

Host oschina.com

  HostName oschina.com

  User smallajax@foxmail.com

  PreferredAuthentications publickey

  IdentityFile /D/Workspace/ssh/id_rsa_oschina

Host 192.168.1.222

  HostName 192.168.1.222

  User smallajax@foxmail.com

  PreferredAuthentications publickey

  IdentityFile /D/Workspace/ssh/id_rsa_oschina

 

解释一下，HostName是服务器的地址，User是用户名，PreferredAuthentications照抄即可，这里主要说的是IdentityFile，上面我们看到了三种情况，所以它的书写原则是：

\1.    填私钥文件的本地路径。

\2.    不论是Linux还是Windows都可以写相对路径，比如把id_rsa_xxx私钥文件放在.ssh文件夹下。

\3.    文件放在不同跟路径下时，需要写绝对路径 

\1. Linux中没有放在.ssh文件夹内或者子文件夹。

\2. Windows中没有放在C盘下时。注意据对路径变化，比如C盘下是/C/xo/abc、比如D盘下/D/ssh/id_rsa这样，还看不懂请参考上方例子。

拷贝完成后，把所有的id_rsa私钥文件添加到SSH-Agent，命令如下：

ssh-add id_rsa文件的路径

 

例如添加.ssh文件夹下的，Linux这样做：ssh-add ~/.ssh/id_rsa，如果你在.ssh文件夹下：ssh-add id_rsa即可，Windows同理。

此时添加时如果遇到错误，请参考本文最后一节：**添加****SSH****到****SSH-Agent****时报错**。

最后，还剩下项目的用户和邮箱没有配置，和配个单个Git帐号的方式不同，这里我们需要为每个项目分别配置，所以要命令行进入仓库文件夹再设置。第一种情况是先从Git上pull仓库下来，第二种情况是本地初始化Git仓库，总之进入改仓库文件夹后：

git config --local user.name "你的名字"

git config --local user.email "你的邮箱"

 

例如：

git config --local user.name "YanZhenjie"

git config --local user.email "smallajax@foxmail.com"

 

不过麻烦的一点是如果是多个项目就需要挨个配置，不过我们一般是pull一个项目就配置一下，也仅仅需要配置一次即可。

注意配置单个Git帐号时，是不进入项目文件夹就可以，不过不是使用--local，而是使用--global就可以全局配置。

配置项目用户和邮箱完成后，我们可以进入项目文件夹下的.git文件夹查看config文件内容，大概内容如下：

...

[user]

  name = YanZhenjie

  email = [smallajax@foxmail.com](mailto:smallajax@foxmail.com)

 

此时配置全部结束，请查看下方**测试****SSH-KEY****配置是否成功**进行测试。如果配置成功，你就可以clone和commit了。

**测试****SSH-KEY****配置是否成功**

配置全部结束，我们来测试一下配置是否成功：

·     如果你是Github：

ssh -T git@github.com

 

·     如果是你Gitlib：

ssh -T git@gitlib.com

 

·     如果你是局域网192.168.1.222：

ssh -T git@192.168.1.222

 

·     其它自行举一反三吧。

此时需要输入刚才生成SSH-KEY时输入的私钥密码，输入后自行观察信息判断是否连接成功。

·     比如Github的信息是：

Hi yanzhenjie! You've successfully authenticated, but GitHub does not provide shell access.

 

·     比如Gitlib的信息是：

Welcome to GitLab, YanZhenjie!

 

如果不能执行测试命令或者提示什么错误了，请执行ssh-agent bash完后再执行测试命令，如果还不行就是配置有问题了。

**添加****SSH****到****SSH-Agent****时报错**

如果执行ssh-add ...命令提示如下错误：

Could not open a connection to your authentication agent.

 

那么请执行eval $(ssh-agent)命令后再重试，如果还不行，请再执行ssh-agent bash命令后再执行eval $(ssh-agent)后执行添加命令。另外上述测试配置的命令不能执行时也可以在ssh-agent bash执行完后再测试。

·     参考：[StackOverFlow·ssh-Could not open a…](http://stackoverflow.com/questions/17846529/could-not-open-a-connection-to-your-authentication-agent)





## Emoji使用规则



![image-20210717201242057](/Volumes/work/Project/myblog/doc/assets/tool31.png)
