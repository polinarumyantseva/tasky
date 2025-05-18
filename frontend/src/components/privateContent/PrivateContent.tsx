import { useSelector } from 'react-redux';
import { selectUserRoleId } from '../../store/selectors';
import { Error } from '../error/Error';
import { ERROR, ROLE } from '../../constants';
import { checkAccess } from '../../utils';

interface PrivateContentProps {
	children: React.ReactNode;
	access: ROLE[];
	serverError?: string;
}

export const PrivateContent = ({ children, access, serverError }: PrivateContentProps) => {
	const userRole = useSelector(selectUserRoleId);

	const accessError = checkAccess(access, userRole) ? null : ERROR.ACCESS_DENIED;
	const error = serverError || accessError;

	return error ? <Error error={error} /> : children;
};
