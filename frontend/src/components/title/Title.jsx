import styles from './title.module.scss';

export const Title = ({ children }) => {
	return <h1 className={styles.title}>{children}</h1>;
};
