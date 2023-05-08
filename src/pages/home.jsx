import React from 'react';
import { Link } from 'react-router-dom';

export const Home = () => {
	return (
		<div className="p-5 mb-4 bg-light rounded-3">
			<div className="container-fluid py-5">
				<h1 className="display-5 fw-bold">User validation</h1>
				<p className="col-md-8 fs-4">
					This little app will validate user's transactions <br /> Register,
					login with auth token, and logout
				</p>
				<Link to={'/signup'}>
					<button className="btn btn-primary btn-lg" type="button">
						Start in the Sign Up page
					</button>
				</Link>
			</div>
		</div>
	);
};
