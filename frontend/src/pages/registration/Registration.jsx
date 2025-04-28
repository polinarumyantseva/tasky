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
import styles from './registration.module.scss';

const regFormSchema = yup.object().shape({
	login: yup
		.string()
		.required('Необходимо заполнить логин')
		.matches(/^\w+$/, 'Неверно заполнен логин. Допускаются только буквы и цифры')
		.min(3, 'Неверно заполнен логин. Минимум 3 символа')
		.max(15, 'Неверно заполнен логин. Максимум 15 символов'),
	email: yup
		.string()
		.required('Необходимо заполнить логин')
		.matches(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Неверный формат поля Email'),
	password: yup
		.string()
		.required('Необходимо заполнить пароль')
		.matches(/^[\w#%]+$/, 'Неверно заполнен пароль. Допускаются только буквы, цифры и знаки # %')
		.min(6, 'Неверно заполнен пароль. Минимум 6 символов')
		.max(30, 'Неверно заполнен пароль. Максимум 30 символов'),
	passcheck: yup
		.string()
		.required('Необходимо заполнить пароль')
		.oneOf([yup.ref('password'), null], 'Пароли не совпадают'),
});

export const Registration = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			name: '',
			surname: '',
			login: '',
			email: '',
			password: '',
			passcheck: '',
		},
		resolver: yupResolver(regFormSchema),
	});

	const [serverError, setServerError] = useState(null);
	const roleId = useSelector(selectUserRoleId);

	// useResetForm(reset);

	const onSubmit = ({ name, surname, login, email, password }) => {
		request('/api/register', 'POST', { name, surname, login, email, password }).then(({ error, user }) => {
			if (error) {
				setServerError(`Ошибка запроса: ${error}`);
				return;
			}

			dispatch(setUser(user));
			sessionStorage.setItem('userData', JSON.stringify(user));
			navigate('/');
		});
	};

	const formError =
		errors?.login?.message || errors?.email?.message || errors?.password?.message || errors?.passcheck?.message;
	// const errorMessage = formError || serverError;

	if (roleId !== ROLE.GUEST) {
		return <Navigate to='/' />;
	}

	return (
		<div className={styles['authorize-wrapper']}>
			<WelcomeBlock />
			<div className={styles['block-with-form']}>
				<Title>Регистрация</Title>
				<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
					<div className={styles['fio-block']}>
						<Input type='text' label='Имя' placeholder='Имя' {...register('name')} />
						<Input type='text' label='Фамилия' placeholder='Фамилия' {...register('surname')} />
					</div>
					<Input
						type='text'
						label='Логин'
						placeholder='Логин'
						error={errors?.login?.message}
						{...register('login', { onChange: () => setServerError(null) })}
					/>
					<Input
						type='text'
						label='Email'
						placeholder='text@mail.ru'
						error={errors?.email?.message}
						{...register('email', { onChange: () => setServerError(null) })}
					/>
					<Input
						type='password'
						label='Пароль'
						placeholder='Пароль'
						error={errors?.password?.message}
						{...register('password', { onChange: () => setServerError(null) })}
					/>
					<Input
						type='password'
						label='Повтор пароля'
						placeholder='Повтор пароля'
						error={errors?.passcheck?.message}
						{...register('passcheck', { onChange: () => setServerError(null) })}
					/>
					<div className={styles['buttons-container']}>
						<Button type='submit' buttonType='primary' disabled={!!formError}>
							Зарегистрироваться
						</Button>

						<Link className={styles['reg-buttom']} to='/login'>
							<Button buttonType='secondary'>Войти</Button>
						</Link>
					</div>
					{serverError && <FormError>{serverError}</FormError>}
				</form>
			</div>
		</div>
	);
};
