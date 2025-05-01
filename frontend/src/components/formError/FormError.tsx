import { ReactNode } from 'react';
import styles from './formError.module.scss';

interface FormErrorProps {
	children: ReactNode;
}

export const FormError = ({ children }: FormErrorProps) => {
	return <div className={styles['error-message']}>{children}</div>;
};
