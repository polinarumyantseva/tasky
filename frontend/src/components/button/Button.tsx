import { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './button.module.scss';

type ButtonType = 'primary' | 'secondary';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode;
	buttonType?: ButtonType;
	className?: string;
}

export const Button = ({ children, buttonType, className = '', ...props }: ButtonProps) => {
	const buttonClassName =
		buttonType && buttonType === 'primary' ? styles[`primary-button`] : styles[`secondary-button`];
	const combinedClassName = `${buttonClassName} ${className}`;

	return (
		<button className={combinedClassName} {...props}>
			{children}
		</button>
	);
};
