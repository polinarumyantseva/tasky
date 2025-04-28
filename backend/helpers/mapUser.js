module.exports = function (user) {
	return {
		id: user.id,
		login: user.login,
		name: user.name,
		surname: user.surname,
		email: user.email,
		phone: user.phone,
		roleId: user.role,
		registedAt: user.createdAt,
	};
};
