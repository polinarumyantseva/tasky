import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { formatTime, request } from '../../../../utils';
import { Icon, InfoCard } from '../../../../components';
import { ProgressBar } from '../progressBar/ProgressBar';
import styles from './weeklyAnalytics.module.scss';

interface WeeklyData {
	projectId: number;
	name: string;
	duration: number;
	estimation: number;
}

export const WeeklyAnalytics = () => {
	const [weeklyData, setWeeklyData] = useState<WeeklyData[]>([]);

	useEffect(() => {
		request('/api/projects/analytics/weekly').then(({ data }) => {
			setWeeklyData(data);
		});
	}, []);

	const totalTime = weeklyData.map((w) => w.duration).reduce((acc, cur) => acc + cur, 0);

	return (
		<div className={styles['weekly-chart-wrapper']}>
			<InfoCard>
				{weeklyData.length > 0 ? (
					<>
						<p className={styles['total-time-title']}>
							Итого за неделю:
							<span className={styles['total-time-value']}>{formatTime(totalTime)}</span>
						</p>
						<div className={styles['weekly-time-block']}>
							{weeklyData.map(({ name, projectId, duration, estimation }) => (
								<div key={projectId} className={styles['weekly-time']}>
									<div className={styles['weekly-time-info']}>
										<p className={styles['weekly-time-duration']}>{formatTime(duration)}</p>
										<Link to={`/project/${projectId}`} className={styles['weekly-time-name']}>
											<Icon name='folder' className='folder-icon' />
											{name}
										</Link>
									</div>
									<ProgressBar duration={duration} estimation={estimation} />
								</div>
							))}
						</div>
					</>
				) : (
					<div className={styles['no-time']}>На неделе нет затраченного времени</div>
				)}
			</InfoCard>
		</div>
	);
};
