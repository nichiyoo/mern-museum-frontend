'use client';

import * as React from 'react';

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { ChevronLeft, ChevronRight, Copy, MoreHorizontal } from 'lucide-react';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
	Pagination,
	PaginationContent,
	PaginationItem,
} from '@/components/ui/pagination';
import { cn, formatCurrency, formatDate } from '@/lib/utils';

import { Button } from '@/components/ui/button';
import { DropdownMenuLabel } from '@radix-ui/react-dropdown-menu';
import PropTypes from 'prop-types';
import { Separator } from '@/components/ui/separator';
import { useReactToPrint } from 'react-to-print';

const Receipt = React.forwardRef(
	({ ticket, handleDelete, handleNext, handlePrev, className }, ref) => {
		const handlePrint = useReactToPrint({
			content: () => ref.current,
		});

		return (
			<Card
				ref={ref}
				className={cn('overflow-hidden print:rounded-none', className)}>
				<CardHeader className='flex flex-row items-start justify-between border-b bg-muted/50 border-zinc-200'>
					<div>
						<CardTitle className='flex items-center gap-2 text-2xl group'>
							<span>Tiket</span>
							<span className='w-32 truncate'>{ticket._id}</span>
							<Button
								size='icon'
								variant='outline'
								className='w-6 h-6 transition-opacity opacity-0 group-hover:opacity-100'>
								<Copy className='w-3 h-3' />
								<span className='sr-only'>Copy Ticket ID</span>
							</Button>
						</CardTitle>
						<CardDescription>
							{formatDate(ticket.date)}
						</CardDescription>
					</div>

					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								size='icon'
								variant='outline'
								className='print:hidden'>
								<MoreHorizontal className='w-4 h-4' />
								<span className='sr-only'>Toggle menu</span>
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align='end'>
							<DropdownMenuLabel className='p-2 text-sm font-medium'>
								Actions
							</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuItem
								onClick={() => {
									handleDelete(ticket._id);
								}}>
								Delete
							</DropdownMenuItem>
							<DropdownMenuItem
								onClick={() => {
									handlePrint();
								}}>
								Print
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</CardHeader>
				<CardContent className='p-6 text-sm'>
					<div className='grid gap-3'>
						<div className='font-semibold'>Detail Tiket</div>
						<ul className='grid gap-3'>
							<li className='flex items-center justify-between'>
								<span className='text-muted-foreground'>
									{ticket.type} x <span>{ticket.count}</span>
								</span>
								<span className='font-bold'>
									{formatCurrency(ticket.amount)}
								</span>
							</li>
						</ul>

						<Separator className='my-2' />

						<ul className='grid gap-3'>
							<div className='font-semibold'>
								Informasi Pengguna
							</div>

							<li className='flex items-center justify-between'>
								<span className='text-muted-foreground'>
									Nama
								</span>
								<span>{ticket.name}</span>
							</li>
							<li className='flex items-center justify-between'>
								<span className='text-muted-foreground'>
									Email
								</span>
								<span>{ticket.email}</span>
							</li>
							<li className='flex items-center justify-between'>
								<span className='text-muted-foreground'>
									Telepon
								</span>
								<span>{ticket.phone}</span>
							</li>
						</ul>

						<Separator className='my-2' />

						<div className='grid gap-3'>
							<div className='font-semibold'>Alamat</div>
							<address className='grid gap-0.5 not-italic text-muted-foreground'>
								{ticket.address}
							</address>
						</div>
					</div>
				</CardContent>

				<CardFooter className='flex flex-row items-center px-6 py-3 border-t bg-muted/50'>
					<div className='space-x-2 text-sm text-muted-foreground'>
						<span>Dibuat</span>
						<time dateTime={ticket.date}>
							{formatDate(ticket.date)}
						</time>
					</div>

					{handlePrev && handleNext && (
						<Pagination className='w-auto ml-auto mr-0 print:hidden'>
							<PaginationContent>
								<PaginationItem>
									<Button
										size='icon'
										variant='outline'
										onClick={handlePrev}>
										<ChevronLeft className='h-3.5 w-3.5' />
										<span className='sr-only'>
											Previous Ticket
										</span>
									</Button>
								</PaginationItem>
								<PaginationItem>
									<Button
										size='icon'
										variant='outline'
										onClick={handleNext}>
										<ChevronRight className='h-3.5 w-3.5' />
										<span className='sr-only'>
											Next Ticket
										</span>
									</Button>
								</PaginationItem>
							</PaginationContent>
						</Pagination>
					)}
				</CardFooter>
			</Card>
		);
	}
);

Receipt.displayName = 'Receipt';

Receipt.propTypes = {
	ticket: PropTypes.shape({
		_id: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
		email: PropTypes.string.isRequired,
		phone: PropTypes.string.isRequired,
		address: PropTypes.string.isRequired,
		type: PropTypes.string.isRequired,
		count: PropTypes.number.isRequired,
		amount: PropTypes.number.isRequired,
		date: PropTypes.string.isRequired,
	}),
	handleDelete: PropTypes.func.isRequired,
	handleNext: PropTypes.func,
	handlePrev: PropTypes.func,
	className: PropTypes.string,
};

export default Receipt;
