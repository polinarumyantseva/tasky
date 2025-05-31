import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useCustomDispatch } from '../../hooks';
import { Search, HeaderTitle } from './components';
import { Icon } from '../icon/Icon';
import { selectTimer, selectUserName } from '../../store/selectors';
import { TimerButtons } from '../timerButtons/TimerButtons';
import { formatTime } from '../../utils';
import { updateTimer } from '../../store/actions';
import styles from './header.module.scss';

interface HeaderProps {
	pageTitle: string;
}

export const Header = ({ pageTitle }: HeaderProps) => {
	const dispatch = useCustomDispatch();
	const timer = useSelector(selectTimer);
	const userName = useSelector(selectUserName);

	const totalTimeInSeconds = Math.floor(timer.totalTime / 1000);

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
		<div className={styles.header}>
			<HeaderTitle>{pageTitle}</HeaderTitle>
			{timer.isActive && (
				<div className={styles['header-timer-display']}>
					<span className={styles['header-timer-display-value']}>{formatTime(totalTimeInSeconds)}</span>
					<TimerButtons />
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
