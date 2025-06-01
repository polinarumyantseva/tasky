import { Button } from '../../../../components';
import styles from './userCard.module.scss';

interface UserCardProps {
	id: string;
	login: string;
	name: string;
	surname: string;
	email: string;
	phone: string;
	registedAt: string;
	onUserRemove: (userId: string) => void;
}

export const UserCard = ({ id, name, surname, email, phone, login, registedAt, onUserRemove }: UserCardProps) => {
	const handleRemoveClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.stopPropagation();
		onUserRemove(id);
	};

	return (
		<div className={styles['user-item']}>
			<div className={styles['user']}>
				<div className={styles['user-desc']}>
					<p className={styles['label']}>Фамилия Имя:</p>
					<p>
						{name} {surname}
					</p>
				</div>
				<div className={styles['user-desc']}>
					<p className={styles['label']}>Логин:</p>
					<p>{login}</p>
				</div>
				<div className={styles['user-desc']}>
					<p className={styles['label']}>Email:</p>
					<p>{email}</p>
				</div>
				{phone && (
					<div className={styles['user-desc']}>
						<p className={styles['label']}>Телефон:</p>
						<p>{phone}</p>
					</div>
				)}
				<div className={styles['user-desc']}>
					<p className={styles['label']}>Дата регистрации:</p>
					<p>{new Date(registedAt).toLocaleString('ru')}</p>
				</div>
			</div>
			<Button onClick={handleRemoveClick}>Удалить</Button>
		</div>
	);
};
