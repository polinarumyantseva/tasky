import { Button, Icon } from '../../../../components';
import styles from './pagination.module.scss';

export const Pagination = ({ page, lastPage, setPage }) => {
	const getDisplayedPages = () => {
		const pages = [];
		pages.push(1);

		// Определяем диапазон страниц вокруг текущей
		let startPage = Math.max(2, page - 1);
		let endPage = Math.min(lastPage - 1, page + 1);

		// Добавляем страницы перед текущей
		if (startPage > 2) {
			// Если есть разрыв между первой и началом диапазона
			if (startPage > 2) {
				pages.push('...');
			} else {
				// Показываем все страницы до начала диапазона
				for (let i = 2; i < startPage; i++) {
					pages.push(i);
				}
			}
		}

		// Добавляем страницы в диапазоне вокруг текущей
		for (let i = startPage; i <= endPage; i++) {
			if (i > 1 && i < lastPage) {
				pages.push(i);
			}
		}

		// Добавляем страницы после текущей
		if (endPage < lastPage - 1) {
			// Если есть разрыв между концом диапазона и последней страницей
			if (endPage < lastPage - 1) {
				pages.push('...');
			} else {
				// Показываем все страницы до последней
				for (let i = endPage + 1; i < lastPage; i++) {
					pages.push(i);
				}
			}
		}

		// Всегда добавляем последнюю страницу, если она не первая
		if (lastPage > 1) {
			pages.push(lastPage);
		}

		return pages;
	};

	const displayedPages = getDisplayedPages();

	return (
		<div className={styles['pagination']}>
			<Button className={styles['page-button']} disabled={page === 1} onClick={() => setPage(page - 1)}>
				<Icon className='page-icon' name='page-prev' />
			</Button>

			{displayedPages.map((pageItem, index) =>
				pageItem === '...' ? (
					<span key={`ellipsis-${index}`} className={styles['ellipsis']}>
						...
					</span>
				) : (
					<Button
						key={pageItem}
						className={`${styles['page-button']} ${page === pageItem ? styles['active'] : ''}`}
						onClick={() => setPage(pageItem)}
						disabled={page === pageItem}
					>
						{pageItem}
					</Button>
				)
			)}
			<Button className={styles['page-button']} disabled={page === lastPage} onClick={() => setPage(page + 1)}>
				<Icon className='page-icon' name='page-next' />
			</Button>
		</div>
	);
};
