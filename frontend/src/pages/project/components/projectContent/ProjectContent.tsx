import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { formatTime, request } from '../../../../utils';
import { ProjectTypes } from '../../../../store/types';
import { Button, Icon } from '../../../../components';
import { CLOSE_MODAL, openModal, removeProjectAsync } from '../../../../store/actions';
import { useCustomDispatch } from '../../../../hooks';
import styles from './projectContent.module.scss';

export const ProjectContent = () => {
	const navigate = useNavigate();
	const dispatch = useCustomDispatch();

	const { id } = useParams();
	const [projectData, setProjectData] = useState<Omit<ProjectTypes, 'timeEntries'>>({
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

	const onProjectRemove = (id: string) => {
		dispatch(
			openModal({
				text: 'Удалить проект?',
				onConfirm: () => {
					dispatch(removeProjectAsync(id)).then(() => navigate('/projects'));
					dispatch(CLOSE_MODAL);
				},
				onCancel: () => dispatch(CLOSE_MODAL),
			})
		);
	};

	const combinedClassName = `${styles[`project-status`]} ${styles[`project-status-${projectData.status}`]}`;

	return (
		<>
			<div className={styles['project-buttons']}>
				<Button buttonType='secondary' onClick={() => navigate(-1)}>
					Назад
				</Button>
				{id && (
					<>
						<Button buttonType='primary' onClick={() => navigate(`/project/${id}/edit`)}>
							Редактировать
						</Button>
						<Button onClick={() => onProjectRemove(id)}>Удалить</Button>
					</>
				)}
			</div>
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
