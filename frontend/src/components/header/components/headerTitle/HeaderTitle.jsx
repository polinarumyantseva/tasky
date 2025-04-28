import styles from './headerTitle.module.scss';

export const HeaderTitle = ({ children }) => {
	return <h3 className={styles['header-title']}>{children}</h3>;
};
