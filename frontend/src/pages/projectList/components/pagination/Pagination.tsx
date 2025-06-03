import { Button, Icon } from '../../../../components';
import styles from './pagination.module.scss';

interface PaginationProps {
	page: number;
	lastPage: number;
	setPage: (pageNumber: number) => void;
}

type PageItem = number | '...';

export const Pagination = ({ page, lastPage, setPage }: PaginationProps) => {
	const getDisplayedPages = (): PageItem[] => {
		const pages: PageItem[] = [];
		pages.push(1);

		const startPage = Math.max(2, page - 1);
		const endPage = Math.min(lastPage - 1, page + 1);

		if (startPage > 2) {
			if (startPage > 2) {
				pages.push('...');
			} else {
				for (let i = 2; i < startPage; i++) {
					pages.push(i);
				}
			}
		}

		for (let i = startPage; i <= endPage; i++) {
			if (i > 1 && i < lastPage) {
				pages.push(i);
			}
		}

		if (endPage < lastPage - 1) {
			if (endPage < lastPage - 1) {
				pages.push('...');
			} else {
				for (let i = endPage + 1; i < lastPage; i++) {
					pages.push(i);
				}
			}
		}

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
