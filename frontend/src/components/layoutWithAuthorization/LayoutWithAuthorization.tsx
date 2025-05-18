import { ReactNode } from 'react';
import { Sidebar } from '../sidebar/Sidebar';
import { Header } from '../header/Header';
import { PrivateContent } from '../privateContent/PrivateContent';
import styles from './layoutWithAuthorization.module.scss';
import { ROLE } from '../../constants';

interface LayoutWithAuthorizationProps {
	pageTitle: string;
	children: ReactNode;
}

export const LayoutWithAuthorization = ({ pageTitle, children }: LayoutWithAuthorizationProps) => {
	return (
		<PrivateContent access={[ROLE.ADMIN, ROLE.USER]}>
			<div className={styles.layout}>
				<Sidebar />
				<div className={styles['content-wrapper']}>
					<Header pageTitle={pageTitle} />
					<div className={styles.content}>
						<div className={styles['inner-content-block']}>{children}</div>
					</div>
				</div>
			</div>
		</PrivateContent>
	);
};
