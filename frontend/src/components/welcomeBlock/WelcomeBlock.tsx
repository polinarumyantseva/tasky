import { Logo } from '../logo/Logo';
import styles from './welcomeBlock.module.scss';

export const WelcomeBlock = () => {
	const welcomeImg = '/images/welcome-img.svg';
	return (
		<div className={styles['welcome-block']}>
			<Logo />
			<img className={styles['welcome-img']} src={welcomeImg} />

			<div className={styles['welcome-text']}>Отслеживайте свое рабочее время!</div>
		</div>
	);
};
