import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { logout, setUser } from '../../store/actions';
import { Button, Icon, Input, LayoutWithAuthorization, Title } from '../../components';
import { request } from '../../utils';
import { AppDispatch } from '../../store/store';
import styles from './editProfile.module.scss';

const editFormSchema = yup.object().shape({
	name: yup.string().required('Необходимо заполнить Имя'),
	surname: yup.string().required('Необходимо заполнить Фамилию'),
	email: yup
		.string()
		.required('Необходимо заполнить Email')
		.matches(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Неверный формат поля Email'),
});

interface UserData {
	name: string;
	surname: string;
	email: string;
	phone?: string;
}

export const EditProfile = () => {
	const [userData, setUserData] = useState<UserData>({
		name: '',
		surname: '',
		email: '',
		phone: '',
	});
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();

	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm<UserData>({
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

	const onSubmit = (formData: UserData) => {
		const { name, surname, email, phone } = formData;
		request('/api/user', 'PATCH', { name, surname, email, phone }).then(({ data }) => {
			dispatch(setUser(data));
			sessionStorage.setItem('userData', JSON.stringify(data));
		});
	};

	return (
		<LayoutWithAuthorization pageTitle='Личный кабинет'>
			<div>
				<div className={styles['profile-title-block']}>
					<Title>Редактирование профиля</Title>
					<Button type='submit' buttonType='primary' className='button-with-icon' onClick={onLogout}>
						<Icon name='exit' /> Выход
					</Button>
				</div>

				<div>
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className={styles['name-block']}>
							<Input type='text' label='Имя' error={errors?.name?.message} {...register('name')} />
							<Input
								type='text'
								label='Фамилия'
								error={errors?.surname?.message}
								{...register('surname')}
							/>
						</div>
						<div className={styles['name-block']}>
							<Input type='text' label='Email' error={errors?.email?.message} {...register('email')} />
							<Input type='text' label='Номер телефона' {...register('phone')} />
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
