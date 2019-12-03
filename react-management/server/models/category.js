const mongoose = require('mongoose')
const {model, Schema} = mongoose

const categorySchema = new Schema({
	name: {
		type: String,
		required: true
	}
})
// categories
module.exports = model("categories", categorySchema)