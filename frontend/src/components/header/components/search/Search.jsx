import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMatch, useNavigate } from 'react-router-dom';
import { debounce } from '../../utils';
import { Input, Icon } from '../../../../components';
import { setProjectsAsync, setSearchPhrase } from '../../../../store/actions';
import { selectSearchPhrase } from '../../../../store/selectors';
import { PAGINATION_LIMIT } from '../../../../constants/paginationLimit';
import styles from './search.module.scss';

export const Search = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const isProjects = !!useMatch('/projects');
	const searchPhrase = useSelector(selectSearchPhrase);

	const handleSearchDebounced = useMemo(
		() =>
			debounce((searchPhrase) => {
				if (searchPhrase.trim() && !isProjects) {
					navigate('/projects');
				}
				dispatch(setProjectsAsync(searchPhrase, 1, PAGINATION_LIMIT));
			}, 2000),
		[dispatch]
	);

	const onSearch = ({ target }) => {
		const newPhrase = target.value;
		dispatch(setSearchPhrase(newPhrase));

		handleSearchDebounced(newPhrase);
	};

	return (
		<div className={styles['search']}>
			<Input value={searchPhrase} placeholder='Найти проект' onChange={onSearch} />
			<Icon name='search' className='search-icon' />
		</div>
	);
};
