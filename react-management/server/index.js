const Koa = require('koa')
const body = require("koa-body")
const path = require('path')
const static = require("koa-static")
const mongoose = require("mongoose")
const routing = require("./routes")
const app = new Koa()
const {
    connectionStr
} = require('./config.js')

// 配置静态资源
app.use(static(__dirname, '/public'))

// 解析post参数
app.use(body({
	multipart:true,
	formidable:{
	    uploadDir: path.join(__dirname,'public/upload'),
	    keepExtensions: true,
	}
}))

// 连接数据库
// 其中connectionStr 填自己的数据库地址
mongoose.connect(connectionStr, {
	useNewUrlParser: true
}, () => {
	console.log("连接数据库成功")
})

mongoose.connection.on("error", (error) => {
	console.log("连接数据库失败")
})

// 使用路由
routing(app)

app.listen(5000, () => {
	console.log("listen at 5000")
})