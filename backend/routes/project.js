const express = require('express');
const {
	getProjects,
	getProject,
	addProject,
	editProject,
	deleteProject,
	getProjectsTitle,
} = require('../controllers/project');
const mapProject = require('../helpers/mapProject');
const authenticated = require('../middlewares/authenticated');

const router = express.Router({ mergeParams: true });

router.get('/', authenticated, async (req, res) => {
	const { projects, lastPage } = await getProjects(req.query.search, req.query.limit, req.query.page);

	res.send({ data: { lastPage, projects: projects.map(mapProject) } });
});

router.get('/titles', authenticated, async (req, res) => {
	const titles = await getProjectsTitle();

	res.send({ data: titles });
});

router.get('/:id', authenticated, async (req, res) => {
	const project = await getProject(req.params.id);

	res.send({ data: mapProject(project) });
});

router.post('/', authenticated, async (req, res) => {
	const newProject = await addProject({
		title: req.body.title,
		description: req.body.description,
		estimation: req.body.estimation,
	});

	res.send({ data: mapProject(newProject) });
});

router.patch('/:id', authenticated, async (req, res) => {
	const updatedProject = await editProject(req.params.id, {
		title: req.body.title,
		description: req.body.description,
		estimation: req.body.estimation,
	});

	res.send({ data: mapProject(updatedProject) });
});

router.delete('/:id', authenticated, async (req, res) => {
	await deleteProject(req.params.id);

	res.send({ error: null });
});

module.exports = router;
