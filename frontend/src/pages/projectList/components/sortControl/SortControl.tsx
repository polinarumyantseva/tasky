import Select, { SingleValue } from 'react-select';
import styles from './sortControl.module.scss';

interface SortOptionsProps {
	value: string;
	label: string;
}

interface SortControlProps {
	selectedOption: SingleValue<SortOptionsProps>;
	handleSort: (value: SingleValue<SortOptionsProps>) => void;
}

const sortOptions: SortOptionsProps[] = [
	{ value: 'timeSpentAsc', label: '↑ По затраченному времени' },
	{ value: 'timeSpentDesc', label: '↓ По затраченному времени' },
	{ value: 'createdAtAsc', label: '↑ По дате создания' },
	{ value: 'createdAtDesc', label: '↓ По дате создания' },
];

export const SortControl = ({ selectedOption, handleSort }: SortControlProps) => {
	return (
		<>
			<Select
				options={sortOptions}
				placeholder='Отсортировать по...'
				className={styles['select-sort-options']}
				value={selectedOption}
				onChange={handleSort}
				isClearable
			/>
		</>
	);
};
