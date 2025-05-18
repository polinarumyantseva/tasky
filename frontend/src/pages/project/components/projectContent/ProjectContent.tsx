import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { formatTime, request } from '../../../../utils';
import { ProjectTypes } from '../../../../store/types';
import { Button, Icon } from '../../../../components';
import styles from './projectContent.module.scss';

export const ProjectContent = () => {
	const navigate = useNavigate();
	const { id } = useParams();
	const [projectData, setProjectData] = useState<ProjectTypes>({
		id: '',
		title: '',
		author: '',
		estimation: 0,
		description: '',
		publishedAt: new Date(),
		totalTrackedTime: 0,
		status: 0,
		statusName: '',
	});

	useEffect(() => {
		request(`/api/projects/${id}`).then(({ data }) => {
			setProjectData(data);
		});
	}, []);

	const combinedClassName = `${styles[`project-status`]} ${styles[`project-status-${projectData.status}`]}`;

	return (
		<>
			<Button buttonType='secondary' onClick={() => navigate('/projects')}>
				Назад
			</Button>
			<div className={styles['project']}>
				<div className={combinedClassName}>{projectData.statusName}</div>

				<div className={styles['project-name']}>
					<Icon name='folder' className='folder-icon' />
					{projectData.title}
				</div>

				{projectData.description && (
					<div className={styles['project-value']}>
						<p className={styles['label']}>Описание:</p>
						<p>{projectData.description}</p>
					</div>
				)}

				<div className={styles['project-value']}>
					<p className={styles['label']}>Автор:</p>
					<p>{projectData.author}</p>
				</div>

				<div className={styles['project-value']}>
					<p className={styles['label']}>Дата создания:</p>
					<p>{new Date(projectData.publishedAt).toLocaleString('ru')}</p>
				</div>

				<div className={styles['project-value']}>
					<p className={styles['label']}>Оценка трудозатрат:</p>
					<p>{formatTime(projectData.estimation)}</p>
				</div>

				{projectData.totalTrackedTime > 0 && (
					<div className={styles['project-value']}>
						<p className={styles['label']}>Затрачено:</p>
						<p>{formatTime(projectData.totalTrackedTime)}</p>
					</div>
				)}
			</div>
		</>
	);
};
