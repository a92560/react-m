const mongoose = require('mongoose')
const {
	model,
	Schema
} = mongoose

const userSchema = new Schema({
	__v: {
		select: false,
		type: Number
	},
	username: {
		type: String,
		select: true
	},
	password: {
		type: String,
		select: false
	},
	create_time: {
		type: Date,
		default: Date.now()
	},
	phone: {
		type: String,
		select: true,
		default: ""
	},
	email: {
		type: String,
		select: true,
		default: ""
	},
	role_id: {
		type: String,
		default: "5de3c0919aae732c4c9febcd"
	}
})

// 集合名称会变成users
module.exports = model("User", userSchema)