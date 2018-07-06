# 饱了么
> 饱了么 消费者端

## Prerequisite
* Node.js >= `8.0.0`
* [WePY](https://github.com/Tencent/wepy)
* [微信开发者工具](https://mp.weixin.qq.com/debug/wxadoc/dev/devtools/download.html)

## 目录结构

```
.
├── CODE_STYLE.md                   # 代码规范
├── CONTRIBUTING.md                 # 贡献规范
├── package.json                    # 项目总体信息，依赖列表
├── package-lock.json               # 依赖 lock
├── project.config.json             # 小程序部分设置项
├── README.md                       # 介绍页
├── src                             # 小程序源代码部分
│   ├── app.wpy                     # 小程序入口
│   ├── assets                      # 静态资源
│   │   └── ...
│   ├── components                  # 复用组件
│   │   └── ...
│   ├── lib                         # 杂项库
│   │   ├── cookieJar.js            # cookie库
│   │   ├── iconfont.scss           # iconfont 资源
│   │   ├── request.js              # http 请求库
│   │   └── var.scss                # scss 全局变量
│   ├── mixins                      # 混合组件
│   │   └── ...
│   ├── pages                       # 小程序页面
│   │   ├── confirmOrder.wpy        # 订单确认页
│   │   ├── index.wpy               # 主页
│   │   └── orderDetail.wpy         # 订单详情页
│   └── store                       # redux 实现
│       ├── actions                 # redux-action
│       │   └── ...
│       ├── index.js                # redux 入口
│       ├── lib.js                  # 工具库
│       ├── reducers                # redux-reducer
│       │   └── ...
│       └── types                   # redux-action 类型定义
│           └── ...
└── wepy.config.js                  # wepy 构建配置
```

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
