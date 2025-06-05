import { Link } from 'react-router-dom';

export const Logo = () => {
	const logo = '/images/logo.svg';
	return (
		<Link to='/'>
			<img src={logo} />
		</Link>
	);
};
