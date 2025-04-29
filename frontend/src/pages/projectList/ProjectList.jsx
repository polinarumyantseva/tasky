import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, Icon, LayoutWithAuthorization } from '../../components';
import { Pagination, ProjectCard } from './components';
import { PAGINATION_LIMIT } from '../../constants/paginationLimit';
import { setProjectsAsync } from '../../store/actions';
import { selectProjects, selectSearchPhrase } from '../../store/selectors';
import styles from './projectList.module.scss';

export const ProjectList = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const projects = useSelector(selectProjects);
	const searchPhrase = useSelector(selectSearchPhrase);

	const [page, setPage] = useState(1);
	const [lastPage, setLastPage] = useState(1);

	useEffect(() => {
		dispatch(setProjectsAsync(searchPhrase, page, PAGINATION_LIMIT)).then(({ lastPage }) => {
			setLastPage(lastPage);
		});
	}, [page]);

	return (
		<LayoutWithAuthorization pageTitle='Проекты'>
			<div className={styles.projects}>
				<div className={styles['projects-create-block']}>
					<Button buttonType='primary' className='button-with-icon' onClick={() => navigate('/project')}>
						<Icon name='create' /> Создать проект
					</Button>
				</div>
				{projects.length ? (
					<div className={styles['projects-list']}>
						{projects.map(({ id, title, estimation, description, publishedAt, totalTrackedTime }) => (
							<ProjectCard
								key={id}
								id={id}
								title={title}
								estimation={estimation}
								description={description}
								publishedAt={publishedAt}
								totalTrackedTime={totalTrackedTime}
							/>
						))}
					</div>
				) : (
					<div className={styles['no-projects-found']}>Проекты не найдены</div>
				)}
				{lastPage > 1 && projects.length > 0 && (
					<Pagination page={page} lastPage={lastPage} setPage={setPage} />
				)}
			</div>
		</LayoutWithAuthorization>
	);
};
