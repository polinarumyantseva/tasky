import { useMatch } from 'react-router-dom';
import { ProjectForm } from './components';
import { LayoutWithAuthorization } from '../../components';
import styles from './project.module.scss';

export const Project = () => {
	const isCreating = !!useMatch('/project');
	const isEditing = !!useMatch('/project/:id/edit');

	return (
		<LayoutWithAuthorization pageTitle='Проекты'>
			<div className={styles.project}>{isCreating || isEditing ? <ProjectForm /> : <></>}</div>
		</LayoutWithAuthorization>
	);
};
