var mongoose = require('mongoose');
var modeSchema = new mongoose.Schema({
	name: String,
	schedule: Array
});

module.exports = mongoose.model('Mode', modeSchema);