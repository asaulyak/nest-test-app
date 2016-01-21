var mongoose = require('mongoose');
var deviceSchema = new mongoose.Schema({
	deviceId: String,
	schedule: Array
});

module.exports = mongoose.model('Device', deviceSchema);