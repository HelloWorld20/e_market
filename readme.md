# 开发

根目录下

    npm i

安装完毕后打开两个终端分别启动服务端与客户端

    npm run dev-server

    npm run dev-static

然后server启动在3001端口。static启动在3000端口。server调试端口在3005

# 部署

1. 把代码推动到github
2. 登陆服务器，到指定目录下git拉取代码
3. 按需安装 npm i (貌似服务器上不能自动到server、static文件夹下安装，则手动到俩文件夹下安装)
4. sh deploy
5. pm2 restart index

***dockers部署废弃（太麻烦了）***
## 生成docker镜像
在node_modules完全安装的情况下

    # sh deploy

会生成打包好的代码在var文件夹下
然后生成docker镜像

    docker build -t liuzhou_market .

把镜像推到Docker hub

    docker tag liuzhou_market helloworld20/liuzhou_market

    docker push helloworld20/liuzhou_market

如果没有登陆docker hub则需要

    docker login

根据提示填写账号密码即可

## 部署docker镜像

登陆远程服务器，run远程镜像

    docker run --name App -p 3000:3000 -t helloworld20/liuzhou_market

但是有个小问题是。一旦`ctrl + c`或者关调终端后会退出docker。所以还得重新启动

    docker ps -a

找到暂停的id

    docker restart <id>

即可


