import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Button, Title, Input, WelcomeBlock, FormError } from '../../components';
import { request } from '../../utils';
import { setUser } from '../../store/actions';
import { ROLE } from '../../constants';
import { selectUserRoleId } from '../../store/selectors';
import { AppDispatch } from '../../store/store';
import styles from './authorization.module.scss';

const authFormSchema = yup.object().shape({
	login: yup
		.string()
		.required('Необходимо заполнить логин')
		.matches(/^\w+$/, 'Неверно заполнен логин. Допускаются только буквы и цифры')
		.min(3, 'Неверно заполнен логин. Минимум 3 символа')
		.max(15, 'Неверно заполнен логин. Максимум 15 символов'),
	password: yup
		.string()
		.required('Необходимо заполнить пароль')
		.matches(/^[\w#%]+$/, 'Неверно заполнен пароль. Допускаются только буквы, цифры и знаки # %')
		.min(6, 'Неверно заполнен пароль. Минимум 6 символов')
		.max(30, 'Неверно заполнен пароль. Максимум 30 символов'),
});

interface UserData {
	login: string;
	password: string;
}

export const Authorization = () => {
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<UserData>({
		defaultValues: {
			login: '',
			password: '',
		},
		resolver: yupResolver(authFormSchema),
	});

	const [serverError, setServerError] = useState<string | null>(null);
	const roleId = useSelector(selectUserRoleId);

	const onSubmit = (formData: UserData) => {
		const { login, password } = formData;
		request('/api/login', 'POST', { login, password }).then(({ error, user }) => {
			if (error) {
				setServerError(`Ошибка запроса: ${error}`);
				return;
			}
			dispatch(setUser(user));
			sessionStorage.setItem('userData', JSON.stringify(user));
			navigate('/');
		});
	};

	const formError = errors?.login?.message || errors?.password?.message;

	if (roleId !== ROLE.GUEST) {
		return <Navigate to='/' />;
	}

	return (
		<div className={styles['authorize-wrapper']}>
			<WelcomeBlock />
			<div className={styles['block-with-form']}>
				<Title>С возвращением!</Title>
				<form onSubmit={handleSubmit(onSubmit)}>
					<Input
						type='text'
						label='Логин'
						placeholder='Логин'
						error={errors?.login?.message}
						{...register('login', { onChange: () => setServerError(null) })}
					/>
					<Input
						type='password'
						label='Пароль'
						placeholder='Пароль'
						error={errors?.password?.message}
						{...register('password', { onChange: () => setServerError(null) })}
					/>
					<div className={styles['buttons-container']}>
						<Button type='submit' buttonType='primary' disabled={!!formError}>
							Войти
						</Button>

						<Link to='/register'>
							<Button buttonType='secondary'>Регистрация</Button>
						</Link>
					</div>
					{serverError && <FormError>{serverError}</FormError>}
				</form>
			</div>
		</div>
	);
};
