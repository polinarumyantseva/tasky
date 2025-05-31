const express = require('express');
const { startTimer, stopTimer } = require('../controllers/timer');
const mapTimer = require('../helpers/mapTimer');
const authenticated = require('../middlewares/authenticated');
const { getProject } = require('../controllers/project');

const router = express.Router({ mergeParams: true });

router.post('/start', authenticated, async (req, res) => {
	try {
		const newTimer = await startTimer({
			projectId: req.body.projectId,
			author: req.user.id,
			startTime: Date.now(),
			totalTime: 0,
			isActive: true,
		});

		res.send({ data: mapTimer(newTimer) });
	} catch (e) {
		res.send({ error: e.message || 'Unknown error' });
	}
});

router.post('/stop', authenticated, async (req, res) => {
	try {
		const project = await getProject(req.body.projectId);
		const currentTimeValue = req.body.totalTime;
		const totalTime = project.totalTrackedTime + currentTimeValue;

		await stopTimer(req.body.projectId, req.body.timerId, req.body.endTime, totalTime, currentTimeValue);

		res.send({ error: null });
	} catch (e) {
		res.send({ error: e.message || 'Unknown error' });
	}
});

module.exports = router;
