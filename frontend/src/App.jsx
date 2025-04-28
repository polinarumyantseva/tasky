import { useLayoutEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { setUser } from './store/actions';
import { Authorization, Registration, Main, ProjectList, Project, Analytics, EditProfile } from './pages';
import { Modal } from './components';
// import { Error } from './components';
// import { ERROR } from './constants';
import styles from './app.module.scss';

export const App = () => {
	const dispatch = useDispatch();
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
	}, []);

	return (
		<div className={styles.app}>
			<div className={styles.content}>
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
					{/* <Route path="*" element={<Error error={ERROR.PAGE_NOT_EXIST} />} /> */}
				</Routes>
			</div>
			<Modal />
		</div>
	);
};
