import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Select from 'react-select';
import { Button, FormError, Icon } from '../../../../components';
import { selectTimer } from '../../../../store/selectors';
import { formatTime } from '../../../../utils';
import { pauseTimer, resumeTimer, startTimer, stopTimer } from '../../../../store/actions';
import styles from './timer.module.scss';

export const Timer = ({ projects }) => {
	const dispatch = useDispatch();
	const [seconds, setSeconds] = useState(0);
	const [selectedOption, setSelectedOption] = useState(null);
	const [projectError, setProjectError] = useState(null);

	const options = [];
	projects.length > 0 && projects.map(({ _id, title }) => options.push({ value: _id, label: title }));

	const timer = useSelector(selectTimer);

	useEffect(() => {
		let interval = null;
		if (timer.isActive && !timer.isPaused) {
			interval = setInterval(() => {
				setSeconds((prev) => prev + 1);
			}, 1000);
		}

		return () => clearInterval(interval);
	}, [timer.isActive, timer.isPaused]);

	const handleStartTimer = () => {
		if (selectedOption) {
			setProjectError(null);
			dispatch(startTimer(selectedOption.value));
			setSeconds(0);
		} else {
			setProjectError('Необходимо выбрать проект');
		}
	};
	const handlePauseTimer = () => {
		dispatch(pauseTimer());
	};
	const handleResumeTimer = () => {
		dispatch(resumeTimer());
	};
	const handleStopTimer = () => {
		const endTime = Date.now();
		const totalTime = timer.isPaused ? timer.totalTime : timer.totalTime + (endTime - timer.startTime);
		const totalTimeInSeconds = Math.floor(totalTime / 1000);

		dispatch(stopTimer(selectedOption.value, timer.timerId, endTime, totalTimeInSeconds));
	};

	return (
		<div className={styles['timer-block-wrapper']}>
			<div className={styles['timer-block']}>
				<p className={styles['title']}>{timer.isActive ? 'Остановить таймер' : 'Запустить таймер'}</p>
				{timer.isActive ? (
					<div className={styles['timer-buttons']}>
						{timer.isPaused ? (
							<Button className={styles['icon-block']} onClick={handleResumeTimer}>
								<Icon name='play' />
							</Button>
						) : (
							<Button className={styles['icon-block']} onClick={handlePauseTimer}>
								<Icon name='pause' />
							</Button>
						)}
						<Button buttonType='primary' className={styles['icon-block']} onClick={handleStopTimer}>
							<Icon name='stop' />
						</Button>
					</div>
				) : (
					<Button buttonType='primary' className={styles['icon-block']} onClick={handleStartTimer}>
						<Icon name='play' />
					</Button>
				)}
			</div>
			{timer.isActive ? (
				<div className={styles['timer-display']}>
					<p>{selectedOption.title}</p>
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
