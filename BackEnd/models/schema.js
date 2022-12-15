const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// const blogSchema = new Schema({
// 	title: {
// 		type: String,
// 		required: true
// 	},
// 	snippet: {
// 		type: String,
// 		required: true
// 	},
// 	body: {
// 		type: String,
// 		required: true
// 	}

// },{ timestamps: true});
const blogSchema = new Schema({
	sensors: {
		temperature: Number,
		humidity: Number,
		moisture: Number,
		light: Number,
		Heure: String,
		date: Date
		//date: String
	}
});
module.exports=mongoose.model('readings', blogSchema);