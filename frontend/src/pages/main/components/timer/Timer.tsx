import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Select, { SingleValue } from 'react-select';
import { useCustomDispatch } from '../../../../hooks';
import { FormError, TimerButtons } from '../../../../components';
import { selectTimer } from '../../../../store/selectors';
import { formatTime } from '../../../../utils';
import { startTimer } from '../../../../store/actions';
import styles from './timer.module.scss';

interface IProject {
	title: string;
	_id: string;
}
interface TimerProps {
	projects: IProject[];
}

interface OptionType {
	value: string;
	label: string;
}

export const Timer = ({ projects }: TimerProps) => {
	const dispatch = useCustomDispatch();
	const [seconds, setSeconds] = useState<number>(0);
	const [selectedOption, setSelectedOption] = useState<SingleValue<OptionType>>(null);
	const [projectError, setProjectError] = useState<string | null>(null);

	const options: OptionType[] =
		projects.length > 0 ? projects.map(({ _id, title }) => ({ value: _id, label: title })) : [];

	const timer = useSelector(selectTimer);

	const handleStartTimer = () => {
		if (selectedOption) {
			setProjectError(null);
			dispatch(startTimer(selectedOption.value));
			setSeconds(0);

			// console.log(timer);
		} else {
			setProjectError('Необходимо выбрать проект');
		}
	};

	useEffect(() => {
		let interval: number;
		if (timer.isActive && !timer.isPaused) {
			interval = setInterval(() => {
				setSeconds((prev) => prev + 1);
			}, 1000);
		}

		return () => clearInterval(interval);
	}, [timer.isActive, timer.isPaused]);

	return (
		<div className={styles['timer-block-wrapper']}>
			<div className={styles['timer-block']}>
				<p className={styles['title']}>{timer.isActive ? 'Остановить таймер' : 'Запустить таймер'}</p>
				<TimerButtons
					handleStartTimer={handleStartTimer}
					setSeconds={setSeconds}
					selectedOption={selectedOption}
					setSelectedOption={setSelectedOption}
				/>
			</div>
			{timer.isActive ? (
				<div className={styles['timer-display']}>
					<p>{selectedOption?.label || 'Неизвестный проект'}</p>
					<span className={styles['timer-display-value']}>{formatTime(seconds)}</span>
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
