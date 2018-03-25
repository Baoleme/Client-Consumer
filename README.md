# 饱了么
> 饱了么 消费者端

## Prerequisite
* Node.js >= `8.0.0`
* [WePY](https://github.com/Tencent/wepy)
* [微信开发者工具](https://mp.weixin.qq.com/debug/wxadoc/dev/devtools/download.html)

## 构建

### 编译

```bash
npm i
wepy build # or 'wepy build --watch'
```

此时生成的小程序源码已在`./dist`下生成。

### 构建

使用微信开发者工具进行构建。代码目录选择`./dist`，填上appId后即可。

然后就可以使用开发者工具进行编译与手机预览。

