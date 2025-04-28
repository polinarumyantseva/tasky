import { useEffect } from 'react';

export const useDinamicSvgImport = ({ name, onCompleted }) => {
	useEffect(() => {
		import(`../images/icons/${name}.svg`)
			.then((svgDataUrl) => {
				const result = decodeURIComponent(svgDataUrl.default.split(',')[1]);
				onCompleted(result);
			})
			.catch(() => {
				console.error(`Иконка "${name}" не найдена.`);
				onCompleted(null);
			});
	}, [name, onCompleted]);
};
