import { useLayoutEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { loadSavedTimer, setUser } from './store/actions';
import { useCustomDispatch } from './hooks';
import { Authorization, Registration, Main, ProjectList, Project, Analytics, EditProfile } from './pages';
import { Modal, Error } from './components';
import { ERROR } from './constants';
import styles from './app.module.scss';

export const App = () => {
	const dispatch = useCustomDispatch();
	useLayoutEffect(() => {
		const currentUserDataJSON = sessionStorage.getItem('userData');
		if (!currentUserDataJSON) {
			return;
		}
		const currrentUserData = JSON.parse(currentUserDataJSON);
		dispatch(
			setUser({
				...currrentUserData,
				roleId: Number(currrentUserData.roleId),
			})
		);

		dispatch(loadSavedTimer());
	}, []);

	return (
		<div className={styles.app}>
			<div>
				<Routes>
					<Route path='/' element={<Main />} />
					<Route path='/login' element={<Authorization />} />
					<Route path='/register' element={<Registration />} />
					<Route path='/analytics' element={<Analytics />} />
					<Route path='/profile/edit' element={<EditProfile />} />
					<Route path='/projects' element={<ProjectList />} />
					<Route path='/project' element={<Project />} />
					<Route path='/project/:id' element={<Project />} />
					<Route path='/project/:id/edit' element={<Project />} />
					<Route path='*' element={<Error error={ERROR.PAGE_NOT_EXIST} />} />
				</Routes>
			</div>
			<Modal />
		</div>
	);
};
