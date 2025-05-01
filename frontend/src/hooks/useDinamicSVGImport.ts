import { useEffect } from 'react';

interface DinamicSvgImportProps {
	name: string;
	onCompleted: (svgData: string | null) => void;
}

export const useDinamicSvgImport = ({ name, onCompleted }: DinamicSvgImportProps) => {
	useEffect(() => {
		import(`../images/icons/${name}.svg`)
			.then((svgDataUrl: { default: string }) => {
				const result = decodeURIComponent(svgDataUrl.default.split(',')[1]);
				onCompleted(result);
			})
			.catch(() => {
				console.error(`Иконка "${name}" не найдена.`);
				onCompleted(null);
			});
	}, [name, onCompleted]);
};
