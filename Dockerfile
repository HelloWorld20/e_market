FROM node:alpine

ENV NODE_ENV production
ENV PROJECT_ENV production

# 工作目录
WORKDIR /app

# 全局安装pm2模块
RUN npm i -g pm2
