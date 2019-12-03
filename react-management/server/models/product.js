const mongoose = require('mongoose')
const {model, Schema} = mongoose

const productSchema = new Schema({
	categoryId: {
		type: String,
		required: true
	},
	name: {
		type: String,
		required: true
	},
	price: {
		type: Number,
		required: true
	},
	desc: {
		type: String,
	},
	status: {
		type: Number,
		default: 1
	},
	imgs: {
		type: Array,
		default: []
	},
	detail: {
		type: String
	}

})

module.exports = model("Product", productSchema)