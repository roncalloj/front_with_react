import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Context } from '../store/appContext';

export const Login = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate();

	const login = async (e) => {
		e.preventDefault();

		const formData = new FormData(e.target);
		let email = formData.get('email');
		let password = formData.get('password');

		let userData = {
			email: email,
			password: password,
		};

		let response = await actions.login(userData);

		if (response.validation === 'ok') {
		}
	};

	return (
		<>
			<div
				className="container d-flex justify-content-center align-items-center letraKurius"
				style={{ minHeight: '40vw', maxHeight: '100%', marginTop: '5%' }}
			>
				<div
					className="card text-center border-0"
					style={{ minWidth: '50%', maxWidth: '100%', maxHeight: '100%' }}
				>
					<div
						className="card-header cabezoteRegistro"
						style={{ width: '100%' }}
					>
						<h3>Login</h3>
					</div>
					<div
						className="card-body cajatextoRegistro"
						style={{ width: '100%' }}
					>
						<form onSubmit={(e) => login(e)}>
							<div className=" d-flex flex-column bd-highlight mb-3">
								<div className="mb-3">
									<h5>Email:</h5>
									<div className="input-group justify-content-center">
										<span className="input-group-text iconos" id="basic-addon1">
											<box-icon
												className="input-group-text iconos"
												name="user"
											/>
										</span>
										<input
											className="inputs col-5"
											name="email"
											placeholder="Email"
											type="email"
										/>
									</div>
								</div>

								<div>
									<h5>Password:</h5>
									<div className="input-group justify-content-center">
										<span className="input-group-text iconos" id="basic-addon1">
											<box-icon
												className="input-group-text iconos"
												name="lock-open"
											/>
										</span>
										<input
											className="inputs col-5"
											name="password"
											placeholder="Password"
											type="password"
										/>
									</div>
								</div>
							</div>
							<button className="btn btn-success" type="submit">
								Login
							</button>
						</form>
						<div>
							<Link to={'/signup'}>
								<span>Not a user? SignUp</span>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
