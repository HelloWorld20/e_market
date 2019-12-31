# 开发

根目录下

    npm i

安装完毕后打开两个终端分别启动服务端、H5 客户端、后台管理系统

    npm run dev-server

    npm run dev-static

    npm run dev-static-admin

然后 static 启动在 3000 端口。static-admin 启动在 3001.server 启动在 4000 端口。server 调试端口在 3005

# 部署

1. 把代码推到 github
2. 登陆服务器，到指定目录下 git 拉取代码
3. 按需安装 npm i (貌似服务器上不能自动到 server、static 文件夹下安装，则手动到俩文件夹下安装)
4. sh deploy
5. pm2 restart index

**_dockers 部署废弃（太麻烦了）_**

## 生成 docker 镜像

在 node_modules 完全安装的情况下

    # sh deploy

会生成打包好的代码在 var 文件夹下
然后生成 docker 镜像

    docker build -t liuzhou_market .

把镜像推到 Docker hub

    docker tag liuzhou_market helloworld20/liuzhou_market

    docker push helloworld20/liuzhou_market

如果没有登陆 docker hub 则需要

    docker login

根据提示填写账号密码即可

## 部署 docker 镜像

登陆远程服务器，run 远程镜像

    docker run --name App -p 3000:3000 -t helloworld20/liuzhou_market

但是有个小问题是。一旦`ctrl + c`或者关调终端后会退出 docker。所以还得重新启动

    docker ps -a

找到暂停的 id

    docker restart <id>

即可

# todo

-   一个可以链接可以查看指定订单信息
-   删除分类后对应分类的商品如何处理 √（手动）
-   购物车修改数量偶尔有问题
-   H5商品搜索功能 √
-   用户管理（封禁用户） √
-   管理后台操作统计
