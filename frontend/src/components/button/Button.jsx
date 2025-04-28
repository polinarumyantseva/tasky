import styles from './button.module.scss';

export const Button = ({ children, buttonType, className = '', ...props }) => {
	const buttonClassName = buttonType === 'primary' ? styles[`primary-button`] : styles[`secondary-button`];
	const combinedClassName = `${buttonClassName} ${className}`;

	return (
		<button className={combinedClassName} {...props}>
			{children}
		</button>
	);
};
