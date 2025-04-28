import { forwardRef } from 'react';
import { FormError } from '../formError/FormError';
import styles from './input.module.css';

export const Input = forwardRef(({ label = null, error = null, ...props }, ref) => {
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
