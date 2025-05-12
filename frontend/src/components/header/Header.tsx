import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { SingleValue } from 'react-select';
import { Search, HeaderTitle } from './components';
import { Icon } from '../icon/Icon';
import { selectTimer, selectUserName } from '../../store/selectors';
import { TimerButtons } from '../timerButtons/TimerButtons';
import { formatTime } from '../../utils';
import styles from './header.module.scss';

interface HeaderProps {
	pageTitle: string;
}
interface OptionType {
	value: string;
	label: string;
}

export const Header = ({ pageTitle }: HeaderProps) => {
	const userName = useSelector(selectUserName);
	const [seconds, setSeconds] = useState<number>(0);
	const [selectedOption, setSelectedOption] = useState<SingleValue<OptionType>>(null);
	const [projectError, setProjectError] = useState<string | null>(null);

	const timer = useSelector(selectTimer);

	// console.log(timer);

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
		<div className={styles.header}>
			<HeaderTitle>{pageTitle}</HeaderTitle>
			{timer.isActive && (
				<div className={styles['header-timer-display']}>
					<span className={styles['header-timer-display-value']}>{formatTime(seconds)}</span>
					<TimerButtons
						setSeconds={setSeconds}
						setProjectError={setProjectError}
						selectedOption={selectedOption}
						setSelectedOption={setSelectedOption}
					/>
				</div>
			)}
			<Search />
			<Link className={styles['user-name-block']} to='/profile/edit'>
				{userName}
				<div className={styles['user-icon']}>
					<Icon name='user' />
				</div>
			</Link>
		</div>
	);
};
