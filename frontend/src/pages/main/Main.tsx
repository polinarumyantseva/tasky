import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { request } from '../../utils';
import { Icon, LayoutWithAuthorization, InfoCard } from '../../components';
import { ROLE } from '../../constants';
import { selectUserRoleId } from '../../store/selectors';
import { Timer } from './components';
import styles from './main.module.scss';

interface IProject {
	title: string;
	_id: string;
}

export const Main = () => {
	const roleId = useSelector(selectUserRoleId);
	const [projects, setProjects] = useState<IProject[]>([]);
	// const [projectsCount, setProjectsCount] = useState<number>(0);

	useEffect(() => {
		request('/api/projects/titles').then(({ data }) => {
			setProjects(data);
			// setProjectsCount(data.length);
		});
	}, []);

	if (roleId === ROLE.GUEST) {
		return <Navigate to='/login' />;
	}

	return (
		<LayoutWithAuthorization pageTitle='Главная'>
			<div className={styles['data-block']}>
				<p className={styles['data-block-title']}>Сегодня</p>
				<p className={styles['data-block-value']}>{new Date().toLocaleString('ru')}</p>
			</div>

			<Timer projects={projects} />

			{/* TODO: Возможно стоит перенести эти блоки в аналитику */}
			{/* <div className={styles['main-wrapper']}>
				<div className={styles['info-block-wrapper']}>
					<InfoCard>
						<p className={styles['info-block-title']}>Время за сегодня</p>
						<div className={styles['info-block-value']}>
							<p className={styles['value']}>40:00:05</p>
							<div className={styles['icon']}>
								<Icon name='time' />
							</div>
						</div>
					</InfoCard>
					<InfoCard>
						<p className={styles['info-block-title']}>Всего проектов</p>
						<div className={styles['info-block-value']}>
							<p className={styles['value']}>{projectsCount}</p>
							<div className={styles['icon']}>
								<Icon name='folder' />
							</div>
						</div>
					</InfoCard>
				</div>
			</div> */}
		</LayoutWithAuthorization>
	);
};
