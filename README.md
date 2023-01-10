npx express-generator

//1. 初始化npm环境
npm init -y


安装lodash,淘宝镜像--registry=https://registry.npm.taobao.org
npm install lodash --save --registry=https://registry.npm.taobao.org

//2. 安装nodemon： npm install nodemon --save-dev --registry=https://registry.npm.taobao.org
在项目中启动  npm run start.dev

//3. 安装cross-env： npm install --save-dev cross-env --registry=https://registry.npm.taobao.org
接下来就可以通过 package.json 文件来进行修改，使 cross-env 生效

正常的运行
"scripts": {
    "start": "cross-env NODE_ENV=dev node ./bin/www",
    "build": "cross-env NODE_ENV=production node ./bin/www"
  }
用nodemon运行
"scripts": {
   "start.dev": "cross-env NODE_ENV=dev nodemon ./bin/www.js",
   "start.prd": "cross-env NODE_ENV=production nodemon ./bin/www.js"
 },
"dev": "cross-env NODE_ENV=dev nodemon ./bin/www.js",
"prd": "cross-env NODE_ENV=production nodemon ./bin/www.js"

安装mysql
npm install mysql --registry=https://registry.npm.taobao.org
npm install mysql --save --registry=https://registry.npm.taobao.org

安装redis
npm install redis --save
redis-server.exe redis.windows.conf
redis-cli.exe -h 127.0.0.1 -p 6379
set myKey abc
get myKey

安装express-session
npm install express-session

安装connect-redis
npm install redis connect-redis express-session

<!-- 使用session -->
const session = require('express-session')
const RedisStore = require('connect-redis')(session)

const redisClient = require('./exec/execRedis')
const sessionStore = new RedisStore({
  client: redisClient
})
// 使用session
app.use(session({
  secret: 'WJiol#23123_',
  cookie: {
    httpOnly: true,
    path: '/',
    maxAge: 120 * 1000
  },
  store: sessionStore
}))
