import { useEffect, useState } from 'react';
import Select, { SingleValue } from 'react-select';
import { useMatch, useNavigate, useParams } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Input, Title, Icon } from '../../../../components';
import { request, formatTime, timeToSeconds } from '../../../../utils';
import { saveProjectAsync } from '../../../../store/actions';
import { useCustomDispatch } from '../../../../hooks';
import styles from './projectForm.module.scss';

const projectFormSchema = yup.object().shape({
	title: yup.string().required('Необходимо заполнить Название проекта'),
	estimation: yup
		.string()
		.matches(/^\d+:?\d+:[0-5]\d:[0-5]\d$/, 'Значение указано некорректно. Пример: 10:30:00')
		.required('Необходимо заполнить Оценка трудозатрат'),
});

interface ProjectData {
	title: string;
	estimation: string;
	description?: string;
	totalTrackedTime?: string;
	status?: number;
}

interface ProjectStatusesProps {
	id: number;
	name: string;
}
interface OptionType {
	value: number;
	label: string;
}

export const ProjectForm = () => {
	const [projectStatuses, setProjectStatuses] = useState<ProjectStatusesProps[]>([]);
	const [projectData, setProjectData] = useState<ProjectData>({
		title: '',
		estimation: '',
		description: '',
		totalTrackedTime: '',
		status: 0,
	});
	const navigate = useNavigate();
	const dispatch = useCustomDispatch();
	const isCreating = !!useMatch('/project');
	const { id } = useParams();

	const options: OptionType[] =
		projectStatuses.length > 0 ? projectStatuses.map(({ id, name }) => ({ value: id, label: name })) : [];

	const {
		control,
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm<ProjectData>({
		defaultValues: {
			title: projectData.title,
			estimation: projectData.estimation,
			description: projectData.description,
			totalTrackedTime: projectData.totalTrackedTime,
			status: projectData.status,
		},
		resolver: yupResolver(projectFormSchema),
	});

	useEffect(() => {
		request('/api/projects/statuses').then(({ data }) => {
			setProjectStatuses(data);
		});

		if (!isCreating) {
			request(`/api/projects/${id}`).then(({ data }) => {
				data.estimation = formatTime(data.estimation);
				data.totalTrackedTime = formatTime(data.totalTrackedTime);

				setProjectData(data);
				reset(data);
			});
		}
	}, [dispatch, reset]);

	const onSubmit = (formData: ProjectData) => {
		const { title, estimation, description } = formData;
		const formatEstimation = timeToSeconds(estimation);

		dispatch(saveProjectAsync(id, { title, estimation: formatEstimation, description })).then(() =>
			navigate('/projects')
		);
	};

	return (
		<div>
			<Title>{isCreating ? 'Добавить проект' : projectData.title}</Title>

			<form onSubmit={handleSubmit(onSubmit)}>
				<Input type='text' label='Название проекта' error={errors?.title?.message} {...register('title')} />
				<div className={styles['name-block']}>
					<label className={styles['select-label']}>
						Статус
						<Controller
							name='status'
							control={control}
							render={({ field }) => (
								<Select
									{...field}
									options={options}
									className={styles['select-project']}
									value={options.find((opt) => opt.value === field.value)}
									onChange={(option) => field.onChange(option?.value)}
								/>
							)}
						/>
					</label>

					<Input
						type='text'
						placeholder='00:45'
						label='Оценка трудозатрат'
						error={errors?.estimation?.message}
						{...register('estimation')}
					/>
					<Input
						type='text'
						label='Затрачено (в часах)'
						error={errors?.totalTrackedTime?.message}
						{...register('totalTrackedTime')}
					/>
				</div>
				<Input type='text' label='Описание' {...register('description')} />
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
	);
};
