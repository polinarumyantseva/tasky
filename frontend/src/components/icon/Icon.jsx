import { useState } from 'react';
import { useDinamicSvgImport } from '../../hooks';
import styles from './icon.module.scss';

export const Icon = ({ name, className = '', ...props }) => {
	const [svgData, setSvgData] = useState(null);

	useDinamicSvgImport({ name, onCompleted: setSvgData });

	if (!svgData) return <div>i</div>;

	const combinedClassName = `${styles[`default-icon`]} ${className}`;

	return <div className={combinedClassName} dangerouslySetInnerHTML={{ __html: svgData }} {...props}></div>;
};
