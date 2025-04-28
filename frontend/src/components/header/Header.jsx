import { Link } from 'react-router-dom';
import { Search, HeaderTitle } from './components';
import { Icon } from '../icon/Icon';
import { useSelector } from 'react-redux';
import { selectUserName } from '../../store/selectors';
import styles from './header.module.scss';

export const Header = ({ pageTitle }) => {
	const userName = useSelector(selectUserName);

	return (
		<div className={styles.header}>
			<HeaderTitle>{pageTitle}</HeaderTitle>
			<Search />
			<Link className={styles['user-name-block']} to='/profile/edit'>
				{userName}
				<div className={styles['user-icon']}>
					<Icon name='user' />
				</div>
			</Link>
		</div>
	);
};
