import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './components/navbar';

export const Layout = () => {
	return (
		<div className="App" style={{ backgroundColor: 'rgb(121, 166, 210)' }}>
			<Navbar />
			<Outlet />
		</div>
	);
};
