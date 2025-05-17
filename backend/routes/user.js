const express = require('express');
const { getUsers, getRoles, updateUser, deleteUser, getUser } = require('../controllers/user');
const hasRole = require('../middlewares/hasRole');
const authenticated = require('../middlewares/authenticated');
const mapUser = require('../helpers/mapUser');
const ROLES = require('../constants/roles');

const router = express.Router({ mergeParams: true });

// router.get('/', authenticated, hasRole([ROLES.ADMIN]), async (req, res) => {
// 	const users = await getUsers();

// 	res.send({ data: users.map(mapUser) });
// });

router.get('/', authenticated, async (req, res) => {
	try {
		const user = await getUser(req.user.id);

		res.send({ data: mapUser(user) });
	} catch (e) {
		res.send({ error: e.message || 'Unknown error' });
	}
});

router.patch('/', authenticated, async (req, res) => {
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

// router.get('/roles', authenticated, hasRole([ROLES.ADMIN]), async (req, res) => {
// 	const roles = getRoles();

// 	res.send({ data: roles });
// });

// router.delete('/:id', authenticated, hasRole([ROLES.ADMIN]), async (req, res) => {
// 	await deleteUser(req.params.id);

// 	res.send({ error: null });
// });

module.exports = router;
