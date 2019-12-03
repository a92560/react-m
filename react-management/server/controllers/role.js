const Role = require("../models/role.js")

class RoleCtl{
	async create(ctx, next){
		const {roleName} = ctx.request.body
		console.log(roleName)
		const result = await new Role({name: roleName}).save()
		if(result){
			ctx.body = {
				status: 0,
				data: result
			}
		}else{
			ctx.body = {
				status: -1,
				message: "添加角色失败，请稍后重试。"
			}
		}
	}

	async find(ctx, next){
		const {per_page = 3} = ctx.query
		// 防止传入负数
		let page = Math.max(ctx.query.page * 1, 1)
		// 防止传入负数
		let perPage = Math.max(per_page * 1, 1)
		try{
			const total = await Role.count()
			let data = Role.find().sort({'create_time': -1})
			if(page && perPage){
				data = data.limit(perPage).skip(perPage * (page - 1))
			}
			const result = await data.exec()
			// 如果没数据了  result = []
			// 前端可以根据这个判断提示用户下一页已经没有数据了
			ctx.body = {
				status: 0,
				data: result,
				total
			}
		}catch(error){
			ctx.body = {
				status: -1,
				message: "服务器错误，请稍后重试。"
			}
		}
	}

	async update(ctx, next){
		const {id: _id} = ctx.params
		const role = ctx.request.body
		const result = await Role.findOneAndUpdate({_id}, role)
		ctx.body = {
			status: 0,
			data: result
		}
	}
}

module.exports = new RoleCtl()