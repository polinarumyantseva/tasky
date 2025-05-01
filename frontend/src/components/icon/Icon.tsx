import { useState } from 'react';
import { useDinamicSvgImport } from '../../hooks';
import styles from './icon.module.scss';

interface IconProps {
	name: string;
	className?: string;
}

export const Icon = ({ name, className = '' }: IconProps) => {
	const [svgData, setSvgData] = useState<string | null>(null);

	useDinamicSvgImport({ name, onCompleted: setSvgData });

	if (!svgData) return <div>?</div>;

	const combinedClassName = `${styles[`default-icon`]} ${className}`;

	return <div className={combinedClassName} dangerouslySetInnerHTML={{ __html: svgData }}></div>;
};
