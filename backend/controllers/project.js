const Project = require('../models/Project');

async function addProject(project) {
	const newProject = await Project.create(project);

	return newProject;
}
function getProject(id) {
	return Project.findById(id);
}

function deleteProject(id) {
	return Project.deleteOne({ _id: id });
}

async function editProject(id, project) {
	const updatedProject = await Project.findByIdAndUpdate(id, project, { returnDocument: 'after' });
	return updatedProject;
}

async function getProjects(search = '', limit = 10, page = 1) {
	const [projects, count] = await Promise.all([
		Project.find({ title: { $regex: search, $options: 'i' } })
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
	return await Project.find({}).select('_id title');
}

module.exports = {
	getProject,
	getProjects,
	addProject,
	editProject,
	deleteProject,
	getProjectsTitle,
};
