import { Logo } from '../logo/Logo';
import welcomeImg from '../../images/welcome-img.svg';
import styles from './welcomeBlock.module.scss';

export const WelcomeBlock = () => {
	return (
		<div className={styles['welcome-block']}>
			<Logo />
			<img className={styles['welcome-img']} src={welcomeImg} />

			<div className={styles['welcome-text']}>Отслеживайте свое рабочее время!</div>
		</div>
	);
};
