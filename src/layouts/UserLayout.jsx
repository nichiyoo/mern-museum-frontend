import Footer from '@/components/user/Footer';
import Navbar from '@/components/user/Navbar';
import { Outlet } from 'react-router-dom';

export function UserLayout() {
	return (
		<div>
			<Navbar />
			<div className='min-h-screen'>
				<Outlet />
			</div>
			<Footer />
		</div>
	);
}

export default UserLayout;
