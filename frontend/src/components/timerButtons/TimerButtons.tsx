import { useSelector } from 'react-redux';
import { Button } from '../button/Button';
import { Icon } from '../icon/Icon';
import { selectTimer } from '../../store/selectors';
import { useCustomDispatch } from '../../hooks';
import { pauseTimer, resumeTimer, stopTimerAsync } from '../../store/actions';
import styles from './timerButtons.module.scss';

export const TimerButtons = () => {
	const dispatch = useCustomDispatch();
	const timer = useSelector(selectTimer);

	const handlePauseTimer = () => {
		dispatch(pauseTimer());
	};

	const handleResumeTimer = () => {
		dispatch(resumeTimer());
	};

	const handleStopTimer = () => {
		const endTime = Date.now();
		const totalTimeInSeconds = Math.floor(timer.totalTime / 1000);
		const selectedProject = JSON.parse(localStorage.getItem('projectNameState') || '');

		dispatch(stopTimerAsync(selectedProject.value, timer.timerId!, endTime, totalTimeInSeconds));
		localStorage.removeItem('projectNameState');
	};
	return (
		<>
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
		</>
	);
};
