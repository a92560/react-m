const path = require('path')
const fs = require("fs")
const Product = require("../models/product.js")
const Category = require("../models/category.js")
class ProCtl {
    async insertMany(ctx, next) {
        let productArr = [{
            "status": 1,
            "imgs": ["image-1559402396338.jpg"],
            "_id": "5ca9e05db49ef916541160cd",
            "name": "联想ThinkPad 翼4809",
            "desc": "年度重量级新品，X390、T490全新登场 更加轻薄机身设计9",
            "price": 65999,
            "categoryId": "5ca9db9fb49ef916541160cc",
            "detail": "<p><span style=\"color: rgb(228,57,60);background-color: rgb(255,255,255);font-size: 12px;\">想你所需，超你所想！精致外观，轻薄便携带光驱，内置正版office杜绝盗版死机，全国联保两年！</span> 222</p>\n<p><span style=\"color: rgb(102,102,102);background-color: rgb(255,255,255);font-size: 16px;\">联想（Lenovo）扬天V110 15.6英寸家用轻薄便携商务办公手提笔记本电脑 定制【E2-9010/4G/128G固态】 2G独显 内置</span></p>\n<p><span style=\"color: rgb(102,102,102);background-color: rgb(255,255,255);font-size: 16px;\">99999</span></p>\n",
            "__v": 0
        }, {
            "status": 1,
            "imgs": ["image-1559402448049.jpg", "image-1559402450480.jpg"],
            "_id": "5ca9e414b49ef916541160ce",
            "name": "华硕(ASUS) 飞行堡垒",
            "desc": "15.6英寸窄边框游戏笔记本电脑(i7-8750H 8G 256GSSD+1T GTX1050Ti 4G IPS)",
            "price": 6799,
            "categoryId": "5ca9db8ab49ef916541160cb",
            "detail": "<p><span style=\"color: rgb(102,102,102);background-color: rgb(255,255,255);font-size: 16px;\">华硕(ASUS) 飞行堡垒6 15.6英寸窄边框游戏笔记本电脑(i7-8750H 8G 256GSSD+1T GTX1050Ti 4G IPS)火陨红黑</span>&nbsp;</p>\n<p><span style=\"color: rgb(228,57,60);background-color: rgb(255,255,255);font-size: 12px;\">【4.6-4.7号华硕集体放价，大牌够品质！】1T+256G高速存储组合！超窄边框视野无阻，强劲散热一键启动！</span>&nbsp;</p>\n",
            "__v": 0
        }, {
            "status": 2,
            "imgs": ["image-1559402436395.jpg"],
            "_id": "5ca9e4b7b49ef916541160cf",
            "name": "你不知道的JS（上卷）",
            "desc": "图灵程序设计丛书： [You Don't Know JS:Scope & Closures] JavaScript开发经典入门图书 打通JavaScript的任督二脉",
            "price": 35,
            "categoryId": "5ca9d6c9b49ef916541160bc",
            "detail": "<p style=\"text-align:start;\"><span style=\"color: rgb(102,102,102);background-color: rgb(255,255,255);font-size: 16px;\">图灵程序设计丛书：你不知道的JavaScript（上卷）</span> <span style=\"color: rgb(102,102,102);background-color: rgb(255,255,255);font-size: 16px;\"><strong>[You Don't Know JS:Scope &amp; Closures]</strong></span></p>\n<p style=\"text-align:start;\"><span style=\"color: rgb(227,57,60);background-color: rgb(255,255,255);font-size: 12px;\">JavaScript开发经典入门图书 打通JavaScript的任督二脉 领略语言内部的绝美风光</span>&nbsp;</p>\n",
            "__v": 0
        }, {
            "status": 2,
            "imgs": ["image-1554638240202.jpg"],
            "_id": "5ca9e5bbb49ef916541160d0",
            "name": "美的(Midea) 213升-BCD-213TM",
            "desc": "爆款直降!大容量三口之家优选! *节能养鲜,自动低温补偿,36分贝静音呵护",
            "price": 1388,
            "categoryId": "5ca9d9cfb49ef916541160c4",
            "detail": "<p style=\"text-align:start;\"><span style=\"color: rgb(102,102,102);background-color: rgb(255,255,255);font-size: 16px;font-family: Arial, \"microsoft yahei;\">美的(Midea) 213升 节能静音家用三门小冰箱 阳光米 BCD-213TM(E)</span></p>\n<p><span style=\"color: rgb(228,57,60);background-color: rgb(255,255,255);font-size: 12px;font-family: tahoma, arial, \"Microsoft YaHei\", \"Hiragino Sans GB\", u5b8bu4f53, sans-serif;\">【4.8美的大牌秒杀日】爆款直降!大容量三口之家优选! *节能养鲜,自动低温补偿,36分贝静音呵护! *每天不到一度电,省钱又省心!</span>&nbsp;</p>\n",
            "__v": 0
        }, {
            "status": 1,
            "imgs": ["image-1554638403550.jpg"],
            "_id": "5ca9e653b49ef916541160d1",
            "name": "美的（Midea）KFR-35GW/WDAA3",
            "desc": "正1.5匹 变频 智弧 冷暖 智能壁挂式卧室空调挂机",
            "price": 2499,
            "categoryId": "5ca9da1ab49ef916541160c6",
            "detail": "<p style=\"text-align:start;\"><span style=\"color: rgb(102,102,102);background-color: rgb(255,255,255);font-size: 16px;\">美的（Midea）正1.5匹 变频 智弧 冷暖 智能壁挂式卧室空调挂机 KFR-35GW/WDAA3@</span></p>\n<p style=\"text-align:start;\"></p>\n<p><span style=\"color: rgb(228,57,60);background-color: rgb(255,255,255);font-size: 12px;\">【4.8美的大牌秒杀日】提前加入购物车！2299元成交价！前50名下单送赠品加湿型电风扇，赠完即止！8日0点开抢！</span><a href=\"https://sale.jd.com/mall/LKHdqZUIYk.html\" target=\"_blank\"><span style=\"color: rgb(94,105,173);background-color: rgb(255,255,255);font-size: 12px;\">更有无风感柜挂组合套购立减500元！猛戳！！</span></a>&nbsp;</p>\n",
            "__v": 0
        }]
        let length = productArr.length
        const cateArr = await Category.find()
        for (var i = 0; i < length; i++) {
            delete productArr[i]._id
            productArr[i].categoryId = cateArr[i]._id
            productArr[i].name += ` ${i}`
            await new Product(productArr[i]).save()
        }
        ctx.body = "测试插入"
    }
    async find(ctx, next) {
        const {
            k,
            searchType
        } = ctx.query
        let result = await Product.find(((k && searchType) ? {
            $or: [{
                [searchType]: new RegExp(k)
            }]
        } : {}))
        if (result) {
            ctx.body = {
                status: 0,
                data: result
            }
        } else {
            ctx.body = {
                status: -1,
                message: "暂无数据"
            }
        }
    }
    async update(ctx, next) {
        let body = ctx.request.body
        let {
            id: _id
        } = ctx.params
        let result = await Product.findOneAndUpdate({
            _id
        }, body)
        // 为之前未更新的数据 console.log(result)
        ctx.body = {
            status: 0
        }
    }
    async findById(ctx, next) {
        let {
            id: _id
        } = ctx.params
        const result = await Product.find({
            _id
        })
        if (result) {
            ctx.body = {
                status: 0,
                data: result
            }
        } else {
            ctx.body = {
                status: -1,
                message: "暂无数据"
            }
        }
    }
    async upload(ctx, next) {
        const body = ctx.request.files.file
        // 取出文件名
        const {
            path: filePath
        } = body
        const fileName = path.basename(filePath)
        console.log(fileName)
        ctx.body = {
            status: 0,
            data: {
                url: "http://localhost:5000" + `/public/upload/${fileName}`,
                name: fileName
            }
        }
    }
    async deleteUpload(ctx, next) {
        let {
            name: fileName
        } = ctx.query
        const dirPath = path.join(__dirname, '..', 'public/upload')
        try{
            const result = fs.unlinkSync(path.join(dirPath, fileName))
            ctx.body = {
                status: 0
            }
        }catch(e){
            ctx.body = {
                status: -1,
                message: "删除文件失败"
            }
        }
    }

    async create(ctx, next){
        const body = ctx.request.body
        console.log(body)
        const result = await new Product(body).save()
        if(result){
            ctx.body = {
                status: 0,
                data: result
            }
        }else{
            ctx.body = {
                status: -1,
                message: "服务器错误，请稍后重试。"
            }
        }
    }
}

function _remove(filename) {
    return new Promise((resolve, reject) => {
        fs.unlink(filename, (err) => {
            if (err) {
                reject(-1)
            }
            resolve(0)
        });
    })
}
module.exports = new ProCtl()