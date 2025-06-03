import { forwardRef, InputHTMLAttributes } from 'react';
import { FormError } from '../formError/FormError';
import styles from './input.module.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	error?: string;
}

export type Ref = HTMLInputElement;

export const Input = forwardRef<Ref, InputProps>(({ label = null, error = null, ...props }, ref) => {
	return label ? (
		<label className={styles.label}>
			{label}
			<input className={styles.input} {...props} ref={ref} />
			{error && <FormError>{error}</FormError>}
		</label>
	) : (
		<>
			<input className={styles.input} {...props} ref={ref} />
			{error && <FormError>{error}</FormError>}
		</>
	);
});
