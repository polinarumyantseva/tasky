const bcrypt = require('bcrypt');
const User = require('../models/User');
const { generate } = require('../helpers/token');
const ROLES = require('../constants/roles');

async function register(login, password, name, surname, email) {
	if (!password) {
		throw new Error('Пароль не задан');
	}

	const passwordHash = await bcrypt.hash(password, 10);
	const user = await User.create({ login, password: passwordHash, name, surname, email });
	const token = generate({ id: user.id });

	return { token, user };
}

async function login(login, password) {
	const user = await User.findOne({ login });

	if (!user) {
		throw new Error('Пользователь не найден');
	}

	const isPasswordMatch = await bcrypt.compare(password, user.password);

	if (!isPasswordMatch) {
		throw new Error('Пароль неверный');
	}

	const token = generate({ id: user.id });

	return { token, user };
}

function getUser(id) {
	return User.findById(id);
}

function updateUser(id, userData) {
	return User.findByIdAndUpdate(id, userData, { returnDocument: 'after' });
}

function getUsers() {
	return User.find();
}

function getRoles() {
	return [
		{ id: ROLES.ADMIN, name: 'Admin' },
		{ id: ROLES.USER, name: 'User' },
	];
}

function deleteUser(id) {
	return User.deleteOne({ _id: id });
}

module.exports = {
	register,
	login,
	getUser,
	getUsers,
	getRoles,
	deleteUser,
	updateUser,
};
