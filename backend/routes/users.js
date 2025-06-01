const express = require('express');
const { getUsers, getRoles, updateUser, deleteUser, getUser } = require('../controllers/user');
const hasRole = require('../middlewares/hasRole');
const authenticated = require('../middlewares/authenticated');
const mapUser = require('../helpers/mapUser');
const ROLES = require('../constants/roles');

const router = express.Router({ mergeParams: true });

router.get('/', authenticated, hasRole([ROLES.ADMIN]), async (req, res) => {
	try {
		const users = await getUsers();

		res.send({ data: users.map(mapUser) });
	} catch (e) {
		res.send({ error: e.message || 'Unknown error' });
	}
});

router.get('/user', authenticated, async (req, res) => {
	try {
		const user = await getUser(req.user.id);

		res.send({ data: mapUser(user) });
	} catch (e) {
		res.send({ error: e.message || 'Unknown error' });
	}
});

router.patch('/user', authenticated, async (req, res) => {
	try {
		const newUser = await updateUser(req.user.id, {
			name: req.body.name,
			surname: req.body.surname,
			email: req.body.email,
			phone: req.body.phone,
		});

		res.send({ data: mapUser(newUser) });
	} catch (e) {
		res.send({ error: e.message || 'Unknown error' });
	}
});

router.get('/roles', authenticated, hasRole([ROLES.ADMIN]), async (req, res) => {
	try {
		const roles = getRoles();

		res.send({ data: roles });
	} catch (e) {
		res.send({ error: e.message || 'Unknown error' });
	}
});

router.delete('/:id', authenticated, hasRole([ROLES.ADMIN]), async (req, res) => {
	try {
		await deleteUser(req.params.id);

		res.send({ error: null });
	} catch (e) {
		res.send({ error: e.message || 'Unknown error' });
	}
});

module.exports = router;
