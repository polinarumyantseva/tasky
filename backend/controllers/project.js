const Project = require('../models/Project');
const PROJECT_STATUS = require('../constants/projectStatus');

async function addProject(project) {
	const newProject = await Project.create(project);

	await newProject.populate('author');

	return newProject;
}
function getProject(id) {
	return Project.findById(id).populate('author');
}

function deleteProject(id) {
	return Project.deleteOne({ _id: id });
}

async function editProject(id, project) {
	const updatedProject = await Project.findByIdAndUpdate(id, project, { returnDocument: 'after' });
	await updatedProject.populate('author');

	return updatedProject;
}

async function getProjects(search = '', limit = 10, page = 1) {
	const [projects, count] = await Promise.all([
		Project.find({ title: { $regex: search, $options: 'i' } })
			.populate('author')
			.limit(limit)
			.skip((page - 1) * limit)
			.sort({ createdAt: -1 }),
		Project.countDocuments({ title: { $regex: search, $options: 'i' } }),
	]);

	return {
		projects,
		lastPage: Math.ceil(count / limit),
	};
}

async function getProjectsTitle() {
	return await Project.find({
		status: { $ne: PROJECT_STATUS.CLOSED },
	}).select('_id title');
}

function getProjectStatus() {
	return [
		{ id: PROJECT_STATUS.OPEN, name: 'Открыто' },
		{ id: PROJECT_STATUS.IN_PROGRESS, name: 'В работе' },
		{ id: PROJECT_STATUS.CLOSED, name: 'Закрыто' },
	];
}

module.exports = {
	getProject,
	getProjects,
	addProject,
	editProject,
	deleteProject,
	getProjectsTitle,
	getProjectStatus,
};
