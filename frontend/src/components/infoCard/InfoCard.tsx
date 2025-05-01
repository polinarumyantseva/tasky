import { ReactNode } from 'react';
import styles from './infoCard.module.scss';

interface InfoCardProps {
	children: ReactNode;
}

export const InfoCard = ({ children }: InfoCardProps) => {
	return <div className={styles['info-block']}>{children}</div>;
};
