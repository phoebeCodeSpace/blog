# 使用 github 疑难杂症

## 解决git停留在writing objects和上传慢的情况

> 原因 : 有上传比较大的文件

1. 执行 `$ git config --global http.postBuffer 524288000`

    原理： 因为http.postBuffer默认上限为1M,上面的命令是把git的配置里http.postBuffer的变量改大为500M

2. 把远程仓库的上传由原来的HTTPS改为SSH上传 `$ git remote set-url origin [你的ssh地址]`

    原理： github在国内本身就慢，还可能被dns污染 , 因此推荐使用SSH上传