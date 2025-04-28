module.exports = function (timer) {
	return {
		projectId: timer.projectId,
		author: timer.author.login,
		timerId: timer._id,
		startTime: timer.startTime,
		endTime: timer.endTime,
		duration: timer.duration,
	};
};
