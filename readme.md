# 开发

根目录下

    npm i

安装完毕后打开两个终端分别启动服务端与客户端

    npm run dev-server

    npm run dev-static

然后server启动在3000端口。static启动在8080端口

# 部署

## 生成docker镜像
在node_modules完全安装的情况下

    # sh deploy

会生成打包好的代码在var文件夹下
然后生成docker镜像

    docker build -t liuzhou_market . --no-cache

把镜像推到Docker hub

    docker tag liuzhou_market helloworld20/liuzhou_market

    docker push

如果没有登陆docker hub则需要

    docker login

根据提示填写账号密码即可

## 部署docker镜像

登陆远程服务器，run远程镜像

    docker run -p 3000:3000 helloworld20/liuzhou_market

但是有个小问题是。一旦`ctrl + c`或者关调终端后会退出docker。所以还得重新启动

    docker ps -a

找到暂停的id

    docker restart <id>

即可


