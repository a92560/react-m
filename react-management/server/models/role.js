const mongoose = require('mongoose')
const {
	model,
	Schema
} = mongoose

const roleSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	auth_name: String,
	auth_time: Number,
	create_time: {
		type: Number,
		default: Date.now()
	},
	menus: {
		type: Array,
		default: []
	}
})

module.exports = model("Role", roleSchema)