const User = require("../models/user.js")
const Role = require("../models/role.js")

class UserCtl{
	async login(ctx, next){
		const {username, password} = ctx.request.body
		const user = await User.findOne({username, password})
		if(user){
			const menus = await Role.findById(user.role_id).select("menus")
			ctx.body = {
				status: 0,
				data: {
					...user._doc,
					role: {
						menus: menus.menus
					}
				}
			}
		}else{
			ctx.body = {
				status: -1,
				message: "用户名或密码错误"
			}
		}
	}

	async find(ctx, next){
		try{
			const selectFields = "_id name"
			const users = await User.find().sort({'create_time': -1})
			const total = await User.count()
			const roles = await Role.find().select(selectFields)
			ctx.body = {
				status: 0,
				data: {
					users,
					roles,
					total
				}
			}
		}catch(error){
			ctx.body = {
				status: -1,
				message: error.message
			}
		}
		
	}

	async update(ctx, next){
		const {id: _id} = ctx.params
		const user = ctx.request.body
		const result = await User.findOneAndUpdate({_id}, user)
		if(result){
			ctx.body = {
				status: 0,
				data: {
					...result._doc,
					...user
				}
			}
		}else{
			ctx.body = {
				status: 0,
				message: "服务器错误，请稍后重试。"
			}
		}
	}

	// 创建用户
	async create(ctx, next){
		const user = ctx.request.body
		const result = await new User(user).save()
		try{
			ctx.body = {
				status: 0,
				data: result
			}
		}catch(error){
			ctx.body = {
				status: -1,
				message: error.message
			}
		}
		
	}

	// 删除用户
	async delete(ctx, next){
		const {id: _id} = ctx.params
		const result = await User.findOneAndDelete({_id})
		if(result){
			ctx.body = {
				status: 0,
				data: result
			}
		}else{
			ctx.body = {
				status: -1,
				message: "删除用户失败，请稍后重试。"
			}
		}
	}
}

module.exports = new UserCtl()