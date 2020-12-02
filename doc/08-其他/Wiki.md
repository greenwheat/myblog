# Wiki in GitLab

### Edit Wiki Locally

#### Install Gollum

Gollum是wiki管理系统，是使用ruby开发的，要求ruby版本在1.9以上

```bash
gem install gollum
```
It is recommended to install github-markdown so that GFM features render locally:

```bash
gem install github-markdown
```

### Mac下安装

#### 设置gem sources

```bash
gem sources --add https://ruby.taobao.org/ --remove https://rubygems.org/
```
> 一些国内ruby源（不保证可用）
- https://cache.ruby-china.com [【查看详细】](https://ruby-china.org/wiki/ruby-mirror)
- https://gems.ruby-china.com [【查看详细】](https://gems.ruby-china.com/)

#### 使用brew安装相关依赖

```bash
brew install icu4c
```

#### 问题

1. 解决brew每次都要Updating Homebrew（自动更新）上

> 方案一：关闭自动更新

```bash
vim ~/.bash_profile

# 新增一行
export HOMEBREW_NO_AUTO_UPDATE=true
```

> 方案二：在Updating Homebrew时使用command+c键可以中断当前的更新，直接跳到下载阶段

2. ERROR: CMake is required to build Rugged.

需要安装cmake

```bash
brew install cmake
```