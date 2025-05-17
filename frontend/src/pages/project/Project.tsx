import { useMatch } from 'react-router-dom';
import { ProjectContent, ProjectForm } from './components';
import { LayoutWithAuthorization } from '../../components';

export const Project = () => {
	const isCreating = !!useMatch('/project');
	const isEditing = !!useMatch('/project/:id/edit');

	return (
		<LayoutWithAuthorization pageTitle='Проекты'>
			<div>{isCreating || isEditing ? <ProjectForm /> : <ProjectContent />}</div>
		</LayoutWithAuthorization>
	);
};
