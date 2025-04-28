import styles from './infoCard.module.scss';

export const InfoCard = ({ children }) => {
	return <div className={styles['info-block']}>{children}</div>;
};
