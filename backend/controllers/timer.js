const Timer = require('../models/Timer');
const Project = require('../models/Project');

async function startTimer(timer) {
	const newTimer = await Timer.create(timer);
	await newTimer.populate('author');

	return newTimer;
}

async function stopTimer(projectId, timerId, endTime, totalTime) {
	await Timer.findByIdAndUpdate(timerId, { endTime, duration: totalTime }, { returnDocument: 'after' });
	await Project.findByIdAndUpdate(projectId, { totalTrackedTime: totalTime }, { returnDocument: 'after' });
}

module.exports = {
	startTimer,
	stopTimer,
};
