# 一. 分支
## 1.1 主分支master
正式版本所在的分支, 只用于发布稳定版本

## 1.2 开发分支develop
日常开发版本所在的分支

```bash
# 创建develop分支
git checkout -b develop
```

develop分支通过`pull request`与master分支合并

## 1.3 临时分支
临时分支在开发完后并入develop分支, 并删除

-   功能分支feature
    -   目的: 开发新功能
    -   创建: develop
    -   并入: develop
    -   命名: `feature-***`

-   预发布分支release
    -   目的: 预发布, 用于测试
    -   创建: develop
    -   并入: master, develop
    -   命名: `release-***`

-   修复分支fixbug
    -   目的: 修复正式版本bug
    -   创建: master
    -   并入: master, develop
    -   命名: `fix-***`

# 二. 协作流程
![](http://ocphk5wc7.bkt.clouddn.com//17-3-26/93856202-file_1490459215675_97f4.png)
## 2.1 clone
```bash
git clone https://github.com/Baoleme/Client-Consumer.git
```

## 2.2 切换到特定分支
切换到你需要开发的分支 如`feature-login`

**请注意: 开发任何新功能时请先发issue, 完成后在pull request中关联issue**

```bash
git checkout -b feature-login
```

## 2.3 开发
如果开发时需要同步
```bash
git pull
```

## 2.4 commit
将你的更改提交到本地代码库
```bash
# 添加指定文件
git add [file1] [file2]
# 添加所有文件
git add .

# 提交
git commit -m [message]
```
这一步使用GitGUI等工具更加方便

## 2.5 push
将你的修改推到远端代码库
```bash
git push
```

## 2.6 pull request
向主代码库的develop分支发送pull request
