const Timer = require('../models/Timer');
const Project = require('../models/Project');
const PROJECT_STATUS = require('../constants/projectStatus');

async function startTimer(timer) {
	const existingTimer = await Timer.findOne({ projectId: timer.projectId, author: timer.author });

	if (existingTimer) {
		existingTimer.startTime = timer.startTime;
		existingTimer.totalTime = timer.totalTime;
		await existingTimer.save();

		return existingTimer;
	}

	const newTimer = await Timer.create(timer);
	await newTimer.populate('author');
	await Project.findByIdAndUpdate(
		timer.projectId,
		{ status: PROJECT_STATUS.IN_PROGRESS },
		{ returnDocument: 'after' }
	);

	return newTimer;
}

async function stopTimer(projectId, timerId, endTime, totalTime, currentTime) {
	await Timer.findByIdAndUpdate(timerId, { endTime, totalTime, isActive: false }, { returnDocument: 'after' });
	await Project.findByIdAndUpdate(
		projectId,
		{
			$set: { totalTrackedTime: totalTime, status: PROJECT_STATUS.IN_PROGRESS },
			$push: {
				timeEntries: {
					date: new Date(),
					duration: currentTime,
				},
			},
		},
		{ returnDocument: 'after' }
	);
}

module.exports = {
	startTimer,
	stopTimer,
};
