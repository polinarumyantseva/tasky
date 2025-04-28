import styles from './formError.module.scss';

export const FormError = ({ children }) => {
	return <div className={styles['error-message']}>{children}</div>;
};
