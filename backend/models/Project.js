const mongoose = require('mongoose');
const projectStatus = require('../constants/projectStatus');

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
		status: {
			type: Number,
			default: projectStatus.OPEN,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Project', ProjectSchema);
