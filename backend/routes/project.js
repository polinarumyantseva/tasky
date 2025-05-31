const express = require('express');
const {
	getProjects,
	getProject,
	getProjectByTime,
	addProject,
	editProject,
	deleteProject,
	getProjectsTitle,
	getProjectStatus,
} = require('../controllers/project');
const mapProject = require('../helpers/mapProject');
const authenticated = require('../middlewares/authenticated');
const PROJECT_STATUS = require('../constants/projectStatus');

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

router.get('/analytics/daily', authenticated, async (req, res) => {
	try {
		const today = new Date();
		today.setHours(0, 0, 0, 0);

		const projects = await getProjectByTime(today);

		const dailyData = projects.map((project) => ({
			name: project.title,
			duration: project.timeEntries
				.filter((entry) => entry.date >= today)
				.reduce((sum, entry) => sum + entry.duration, 0),
		}));

		res.send({ data: dailyData });
	} catch (e) {
		res.send({ error: e.message || 'Unknown error' });
	}
});

router.get('/analytics/weekly', authenticated, async (req, res) => {
	try {
		const weekAgo = new Date();
		weekAgo.setDate(weekAgo.getDate() - 7);

		const projects = await getProjectByTime(weekAgo);

		const weeklyData = projects.map((project) => ({
			name: project.title,
			projectId: project.id,
			estimation: project.estimation,
			duration: project.timeEntries
				.filter((entry) => entry.date >= weekAgo)
				.reduce((sum, entry) => sum + entry.duration, 0),
		}));

		res.send({ data: weeklyData });
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
			timeEntries: req.body.totalTrackedTime ? req.body.timeEntries : [],
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
			status: req.body.totalTrackedTime ? req.body.status : PROJECT_STATUS.OPEN,
			timeEntries: req.body.timeEntries,
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
