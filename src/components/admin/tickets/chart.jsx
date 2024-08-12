'use client';

import * as React from 'react';

import { Bar, BarChart, LabelList, XAxis, YAxis } from 'recharts';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components//ui/card';

import { ChartContainer } from '@/components//ui/chart';
import PropTypes from 'prop-types';
import { formatCurrency } from '@/lib/utils';

const config = {
	pelajar: {
		label: 'Pelajar',
		color: 'hsl(var(--chart-1))',
	},
	umum: {
		label: 'Umum',
		color: 'hsl(var(--chart-2))',
	},
	asing: {
		label: 'Asing',
		color: 'hsl(var(--chart-3))',
	},
};

const margin = {
	left: 0,
	right: 0,
	top: 0,
	bottom: 10,
};

const TicketChart = ({ tickets }) => {
	const data = React.useMemo(() => {
		if (!tickets) return [];

		const values = tickets.reduce(
			(acc, ticket) => {
				acc[ticket.type] += ticket.amount;
				return acc;
			},
			{
				pelajar: 0,
				umum: 0,
				asing: 0,
			}
		);

		return ['pelajar', 'umum', 'asing'].map((type) => ({
			activity: type,
			value: values[type],
			label: formatCurrency(values[type]),
			fill: `var(--color-${type})`,
		}));
	}, [tickets]);

	const statistics = React.useMemo(() => {
		if (!tickets) {
			return {
				pelajar: 0,
				umum: 0,
				asing: 0,
			};
		}

		return tickets.reduce(
			(acc, ticket) => {
				acc[ticket.type] += ticket.count;
				return acc;
			},
			{
				pelajar: 0,
				umum: 0,
				asing: 0,
			}
		);
	}, [tickets]);

	return (
		<Card>
			<CardHeader className='flex flex-row items-center'>
				<div className='grid gap-2'>
					<CardTitle>Statistik</CardTitle>
					<CardDescription>Statistik Penjualan Tiket</CardDescription>
				</div>
			</CardHeader>

			<CardContent className='flex gap-4 p-4 pb-2'>
				<ChartContainer config={config} className='w-full h-40'>
					<BarChart
						margin={margin}
						data={data}
						layout='vertical'
						barSize={32}
						barGap={2}>
						<XAxis type='number' dataKey='value' hide />
						<YAxis
							dataKey='activity'
							type='category'
							tickLine={false}
							tickMargin={4}
							axisLine={false}
							className='capitalize'
						/>
						<Bar dataKey='value' radius={5}>
							<LabelList
								position='insideLeft'
								dataKey='label'
								fill='white'
								offset={8}
								fontSize={12}
							/>
						</Bar>
					</BarChart>
				</ChartContainer>
			</CardContent>
			<CardFooter className='flex flex-row p-4 border-t'>
				<div className='flex items-center w-full gap-2'>
					{Object.entries(statistics).map(([key, value]) => (
						<div
							key={key}
							className='grid flex-1 auto-rows-min gap-0.5'>
							<div className='text-xs text-muted-foreground'>
								{key}
							</div>
							<div className='flex items-baseline gap-1 text-2xl font-bold leading-none tabular-nums'>
								{value}
								<span className='text-sm font-normal text-muted-foreground'>
									Ticket
								</span>
							</div>
						</div>
					))}
				</div>
			</CardFooter>
		</Card>
	);
};

TicketChart.propTypes = {
	tickets: PropTypes.arrayOf(
		PropTypes.shape({
			_id: PropTypes.string.isRequired,
			name: PropTypes.string.isRequired,
			email: PropTypes.string.isRequired,
			phone: PropTypes.string.isRequired,
			address: PropTypes.string.isRequired,
			type: PropTypes.string.isRequired,
			count: PropTypes.number.isRequired,
			amount: PropTypes.number.isRequired,
			date: PropTypes.string.isRequired,
		})
	),
};

export default TicketChart;
