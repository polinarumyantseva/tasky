const mongoose = require('mongoose');
const mapTimer = require('./mapTimer');

module.exports = function (project) {
	return {
		id: project.id,
		title: project.title,
		estimation: project.estimation,
		description: project.description,
		publishedAt: project.createdAt,
		totalTrackedTime: project.totalTrackedTime,
	};
};
