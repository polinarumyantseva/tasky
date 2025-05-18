import { useState, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { SingleValue } from 'react-select';
import { Button, Icon, LayoutWithAuthorization, Loader } from '../../components';
import { Filters, Pagination, ProjectCard, SortControl } from './components';
import { PAGINATION_LIMIT } from '../../constants/paginationLimit';
import { setProjectsAsync } from '../../store/actions';
import { selectFilters, selectProjects, selectSearchPhrase } from '../../store/selectors';
import { useCustomDispatch } from '../../hooks';
import { ProjectTypes } from '../../store/types';
import styles from './projectList.module.scss';

interface SortOptionsProps {
	value: string;
	label: string;
}

export const ProjectList = () => {
	const navigate = useNavigate();
	const dispatch = useCustomDispatch();
	const projects = useSelector(selectProjects);
	const searchPhrase = useSelector(selectSearchPhrase);
	const filters = useSelector(selectFilters);

	const [page, setPage] = useState<number>(1);
	const [lastPage, setLastPage] = useState<number>(1);
	const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
	const [selectedOption, setSelectedOption] = useState<SingleValue<SortOptionsProps>>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	useEffect(() => {
		setIsLoading(true);
		dispatch(setProjectsAsync(searchPhrase, page, PAGINATION_LIMIT))
			.then(({ lastPage }) => {
				setLastPage(lastPage);
				setIsLoading(false);
			})
			.catch((e) => {
				console.log(e);
				setIsLoading(false);
			});
	}, [page]);

	const handleSort = (option: SingleValue<SortOptionsProps>) => {
		setSelectedOption(option);
	};

	const compareValues = (a: ProjectTypes, b: ProjectTypes, value: string) => {
		switch (value) {
			case 'createdAtAsc':
				return new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime();
			case 'createdAtDesc':
				return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
			case 'timeSpentAsc':
				return a.totalTrackedTime - b.totalTrackedTime;
			case 'timeSpentDesc':
				return b.totalTrackedTime - a.totalTrackedTime;
			default:
				return 0;
		}
	};

	const filteredProject = useMemo(() => {
		setIsLoading(true);
		let result = projects.filter((project) => {
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

		if (selectedOption) {
			result = result.sort((a, b) => compareValues(a, b, selectedOption.value));
		}

		setIsLoading(false);

		return result;
	}, [projects, filters, selectedOption]);

	return (
		<LayoutWithAuthorization pageTitle='Проекты'>
			<div className={styles.projects}>
				<div className={styles['projects-create-block']}>
					<div className={styles['filter-and-sort-block']}>
						<Button
							buttonType='secondary'
							className='button-with-icon'
							onClick={() => setIsFilterOpen(!isFilterOpen)}
						>
							<Icon name='filter' /> Фильтры
						</Button>
						<SortControl selectedOption={selectedOption} handleSort={handleSort} />
					</div>
					<Button buttonType='primary' className='button-with-icon' onClick={() => navigate('/project')}>
						<Icon name='create' /> Создать проект
					</Button>
				</div>
				{isFilterOpen && <Filters />}

				{isLoading ? (
					<Loader />
				) : filteredProject.length ? (
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
