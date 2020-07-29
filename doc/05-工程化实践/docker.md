# docker

## 常用命令

|-|-|-|
|-|-|-|
|docker run|创建一个新的容器并运行一个命令|
|docker run -p 80:80 -v /data:/data -d nginx:latest|使用镜像 nginx:latest，以后台模式启动一个容器,将容器的 80 端口映射到主机的 80 端口,主机的目录 /data 映射到容器的 /data。|
|docker run -it nginx:latest /bin/bash|使用镜像nginx:latest以交互模式启动一个容器,在容器内执行/bin/bash命令。