import { InfoCard, LayoutWithAuthorization } from '../../components';
import styles from './analytics.module.scss';

export const Analytics = () => {
	return (
		<LayoutWithAuthorization pageTitle='Аналитика'>
			<div className={styles['analytic-wrapper']}>
				{/* <InfoCard></InfoCard>
				<InfoCard></InfoCard> */}
			</div>
		</LayoutWithAuthorization>
	);
};
