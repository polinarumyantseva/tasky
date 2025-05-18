import styles from './loader.module.scss';

export const Loader = () => (
	<div className={styles.loader}>
		<div className={styles.spinner}></div>
	</div>
);
