const express = require('express');
const {
	getProjects,
	getProject,
	addProject,
	editProject,
	deleteProject,
	getProjectsTitle,
	getProjectStatus,
} = require('../controllers/project');
const mapProject = require('../helpers/mapProject');
const authenticated = require('../middlewares/authenticated');

const router = express.Router({ mergeParams: true });

router.get('/', authenticated, async (req, res) => {
	try {
		const { projects, lastPage } = await getProjects(req.query.search, req.query.limit, req.query.page);
		const projectStatus = getProjectStatus();

		const projectsWithStatus = projects.map(mapProject).map((project) => ({
			...project,
			statusName: projectStatus.find((item) => item.id === project.status).name,
		}));

		res.send({ data: { lastPage, projects: projectsWithStatus } });
	} catch (e) {
		res.send({ error: e.message || 'Unknown error' });
	}
});

router.get('/titles', authenticated, async (req, res) => {
	try {
		const titles = await getProjectsTitle();

		res.send({ data: titles });
	} catch (e) {
		res.send({ error: e.message || 'Unknown error' });
	}
});

router.get('/statuses', authenticated, async (req, res) => {
	try {
		const projectStatus = getProjectStatus();

		res.send({ data: projectStatus });
	} catch (e) {
		res.send({ error: e.message || 'Unknown error' });
	}
});

router.get('/:id', authenticated, async (req, res) => {
	try {
		const projectStatus = getProjectStatus();
		const project = await getProject(req.params.id);

		const projectsWithStatus = mapProject(project);
		projectsWithStatus.statusName = projectStatus.find((item) => item.id === project.status).name;

		res.send({ data: projectsWithStatus });
	} catch (e) {
		res.send({ error: e.message || 'Unknown error' });
	}
});

router.post('/', authenticated, async (req, res) => {
	try {
		const newProject = await addProject({
			title: req.body.title,
			author: req.user.id,
			description: req.body.description,
			estimation: req.body.estimation,
			totalTrackedTime: req.body.totalTrackedTime,
			status: req.body.status,
		});

		res.send({ data: mapProject(newProject) });
	} catch (e) {
		res.send({ error: e.message || 'Unknown error' });
	}
});

router.patch('/:id', authenticated, async (req, res) => {
	try {
		const updatedProject = await editProject(req.params.id, {
			title: req.body.title,
			description: req.body.description,
			estimation: req.body.estimation,
			totalTrackedTime: req.body.totalTrackedTime,
			status: req.body.status,
		});

		res.send({ data: mapProject(updatedProject) });
	} catch (e) {
		res.send({ error: e.message || 'Unknown error' });
	}
});

router.delete('/:id', authenticated, async (req, res) => {
	try {
		await deleteProject(req.params.id);

		res.send({ error: null });
	} catch (e) {
		res.send({ error: e.message || 'Unknown error' });
	}
});

module.exports = router;
