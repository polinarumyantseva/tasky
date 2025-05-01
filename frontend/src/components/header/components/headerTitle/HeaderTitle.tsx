import { ReactNode } from 'react';
import styles from './headerTitle.module.scss';

interface HeaderTitleProps {
	children: ReactNode;
}

export const HeaderTitle = ({ children }: HeaderTitleProps) => {
	return <h3 className={styles['header-title']}>{children}</h3>;
};
