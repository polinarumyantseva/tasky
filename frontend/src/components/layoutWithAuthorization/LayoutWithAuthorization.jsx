import { Sidebar } from '../sidebar/Sidebar';
import { Header } from '../header/Header';
import styles from './layoutWithAuthorization.module.scss';

export const LayoutWithAuthorization = ({ pageTitle, children }) => {
	return (
		<div className={styles.layout}>
			<Sidebar />
			<div className={styles['content-wrapper']}>
				<Header pageTitle={pageTitle} />
				<div className={styles.content}>
					<div className={styles['inner-content-block']}>{children}</div>
				</div>
			</div>
		</div>
	);
};
