const Category = require('../models/category.js')

class CategoryCtl{
	async find(ctx, next){
		let { per_page = 3} = ctx.query
		// 防止传入负数
		let page = Math.max(ctx.query.page * 1, 1)
		// 防止传入负数
		const perPage = Math.max(per_page * 1, 1)
		try{
			const total = await Category.count()
			let data = Category.find()
			if(page && perPage){
				data = data.limit(perPage).skip(perPage * ( page - 1 ))
			}
			const result = await data.exec()
			ctx.body = {
				status: 0,
				data: result,
				total,
			}
		}catch(e){
			ctx.body = {
				status: -1,
				message: "服务器错误"
			}
		}
		
	}

	async insertMany(ctx, next){
		for(let i = 0; i < 50; i++){
			await new Category({name: `分类${i}`}).save()
		}
		ctx.body = "成功啦"
	}

	async findById(ctx, next){
		const {id: _id} = ctx.params
		const result = await Category.find({_id})
		if(!result){
			ctx.body = {
				status: -1,
				message: "暂无此分类"
			}
		}
		ctx.body = {
			status: 0,
			data: result
		}
	}

	async create(ctx, next){
		const {name} = ctx.request.body
		const result = await new Category({name}).save()
		ctx.body = {
			status: 0,
			data: result
		}
	}

	async update(ctx, next){
		const {name} = ctx.request.body
		const {id} = ctx.params
		const result = await Category.findOneAndUpdate({_id: id}, {name})
		console.log(result)
		ctx.body = {
			status: 0
		}
	}

	
}

module.exports = new CategoryCtl()