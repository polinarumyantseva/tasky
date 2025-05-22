const mongoose = require('mongoose');

const TimerSchema = mongoose.Schema(
	{
		projectId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Project',
			required: true,
		},
		author: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		startTime: {
			type: Number,
			required: true,
		},
		endTime: {
			type: Number,
		},
		totalTime: {
			type: Number,
		},
		isActive: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Timer', TimerSchema);
