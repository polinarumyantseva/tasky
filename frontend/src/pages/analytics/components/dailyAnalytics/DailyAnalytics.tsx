import { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartOptions, Plugin } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { formatTime, getRandomColor, request } from '../../../../utils';
import { InfoCard } from '../../../../components';
import styles from './dailyAnalytics.module.scss';

ChartJS.register(ArcElement, Tooltip, Legend);

interface DailyData {
	name: string;
	duration: number;
}

export const DailyAnalytics = () => {
	const [dailyData, setDailyData] = useState<DailyData[]>([]);

	useEffect(() => {
		request('/api/projects/analytics/daily').then(({ data }) => {
			setDailyData(data);
		});
	}, []);

	const colors = dailyData.map(() => {
		return getRandomColor();
	});

	const data = {
		labels: dailyData.map((d) => d.name),
		datasets: [
			{
				data: dailyData.map((d) => d.duration),
				backgroundColor: colors,
			},
		],
	};

	const options: ChartOptions<'doughnut'> = {
		plugins: {
			tooltip: {
				callbacks: {
					label: (context) => {
						return `Затрачено: ${formatTime(context.raw as number)}`;
					},
					title: (context: Array<{ label: string }>) => {
						return `Проект: ${context[0].label}`;
					},
				},
				displayColors: false,
				backgroundColor: 'rgba(0, 0, 0, 0.8)',
				titleColor: '#fff',
				bodyColor: '#fff',
				padding: 12,
				bodyFont: {
					size: 14,
				},
				titleFont: {
					size: 16,
				},
			},
			legend: {
				position: 'bottom' as const,
				labels: {
					generateLabels: (chart: ChartJS<'doughnut'>) => {
						const data = chart.data;
						const labels = data.labels as string[];
						const dataset = data.datasets[0];

						return labels.map((label: string, i: number) => ({
							text: `${label}: ${formatTime(dataset.data[i] as number)}`,
							fillStyle: Array.isArray(dataset.backgroundColor)
								? (dataset.backgroundColor[i] as string)
								: (dataset.backgroundColor as string),
							strokeStyle: '#fff',
							lineWidth: 1,
							hidden: false,
							index: i,
						}));
					},
					padding: 20,
					font: {
						size: 14,
					},
					usePointStyle: true,
					pointStyle: 'circle',
				},
			},
		},
		cutout: '70%',
		maintainAspectRatio: false,
	};

	const plugins: Plugin<'doughnut'>[] = [
		{
			id: 'centerText',
			beforeDraw: (chart: ChartJS<'doughnut'>) => {
				if (chart.data.datasets.length === 0) return;

				const total = chart.data.datasets[0].data.reduce((a: number, b: number) => a + b, 0);
				const { ctx, chartArea } = chart;

				const centerX = (chartArea.left + chartArea.right) / 2;
				const centerY = (chartArea.top + chartArea.bottom) / 2;

				ctx.save();
				ctx.font = 'bold 16px sans-serif';
				ctx.textAlign = 'center';
				ctx.textBaseline = 'middle';
				ctx.fillText(`Сегодня: ${formatTime(total)}`, centerX, centerY);
				ctx.restore();
			},
		},
	];

	return (
		<div>
			<InfoCard>
				{dailyData.length > 0 ? (
					<div className={styles['daily-chart']}>
						<Doughnut data={data} options={options} plugins={plugins} />
					</div>
				) : (
					<div className={styles['no-time']}>Сегодня нет затраченного времени</div>
				)}
			</InfoCard>
		</div>
	);
};
