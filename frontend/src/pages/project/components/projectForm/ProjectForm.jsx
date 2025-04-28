import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useMatch, useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Input, Title, Icon } from '../../../../components';
import { request, hoursToSeconds } from '../../../../utils';
import { saveProjectAsync } from '../../../../store/actions';
import styles from './projectForm.module.scss';

const projectFormSchema = yup.object().shape({
	title: yup.string().required('Необходимо заполнить Название проекта'),
	estimation: yup
		.string()
		.matches(/^\d*\.?\d+$/, 'Значение необходимо заполнить через точку')
		.required('Необходимо заполнить Оценка трудозатрат'),
});

export const ProjectForm = () => {
	const [projectData, setProjectData] = useState({});
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const isCreating = !!useMatch('/project');
	const { id } = useParams();

	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			title: projectData.title,
			estimation: projectData.estimation,
			description: projectData.description,
		},
		resolver: yupResolver(projectFormSchema),
	});

	if (!isCreating) {
		useEffect(() => {
			request(`/api/projects/${id}`).then(({ data }) => {
				setProjectData(data);
				reset(data);
			});
		}, [dispatch, reset]);
	}

	const onSubmit = ({ title, estimation, description }) => {
		const formatEstimation = hoursToSeconds(estimation);

		dispatch(saveProjectAsync(id, { title, estimation: formatEstimation, description })).then(() =>
			navigate('/projects')
		);
	};

	return (
		<div className={styles['project']}>
			<Title>{isCreating ? 'Добавить проект' : projectData.title}</Title>

			<div className={styles['project-form']}>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className={styles['name-block']}>
						<Input
							type='text'
							label='Название проекта'
							name='title'
							error={errors?.title?.message}
							{...register('title')}
						/>
						<Input
							type='text'
							label='Оценка трудозатрат (в часах)'
							name='estimation'
							error={errors?.estimation?.message}
							{...register('estimation')}
						/>
					</div>
					<Input type='text' label='Описание' name='description' {...register('description')} />
					<div className={styles['form-buttons']}>
						<Button buttonType='secondary' onClick={() => navigate('/projects')}>
							Отмена
						</Button>
						<Button type='submit' buttonType='primary' className='button-with-icon'>
							<Icon name='check' /> Сохранить
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
};
