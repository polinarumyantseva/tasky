import { NavLink } from 'react-router-dom';
import { Logo } from '../logo/Logo';
import { Icon } from '../icon/Icon';
import styles from './sidebar.module.scss';

export const Sidebar = () => {
	return (
		<div className={styles.sidebar}>
			<Logo />
			<div className={styles['sidebar-menu']}>
				<NavLink className={styles['sidebar-menu-item']} to='/'>
					<Icon name='sidebar-main' />
					Главная
				</NavLink>
				<NavLink className={styles['sidebar-menu-item']} to='/analytics'>
					<Icon name='sidebar-analytic' />
					Аналитика
				</NavLink>
				<NavLink className={styles['sidebar-menu-item']} to='/time'>
					<Icon name='sidebar-time' />
					Время
				</NavLink>
				<NavLink className={styles['sidebar-menu-item']} to='/projects'>
					<Icon name='sidebar-project' />
					Проекты
				</NavLink>
			</div>
		</div>
	);
};
