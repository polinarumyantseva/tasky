import { useState, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, Icon, LayoutWithAuthorization } from '../../components';
import { Filters, Pagination, ProjectCard } from './components';
import { PAGINATION_LIMIT } from '../../constants/paginationLimit';
import { setProjectsAsync } from '../../store/actions';
import { selectFilters, selectProjects, selectSearchPhrase } from '../../store/selectors';
import { useCustomDispatch } from '../../hooks';
import { ProjectTypes } from '../../store/types';
import styles from './projectList.module.scss';

export const ProjectList = () => {
	const navigate = useNavigate();
	const dispatch = useCustomDispatch();
	const projects = useSelector(selectProjects);
	const searchPhrase = useSelector(selectSearchPhrase);
	const filters = useSelector(selectFilters);

	const [page, setPage] = useState<number>(1);
	const [lastPage, setLastPage] = useState<number>(1);
	const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);

	useEffect(() => {
		dispatch(setProjectsAsync(searchPhrase, page, PAGINATION_LIMIT)).then(({ lastPage }) => {
			setLastPage(lastPage);
		});
	}, [page]);

	const filteredProject = useMemo(() => {
		return projects.filter((project) => {
			if (filters.status !== null && filters.status !== project.status) {
				return false;
			}

			if (filters.estimation.min > 0 && filters.estimation.min > project.estimation) {
				return false;
			}
			if (filters.estimation.max > 0 && filters.estimation.max < project.estimation) {
				return false;
			}

			return true;
		});
	}, [projects, filters]);

	// TODO: изменить иконку у кнопки Фильтры

	return (
		<LayoutWithAuthorization pageTitle='Проекты'>
			<div className={styles.projects}>
				<div className={styles['projects-create-block']}>
					<Button
						buttonType='secondary'
						className='button-with-icon'
						onClick={() => setIsFilterOpen(!isFilterOpen)}
					>
						<Icon name='create' /> Фильтры
					</Button>
					<Button buttonType='primary' className='button-with-icon' onClick={() => navigate('/project')}>
						<Icon name='create' /> Создать проект
					</Button>
				</div>
				{isFilterOpen && <Filters />}

				{filteredProject.length ? (
					<div className={styles['projects-list']}>
						{filteredProject.map(
							({
								id,
								title,
								estimation,
								description,
								publishedAt,
								totalTrackedTime,
								status,
								statusName,
							}: ProjectTypes) => (
								<ProjectCard
									key={id}
									id={id}
									title={title}
									estimation={estimation}
									description={description}
									publishedAt={publishedAt}
									totalTrackedTime={totalTrackedTime}
									status={status}
									statusName={statusName}
								/>
							)
						)}
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
