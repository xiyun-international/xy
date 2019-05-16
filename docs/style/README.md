# 底层样式

## 简介
我们在 UI 组件里面内置了一些工具样式，可以让你方便地指定 `margin` 和 `padding`，如果你已经在使用我们的禧云 UI 库，那么你就可以在全局范围内来使用它了。


## 类名
所有类名的可取值范围为：[1 ~ 30] 像素

| 类名 | 说明 | 示例 |
| ------ | ------| ------ |
| t-P | 设置 padding 值 | t-P15 |
| t-PT | 设置 padding-top 值 | t-PT15 |
| t-PR | 设置 padding-right 值 | t-PR15 |
| t-PB | 设置 padding-bottom 值 | t-PR15 |
| t-PL | 设置 padding-left 值 | t-PR15 |
| t-M | 设置 margin 值 | t-M15 |
| t-MT | 设置 margin-top 值 | t-MT15 |
| t-MR | 设置 margin-right 值 | t-MR15 |
| t-MB | 设置 margin-bottom 值 | t-MB15 |
| t-ML | 设置 margin-left 值 | t-ML15 |
| t-R | 设置 border-radius 值 | t-R15 |
| t-RT | 设置 border-top-left-radius 和 border-top-right-radius 值 | t-RT15 |
| t-RR | 设置 border-top-right-radius 和 border-bottom-right-radius 值 | t-RR15 |
| t-RB | 设置 border-bottom-left-radius 和 border-bottom-right-radius 值 | t-RB15 |
| t-RL | 设置 border-top-left-radius 和 border-bottom-left-radius 值 | t-RL15 |


## 示例
以给元素设置一个边距为例，只需要在元素加上工具中的类名，就可以得到相应的边距
```html
<div>
  <button class="t-MR10">我有10像素的右边距</button>
  <button>按钮</button>
</div>

<div>
  <button class="t-MR30">我有30像素的右边距</button>
  <button>按钮</button>
</div>
```

## 效果
<div>
  <button class="t-MR10">我有10像素的右边距</button>
  <button>按钮</button>
</div>
<br />
<div>
  <button class="t-MR30">我有30像素的右边距</button>
  <button>按钮</button>
</div>
