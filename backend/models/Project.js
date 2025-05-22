const mongoose = require('mongoose');
const projectStatus = require('../constants/projectStatus');

const ProjectSchema = mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		author: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
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
		timeEntries: [
			{
				date: {
					type: Date,
				},
				duration: {
					type: Number, // в секундах
				},
			},
		],
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Project', ProjectSchema);
