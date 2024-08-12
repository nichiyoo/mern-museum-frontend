import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

const TicketTable = ({ tickets, handleDelete, handleClick, className }) => {
	const { t } = useTranslation();

	return (
		<Card className={className}>
			<CardHeader>
				<CardTitle>{t('ticket.title')}</CardTitle>
				<CardDescription>{t('ticket.description')}</CardDescription>
			</CardHeader>

			<CardContent>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead className='w-60'>Nama</TableHead>
							<TableHead className='hidden md:table-cell'>
								Telepon
							</TableHead>
							<TableHead className='hidden md:table-cell w-80'>
								Alamat
							</TableHead>
							<TableHead>Tipe Penjunjung</TableHead>
							<TableHead>Jumlah Ticket</TableHead>
							<TableHead>Total Harga</TableHead>
							<TableHead>
								<span className='sr-only'>Actions</span>
							</TableHead>
						</TableRow>
					</TableHeader>

					<TableBody>
						{tickets.map((ticket) => (
							<TableRow
								key={ticket._id}
								className='bg-white cursor-pointer'
								onClick={() => {
									handleClick(ticket._id);
								}}>
								<TableCell className='font-medium'>
									<div className='space-y-2'>
										<p className='text-sm font-medium leading-none'>
											{ticket.name}
										</p>
										<p className='text-sm text-muted-foreground'>
											{ticket.email}
										</p>
									</div>
								</TableCell>
								<TableCell className='hidden md:table-cell'>
									{ticket.phone}
								</TableCell>
								<TableCell className='hidden md:table-cell '>
									<p className='line-clamp-2 text-muted-foreground'>
										{ticket.address}
									</p>
								</TableCell>
								<TableCell>{ticket.type}</TableCell>
								<TableCell>
									<Badge>{ticket.count}</Badge>
								</TableCell>
								<TableCell>{ticket.amount}</TableCell>

								<TableCell>
									<DropdownMenu>
										<DropdownMenuTrigger asChild>
											<Button
												aria-haspopup='true'
												size='icon'
												variant='ghost'>
												<MoreHorizontal className='w-4 h-4' />
												<span className='sr-only'>
													Toggle menu
												</span>
											</Button>
										</DropdownMenuTrigger>
										<DropdownMenuContent align='end'>
											<DropdownMenuLabel>
												Actions
											</DropdownMenuLabel>
											<DropdownMenuItem
												onClick={() => {
													handleDelete(ticket._id);
												}}>
												Delete
											</DropdownMenuItem>
										</DropdownMenuContent>
									</DropdownMenu>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	);
};

TicketTable.propTypes = {
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
	handleDelete: PropTypes.func,
	handleClick: PropTypes.func,
	className: PropTypes.string,
};

export default TicketTable;
