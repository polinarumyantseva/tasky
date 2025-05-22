import { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
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

	const options = {
		plugins: {
			tooltip: {
				callbacks: {
					label: (context) => {
						return `Затрачено: ${formatTime(context.raw)}`;
					},
					title: (context) => {
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
					generateLabels: (chart) => {
						const data = chart.data;

						return data.labels.map((label: string, i: number) => ({
							text: `${label}: ${formatTime(data.datasets[0].data[i])}`,
							fillStyle: data.datasets[0].backgroundColor[i],
							strokeStyle: '#fff',
							lineWidth: 1,
							hidden: false,
							index: i,
						}));
					},
					// boxWidth: 20,
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

	const plugins = [
		{
			id: 'centerText',
			beforeDraw: (chart) => {
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
		<div className={styles['daily-chart-wrapper']}>
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
