import { useSelector } from 'react-redux';
import { SingleValue } from 'react-select';
import { Button } from '../button/Button';
import { Icon } from '../icon/Icon';
import { selectTimer } from '../../store/selectors';
import { useCustomDispatch } from '../../hooks';
import { pauseTimer, resumeTimer, startTimer, stopTimer } from '../../store/actions';
import styles from './timerButtons.module.scss';

interface OptionType {
	value: string;
	label: string;
}

interface TimerButtonsProps {
	setSeconds: (sec: number) => void;
	setProjectError: (err: string | null) => void;
	selectedOption: SingleValue<OptionType>;
	setSelectedOption: (opt: SingleValue<OptionType>) => void;
}

export const TimerButtons = ({ setSeconds, setProjectError, selectedOption, setSelectedOption }: TimerButtonsProps) => {
	const dispatch = useCustomDispatch();
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

		dispatch(stopTimer(selectedOption!.value, timer.timerId!, endTime, totalTimeInSeconds)).then(() => {
			setSelectedOption(null);
			setSeconds(0);
		});
	};
	return (
		<>
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
		</>
	);
};
