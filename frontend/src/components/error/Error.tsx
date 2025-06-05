import { Logo } from '../logo/Logo';
import styles from './error.module.scss';

interface ErrorProps {
	error: string;
}

export const Error = ({ error }: ErrorProps) => {
	const errorImg = '/images/error-img.svg';

	return (
		error && (
			<div className={styles['error-wrapper']}>
				<div className={styles['error']}>
					<Logo />
					<img src={errorImg} />
				</div>
				<div className={styles['error-text-block']}>
					<div className={styles['error-text']}>{error}</div>
				</div>
			</div>
		)
	);
};
