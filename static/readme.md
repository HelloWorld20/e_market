# 开发

	yarn serve

# 打包

	yarn build

# easymock 地址

[https://easy-mock.com/project/5cd4159c4031143439b76a0c](https://easy-mock.com/project/5cd4159c4031143439b76a0c)

# 问题

## 安装不了node-sass

**问题是npm没有办法下载`binding.node`这个包**

执行`npm rebuild node-sass`

在执行过程中，会打印node-sass的路径。复制链接，用浏览器下载

把下载的东西手动放到报错指定的路径，比如我的是

	D:\workspace\work\zjsfnlljgw\node_modules\node-sass\vendor\win32-x64-64\binding.node

要注意文件名。插件要求的是`binding.node`。而下载下来的是`win32-x64-64_binding.node`。要记得改名称

# todo

* extra-text-plugin √
* axios	 √
* vuex	√
* vConsole	√
* mint ui	√
* eslint	√
* 抽离公共js	√
* js包太大分离（次要）
* dllplugin（次要）

# 剩余的问题

* .vue里的css无法提取出来	√
* .scss无法用postcss-loader加前缀	√
* sass-resources-loader无法自动注入scss
