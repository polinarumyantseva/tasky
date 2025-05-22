import { LayoutWithAuthorization } from '../../components';
import { DailyAnalytics, WeeklyAnalytics } from './components';
import styles from './analytics.module.scss';

export const Analytics = () => {
	return (
		<LayoutWithAuthorization pageTitle='Аналитика'>
			<div className={styles['analytic-wrapper']}>
				<WeeklyAnalytics />
				<DailyAnalytics />
			</div>
		</LayoutWithAuthorization>
	);
};
