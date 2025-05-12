module.exports = function (project) {
	return {
		id: project.id,
		title: project.title,
		estimation: project.estimation,
		description: project.description,
		publishedAt: project.createdAt,
		totalTrackedTime: project.totalTrackedTime,
		status: project.status,
		statusName: project.statusName,
	};
};
