import { useNavigate } from 'react-router-dom';
import { Icon } from '../../../../components';
import { removeProjectAsync, CLOSE_MODAL, openModal } from '../../../../store/actions';
import { formatTime } from '../../../../utils';
import { ProjectTypes } from '../../../../store/types';
import { useCustomDispatch } from '../../../../hooks';
import styles from './projectCard.module.scss';

export const ProjectCard = ({ id, title, estimation, description, publishedAt, totalTrackedTime }: ProjectTypes) => {
	const navigate = useNavigate();
	const dispatch = useCustomDispatch();

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

	return (
		<div className={styles['project']}>
			<div className={styles['project-name-block']}>
				<div className={styles['project-name']}>
					<Icon name='folder' className='folder-icon' />
					{title}
				</div>
				<div className={styles['action-block']}>
					<div className={styles['action-block-icon']} onClick={() => onProjectRemove(id)}>
						<Icon name='delete' />
					</div>
					<div className={styles['action-block-icon']} onClick={() => navigate(`/project/${id}/edit`)}>
						<Icon name='edit' />
					</div>
				</div>
			</div>

			{description && (
				<div className={styles['project-desc']}>
					<p className={styles['label']}>Описание:</p>
					<p>{description}</p>
				</div>
			)}
			<div className={styles['project-published-at']}>
				<p className={styles['label']}>Дата создания:</p>
				<p>{new Date(publishedAt).toLocaleString('ru')}</p>
			</div>
			<div className={styles['project-estimation']}>
				<p className={styles['label']}>Оценка трудозатрат:</p>
				<p className={styles['project-estimation-value']}>{formatTime(estimation, false)}</p>
			</div>
			{totalTrackedTime > 0 && (
				<div className={styles['project-estimation']}>
					<p className={styles['label']}>Затрачено:</p>
					<p className={styles['project-estimation-value']}>{formatTime(totalTrackedTime)}</p>
				</div>
			)}
		</div>
	);
};
