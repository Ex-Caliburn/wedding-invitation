# weddingInvitations

结婚请柬 婚礼电子请帖 婚礼H5 邀请函

clone 到本地可直接打开index.html 文件查看效果, 仅支持移动端, pc需使用手机模式

### 直接部署

```
git clone https://github.com/Ex-Caliburn/wedding-invitation.git
cd weddingInvitations
npm install
node app
```

默认端口为8081, 可以在app.js中修改端口

### 自行部署

clone 到本地后, 拷贝index.html 和 public 自行部署即可

scp -r /path/to/local/Documents username@remotehost:/home/username/
scp -r /Users/lijiye/work/weddingInvitations-master.zip  root@8.138.155.202:/web
scp -r /Users/lijiye/work/weddingInvitations-master.zip  root@172.29.248.180:/web

ssh root@8.138.155.202

sftp

git remote add origin <git@saber.github.com>:Ex-Caliburn/wedding-invitation.git
git remote add origin <git@github.com>:Ex-Caliburn/wedding-invitation.git

/web/weddingInvitations-master/index.html

### nginx 踩坑

Nginx 的 location 匹配不是“多次匹配”的概念，而是“最长匹配”或“最佳匹配”。当 Nginx 接收到一个请求时，它会按照以下规则来选择 location 块：

精确匹配：如果存在精确匹配的 location 块（即 location 后面直接跟 URI，如 location = /exact/match），Nginx 会优先选择这个精确匹配。

最长非正则前缀匹配：如果没有精确匹配，Nginx 会寻找最长的非正则表达式前缀匹配。例如，如果有 location / 和 location /blog，对于 /blog 的请求，Nginx 会选择 location /blog。

正则表达式匹配：如果前面的匹配都没有找到，Nginx 会尝试正则表达式匹配。如果有多个正则表达式 location 块，Nginx 会根据它们在配置文件中出现的顺序进行匹配，选择第一个匹配的。

默认 location 块：如果没有找到任何匹配的 location 块，Nginx 会使用默认的 location / 块。

请注意，Nginx 不会尝试所有 location 块直到找到匹配的，而是在找到第一个匹配的 location 块后停止搜索。这意味着 location 块在配置文件中的顺序很重要，因为 Nginx 会从上到下进行匹配。

此外，Nginx 的 location 匹配是大小写敏感的，除非你在配置文件中设置了 case_sensitive_log off; 和 underscores_in_headers on;。
