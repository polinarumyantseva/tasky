import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { UserCard } from './components';
import { LayoutWithAuthorization } from '../../components';
import { selectUserRoleId } from '../../store/selectors';
import { checkAccess, request } from '../../utils';
import { ROLE } from '../../constants';
import styles from './users.module.scss';

interface UserCardProps {
	id: string;
	login: string;
	name: string;
	surname: string;
	email: string;
	phone: string;
	registedAt: string;
	onUserRemove: (userId: string) => void;
}

export const Users = () => {
	const [users, setUsers] = useState<UserCardProps[]>([]);
	const [setShouldUpdateUserList, setSetShouldUpdateUserList] = useState(false);
	const userRole = useSelector(selectUserRoleId);

	useEffect(() => {
		if (!checkAccess([ROLE.ADMIN], userRole)) {
			return;
		}
		request('/api/users').then((usersRes) => {
			setUsers(usersRes.data);
		});
	}, [setShouldUpdateUserList, userRole]);

	const onUserRemove = (userId: string) => {
		if (!checkAccess([ROLE.ADMIN], userRole)) {
			return;
		}

		request(`/api/users/${userId}`, 'DELETE').then(() => {
			setSetShouldUpdateUserList(!setShouldUpdateUserList);
		});
	};

	return (
		<LayoutWithAuthorization pageTitle='Пользователи'>
			<div className={styles['users']}>
				{users.map(({ id, name, surname, email, phone, login, registedAt }) => (
					<UserCard
						key={id}
						id={id}
						login={login}
						name={name}
						surname={surname}
						email={email}
						phone={phone}
						registedAt={registedAt}
						onUserRemove={() => onUserRemove(id)}
					/>
				))}
			</div>
		</LayoutWithAuthorization>
	);
};
