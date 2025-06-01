import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { request } from '../../utils';
import { LayoutWithAuthorization } from '../../components';
import { ROLE } from '../../constants';
import { selectUserRoleId } from '../../store/selectors';
import { Timer } from './components';
import styles from './main.module.scss';

interface ProjectProps {
	title: string;
	_id: string;
}

export const Main = () => {
	const roleId = useSelector(selectUserRoleId);
	const [projects, setProjects] = useState<ProjectProps[]>([]);
	const [currentTime, setCurrentTime] = useState<string>(new Date().toLocaleString());

	useEffect(() => {
		request('/api/projects/titles').then(({ data }) => {
			setProjects(data);
		});

		const timerId = setInterval(() => {
			setCurrentTime(new Date().toLocaleString());
		}, 1000);

		return () => clearInterval(timerId);
	}, []);

	if (roleId === ROLE.GUEST) {
		return <Navigate to='/login' />;
	}

	return (
		<LayoutWithAuthorization pageTitle='Главная'>
			<div className={styles['data-block']}>
				<p className={styles['data-block-title']}>Сегодня</p>
				<p className={styles['data-block-value']}>{currentTime}</p>
			</div>

			<Timer projects={projects} />
		</LayoutWithAuthorization>
	);
};
