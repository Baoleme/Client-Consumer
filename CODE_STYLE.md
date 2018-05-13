# 代码规范

## JavaScript

* 根据[ES 2016+](http://kangax.github.io/compat-table/es2016plus/)
* 使用ESLint进行代码风格检查
  * 基于[JavaScript Standard Style](https://github.com/standard/standard/blob/master/RULES.md#javascript-standard-style)
  * 额外规则
    * 永远不省略分号
* 可以使用Async/Await的地方就不使用Promise

## CSS

* 使用[SCSS预处理器](http://sass.bootcss.com/docs/sass-reference/)

* 使用嵌套规则，嵌套规则下尽量使用直接子节点选择符防止预料之外的规则适用

  ```scss
  .parent {
      > .child1 { // good
          // styles
      }
      . child2 { // not good
          // styles
      }
  }
  .parent .child3 {} // not good
  ```

* 长度单位使用rpx

  * see [this](https://developers.weixin.qq.com/miniprogram/dev/framework/view/wxss.html#尺寸单位)

  