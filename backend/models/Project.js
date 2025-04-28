const mongoose = require('mongoose');

const ProjectSchema = mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		estimation: {
			type: Number,
		},
		description: {
			type: String,
		},
		totalTrackedTime: {
			type: Number,
			default: 0,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Project', ProjectSchema);
