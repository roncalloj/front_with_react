import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import injectContext from './store/appContext';

import { Layout } from './layout';
import { Home } from './pages/home';
import { Login } from './pages/login';
import { Signup } from './pages/signup';
//import './styles/home.css';

const AppRoutes = () => {
	const basename = process.env.REACT_APP_BASENAME || '';
	return (
		<>
			<BrowserRouter basename={basename}>
				<Routes>
					<Route element={<Layout />}>
						<Route index element={<Home />} />
						<Route element={<Signup />} path="/signup" />
						<Route element={<Login />} path="/login" />
					</Route>
				</Routes>
			</BrowserRouter>
		</>
	);
};

export default injectContext(AppRoutes);
