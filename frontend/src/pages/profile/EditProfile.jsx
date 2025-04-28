import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { logout, setUser } from '../../store/actions';
import { Button, Icon, Input, LayoutWithAuthorization, Title } from '../../components';
import styles from './editProfile.module.scss';
import { request } from '../../utils';

const editFormSchema = yup.object().shape({
	name: yup.string().required('Необходимо заполнить Имя'),
	surname: yup.string().required('Необходимо заполнить Фамилию'),
	email: yup
		.string()
		.required('Необходимо заполнить Email')
		.matches(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Неверный формат поля Email'),
});

export const EditProfile = () => {
	const [userData, setUserData] = useState({});
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			name: userData.name,
			surname: userData.surname,
			email: userData.email,
			phone: userData.phone,
		},
		resolver: yupResolver(editFormSchema),
	});

	useEffect(() => {
		request('/api/user').then(({ data }) => {
			setUserData(data);
			reset(data);
		});
	}, [dispatch, reset]);

	const onLogout = () => {
		dispatch(logout());
		sessionStorage.removeItem('userData');
		navigate('/login');
	};

	const onSubmit = ({ name, surname, email, phone }) => {
		request('/api/user', 'PATCH', { name, surname, email, phone }).then(({ data }) => {
			dispatch(setUser(data));
			sessionStorage.setItem('userData', JSON.stringify(data));
		});
	};

	return (
		<LayoutWithAuthorization pageTitle='Личный кабинет'>
			<div className={styles['profile-wrapper']}>
				<div className={styles['profile-title-block']}>
					<Title>Редактирование профиля</Title>
					<Button type='submit' buttonType='primary' className='button-with-icon' onClick={onLogout}>
						<Icon name='exit' /> Выход
					</Button>
				</div>

				<div className={styles['profile-form']}>
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className={styles['name-block']}>
							<Input
								type='text'
								label='Имя'
								name='name'
								error={errors?.name?.message}
								{...register('name')}
							/>
							<Input
								type='text'
								label='Фамилия'
								name='surname'
								error={errors?.surname?.message}
								{...register('surname')}
							/>
						</div>
						<div className={styles['name-block']}>
							<Input
								type='text'
								label='Email'
								name='email'
								error={errors?.email?.message}
								{...register('email')}
							/>
							<Input type='text' label='Номер телефона' name='phone' {...register('phone')} />
						</div>
						<div className={styles['form-buttons']}>
							<Button buttonType='secondary' onClick={() => navigate('/')}>
								Отмена
							</Button>
							<Button type='submit' buttonType='primary' className='button-with-icon'>
								<Icon name='check' /> Сохранить
							</Button>
						</div>
					</form>
				</div>
			</div>
		</LayoutWithAuthorization>
	);
};
