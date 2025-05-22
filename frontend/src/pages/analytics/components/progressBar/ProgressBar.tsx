import { formatTime } from '../../../../utils';
import styles from './progressBar.module.scss';

interface ProgressBarProps {
	duration: number;
	estimation: number;
}

export const ProgressBar = ({ duration, estimation }: ProgressBarProps) => {
	const progressPercent = estimation > 0 ? Math.floor((duration / estimation) * 100) : 0;

	const getProgressColor = () => {
		if (progressPercent === 100) return '#f9bb19';
		if (progressPercent > 100) return '#f44336';
		return '#4caf50';
	};

	const remainingSeconds = Math.max(0, estimation - duration);

	return (
		<div className={styles['progress-bar']}>
			<div className={styles['progress-bar-labels']}>
				<span>
					<b>Затрачено:</b> {formatTime(duration)}
				</span>
				<span>
					<b>Осталось:</b> {formatTime(remainingSeconds)}
				</span>
			</div>

			<div className={styles['progress-bar-track']}>
				<div
					className={styles['progress-bar-bar']}
					style={{
						width: `${progressPercent > 100 ? 100 : progressPercent}%`,
						backgroundColor: getProgressColor(),
					}}
				>
					<span className={styles['progress-bar-value']}>{progressPercent.toFixed(0)}%</span>
				</div>
			</div>

			<div className={styles['progress-bar-total-label']}>
				<b>Всего:</b> {formatTime(estimation)}
			</div>
		</div>
	);
};
