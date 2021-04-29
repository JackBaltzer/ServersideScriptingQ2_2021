const mongoose = require('mongoose');
const { Schema } = mongoose;

const Book = new Schema({
	title: {type:String},
	author: {type:String},
	pages: {type:Number},
	read: {type:Boolean}
}, { versionKey: false });

module.exports = mongoose.model("Book", Book, 'books');