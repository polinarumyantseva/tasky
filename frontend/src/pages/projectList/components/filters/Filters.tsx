import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select, { SingleValue } from 'react-select';
import { InputMask } from '@react-input/mask';
import { setStatusFilter, setEstimationFilter, RESET_FILTERS } from '../../../../store/actions';
import { Button, Input } from '../../../../components';
import { formatTime, request, timeToSeconds } from '../../../../utils';
import { selectFilters } from '../../../../store/selectors';
import styles from './filters.module.scss';

interface OptionType {
	value: number;
	label: string;
}
interface ProjectStatusesProps {
	id: number;
	name: string;
}

export const Filters = () => {
	const filters = useSelector(selectFilters);
	const dispatch = useDispatch();
	const [status, setStatus] = useState<number | null>(filters.status);
	const [estimationMin, setEstimationMin] = useState<string>(formatTime(filters.estimation.min));
	const [estimationMax, setEstimationMax] = useState<string>(formatTime(filters.estimation.max));
	const [projectStatuses, setProjectStatuses] = useState<ProjectStatusesProps[]>([]);

	const options: OptionType[] =
		projectStatuses.length > 0 ? projectStatuses.map(({ id, name }) => ({ value: id, label: name })) : [];

	useEffect(() => {
		request('/api/projects/statuses').then(({ data }) => {
			setProjectStatuses(data);
		});
	}, []);

	const handleApplyFilter = () => {
		dispatch(setStatusFilter(status));
		dispatch(
			setEstimationFilter(
				estimationMin ? timeToSeconds(estimationMin) : 0,
				estimationMax ? timeToSeconds(estimationMax) : 0
			)
		);
	};

	const handleReset = () => {
		dispatch(RESET_FILTERS);
		setStatus(null);
		setEstimationMin('');
		setEstimationMax('');
	};

	return (
		<>
			<div className={styles['project-filters']}>
				<div className={styles['filter-group']}>
					<label className={styles['select-label']}>
						Статус
						<Select
							options={options}
							placeholder='Статус...'
							className={styles['select-project']}
							value={status ? options.find((opt) => opt.value === status) : null}
							onChange={(newValue: SingleValue<OptionType>) =>
								setStatus(newValue ? newValue.value : null)
							}
						/>
					</label>
				</div>

				<div className={styles['filter-group']}>
					<label>Оценка трудозатрат</label>
					<div className={styles['estimation-range']}>
						<InputMask
							component={Input}
							placeholder='От'
							mask='__:__:__'
							value={estimationMin}
							replacement={{ _: /\d/ }}
							showMask
							separate
							onChange={(e) => setEstimationMin(e.target.value)}
						/>
						<span>—</span>
						<InputMask
							component={Input}
							placeholder='До'
							mask='__:__:__'
							value={estimationMax}
							replacement={{ _: /\d/ }}
							showMask
							separate
							onChange={(e) => setEstimationMax(e.target.value)}
						/>
					</div>
				</div>
			</div>

			<div className={styles['project-filters']}>
				<Button buttonType='primary' onClick={handleApplyFilter}>
					Применить
				</Button>
				<Button buttonType='secondary' onClick={handleReset}>
					Сбросить
				</Button>
			</div>
		</>
	);
};
