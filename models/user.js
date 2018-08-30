const mongoose   = require('mongoose');

const UserSchema = new mongoose.Schema({
	email: {
		type: String,
		trim: true,
		lowercase: true,
		unique: true,
		required: true,
	},
	name: {
		first: {
			type: String,
			trim: true,
            required: true,
            max: 100
		},
		last: {
			type: String,
			trim: true,
            required: true,
            max: 100
		},
	},
});

module.exports = mongoose.model('User', UserSchema)