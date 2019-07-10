# eggjs + typescript + mongoose 仿小米商城

## 模块

* ~~管理站 vue spa 搭建~~
* ~~BaseController~~
* ~~BaseService~~
* ~~RBAC 权限管理~~
* 主站 vue ssr 搭建

## 在项目中实践 Git-Commit-Log 规范

### 标准
```xml
<type>(<scope>):<subject>
<BLANKLINE>
<body>
<BLANKLINE>
<footer>
```

### type

用于说明本次 commit 的类别，只允许使用下面7个标识：

* feat：新功能（feature）
* fix：修补bug
* docs：文档（documentation）
* style：格式（不影响代码运行的变动）
* refactor：重构（即不是新增功能，也不是修改bug的代码变动）
* test：增加测试
* chore：构建过程或辅助工具的变动

### scope

用于说明 commit 影响的范围，比如数据层、控制层、视图层等等，视项目不同而不同。

### subject

是 commit 目的的简短描述，不超过50个字符，以动词开头，使用第一人称现在时，比如 change ，而不是 changed 或 changes ，第一个字母小写，结尾不加句号。

### body

用于对本次 commit 的详细描述。

### footer

footer 部分只用于两种情况：
* 不兼容变动：如果当前代码与上一个版本不兼容，则 footer 部分以 BREAKING CHANGE 开头，后面是对变动的描述、以及变动理由和迁移方法。
* 关闭 issue ：如果当前 commit 针对某个 issue ，那么可以在 footer 部分关闭这个 issue 。