const express = require('express');
const { startTimer, stopTimer } = require('../controllers/timer');
const mapTimer = require('../helpers/mapTimer');
const authenticated = require('../middlewares/authenticated');
const { getProject } = require('../controllers/project');

const router = express.Router({ mergeParams: true });

router.post('/start', authenticated, async (req, res) => {
	const newTimer = await startTimer({
		projectId: req.body.projectId,
		author: req.user.id,
		startTime: Date.now(),
		totalTime: 0,
	});

	res.send({ data: mapTimer(newTimer) });
});

router.post('/stop', authenticated, async (req, res) => {
	const project = await getProject(req.body.projectId);
	const totalTime = project.totalTrackedTime + req.body.totalTime;

	await stopTimer(req.body.projectId, req.body.timerId, req.body.endTime, totalTime);

	res.send({ error: null });
});

module.exports = router;
