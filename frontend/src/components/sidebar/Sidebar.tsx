import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Logo } from '../logo/Logo';
import { Icon } from '../icon/Icon';
import styles from './sidebar.module.scss';
import { Button } from '../button/Button';

export const Sidebar = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 1024);

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth < 1024);
			if (window.innerWidth >= 1024) setIsOpen(true);
		};
		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	const sidebarIsOpenClassName = isOpen ? `${styles.open}` : '';
	const sidebarIsMobileClassName = isMobile ? `${styles.mobile}` : '';

	return (
		<>
			{isMobile && (
				<Button className={styles['hamburger-btn']} onClick={() => setIsOpen(!isOpen)}>
					<Icon name='hamburger' />
				</Button>
			)}
			<div className={`${styles.sidebar} ${sidebarIsOpenClassName} ${sidebarIsMobileClassName}`}>
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

			{isOpen && isMobile && <div className={styles['sidebar-overlay']} onClick={() => setIsOpen(false)} />}
		</>
	);
};
