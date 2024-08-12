import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import axios from '@/lib/axios';
import { isAxiosError } from 'axios';
import { toast } from '@/components/ui/use-toast';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const ticketSchema = z.object({
	name: z.string().min(3).max(50),
	email: z.string().email(),
	phone: z.string().min(8),
	address: z.string().min(3),
	type: z.enum(['pelajar', 'umum', 'asing']),
	count: z.coerce.number().min(1).max(10),
	date: z.string().min(10),
});

const TicketForm = () => {
	const form = useForm({
		resolver: zodResolver(ticketSchema),
		defaultValues: {
			name: '',
			email: '',
			phone: '',
			address: '',
			type: 'umum',
			count: 1,
			date: '',
		},
	});

	const onSubmit = async (formData) => {
		try {
			toast({
				title: 'Loading',
				description: 'Creating ticket...',
				variant: 'default',
			});

			await axios.post('tickets', formData);

			toast({
				title: 'Success',
				description: 'Data submitted successfully',
				status: 'success',
			});

			form.reset();
		} catch (error) {
			if (isAxiosError(error)) {
				toast({
					title: 'Error',
					description: error.response?.data?.message,
					variant: 'destructive',
				});
			} else {
				toast({
					title: 'Error',
					description: error.message,
					variant: 'destructive',
				});
			}
			console.log(error);
		}
	};

	const mapper = {
		pelajar: 2000,
		umum: 4000,
		asing: 7000,
	};

	const totalHarga = form.watch('count') * mapper[form.watch('type')];

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				encType='multipart/form-data'>
				<div className='grid items-start gap-8 mb-8 lg:grid-cols-5'>
					<Card className='lg:col-span-3'>
						<CardHeader>
							<CardTitle>Detail Penjunjung</CardTitle>
							<CardDescription>
								Detail Penjunjung yang akan dibuat.
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className='grid gap-4 lg:grid-cols-2'>
								<div className='col-span-full'>
									<FormField
										control={form.control}
										name='name'
										render={({ field }) => (
											<FormItem>
												<FormLabel>
													Nama Pengunjung
												</FormLabel>
												<FormControl>
													<Input
														placeholder='Nama Pengunjung'
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>

								<div>
									<FormField
										control={form.control}
										name='email'
										render={({ field }) => (
											<FormItem>
												<FormLabel>
													Email Pengunjung
												</FormLabel>
												<FormControl>
													<Input
														placeholder='Email Pengunjung'
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>

								<div>
									<FormField
										control={form.control}
										name='phone'
										render={({ field }) => (
											<FormItem>
												<FormLabel>
													No. Telepon Pengunjung
												</FormLabel>
												<FormControl>
													<Input
														placeholder='No. Telepon Pengunjung'
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>

								<div className='col-span-full'>
									<FormField
										control={form.control}
										name='address'
										render={({ field }) => (
											<FormItem>
												<FormLabel>
													Alamat Pengunjung
												</FormLabel>
												<FormControl>
													<Textarea
														placeholder='Alamat Pengunjung'
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
							</div>
						</CardContent>
					</Card>

					<Card className='lg:col-span-2'>
						<CardHeader>
							<CardTitle>Detail Kunjungan</CardTitle>
							<CardDescription>
								Tipe, Jumlah Penjunjung dan Tanggal Kunjungan
								yang akan dilakukan.
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className='grid gap-4'>
								<FormField
									control={form.control}
									name='type'
									render={({ field }) => (
										<FormItem>
											<FormLabel>
												Tipe Penjunjung
											</FormLabel>
											<Select
												onValueChange={field.onChange}
												defaultValue={field.value}>
												<FormControl>
													<SelectTrigger>
														<SelectValue placeholder='Pilih Tipe Penjunjung' />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													<SelectItem value='pelajar'>
														Pelajar
													</SelectItem>
													<SelectItem value='umum'>
														Umum
													</SelectItem>
													<SelectItem value='asing'>
														Asing
													</SelectItem>
												</SelectContent>
											</Select>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name='count'
									render={({ field }) => (
										<FormItem>
											<FormLabel>
												Jumlah Penjunjung
											</FormLabel>
											<FormControl>
												<Input
													type='number'
													placeholder='Jumlah Penjunjung'
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name='date'
									render={({ field }) => (
										<FormItem>
											<FormLabel>
												Tanggal Penjunjung
											</FormLabel>
											<FormControl>
												<Input
													type='date'
													placeholder='Tanggal Penjunjung'
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<div className='flex'>
									<span className='text-sm font-medium'>
										Total Harga
									</span>
									<span className='ml-auto text-lg font-bold'>
										Rp {totalHarga}
									</span>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>

				<div className='flex items-center space-x-4'>
					<Button type='submit'>Submit</Button>
					<Button
						type='reset'
						onClick={() => form.reset()}
						variant='outline'>
						Reset
					</Button>
				</div>
			</form>
		</Form>
	);
};

export default TicketForm;
