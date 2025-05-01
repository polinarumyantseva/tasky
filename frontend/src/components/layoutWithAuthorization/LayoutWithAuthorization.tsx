import { Sidebar } from '../sidebar/Sidebar';
import { Header } from '../header/Header';
import { ReactNode } from 'react';
import styles from './layoutWithAuthorization.module.scss';

interface LayoutWithAuthorizationProps {
	pageTitle: string;
	children: ReactNode;
}

export const LayoutWithAuthorization = ({ pageTitle, children }: LayoutWithAuthorizationProps) => {
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
