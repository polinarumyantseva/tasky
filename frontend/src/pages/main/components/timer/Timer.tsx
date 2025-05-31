import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Select, { SingleValue } from 'react-select';
import { useCustomDispatch } from '../../../../hooks';
import { Button, FormError, Icon, TimerButtons } from '../../../../components';
import { selectTimer } from '../../../../store/selectors';
import { formatTime } from '../../../../utils';
import { startTimerAsync, updateTimer } from '../../../../store/actions';
import styles from './timer.module.scss';

interface Project {
	title: string;
	_id: string;
}
interface TimerProps {
	projects: Project[];
}

interface OptionType {
	value: string;
	label: string;
}

export const Timer = ({ projects }: TimerProps) => {
	const dispatch = useCustomDispatch();

	const timer = useSelector(selectTimer);
	const options: OptionType[] =
		projects.length > 0 ? projects.map(({ _id, title }) => ({ value: _id, label: title })) : [];

	const projectNameState = localStorage.getItem('projectNameState');
	const selectedProject = projectNameState ? JSON.parse(projectNameState).label : null;
	const totalTimeInSeconds = Math.floor(timer.totalTime / 1000);

	const [selectedOption, setSelectedOption] = useState<SingleValue<OptionType>>(selectedProject);
	const [projectError, setProjectError] = useState<string | null>(null);

	const handleStartTimer = () => {
		if (selectedOption) {
			setProjectError(null);
			dispatch(startTimerAsync(selectedOption.value));
			localStorage.setItem('projectNameState', JSON.stringify(selectedOption));
		} else {
			setProjectError('Необходимо выбрать проект');
		}
	};

	useEffect(() => {
		let interval: number;
		if (timer.isActive && !timer.isPaused) {
			interval = setInterval(() => {
				dispatch(updateTimer());
			}, 1000);
		}

		return () => clearInterval(interval);
	}, [timer.isActive, timer.isPaused, dispatch]);

	return (
		<div className={styles['timer-block-wrapper']}>
			<div className={styles['timer-block']}>
				<p className={styles['title']}>{timer.isActive ? 'Остановить таймер' : 'Запустить таймер'}</p>
				{timer.isActive ? (
					<TimerButtons />
				) : (
					<Button buttonType='primary' className={styles['icon-block']} onClick={handleStartTimer}>
						<Icon name='play' />
					</Button>
				)}
			</div>
			{timer.isActive ? (
				<div className={styles['timer-display']}>
					<p>{selectedProject || 'Неизвестный проект'}</p>
					<span className={styles['timer-display-value']}>{formatTime(totalTimeInSeconds)}</span>
				</div>
			) : (
				options.length > 0 && (
					<label className={styles['select-label']}>
						Выберите проект
						<Select
							options={options}
							placeholder='Проект...'
							className={styles['select-project']}
							onChange={setSelectedOption}
						/>
						{projectError && <FormError>{projectError}</FormError>}
					</label>
				)
			)}
		</div>
	);
};
