import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../store/appContext';

export const Signup = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate();

	const signup = async (e) => {
		e.preventDefault();

		const formData = new FormData(e.target);
		let name = formData.get('name');
		let lastname = formData.get('last_name');
		let email = formData.get('email');
		let password = formData.get('password');

		let userData = {
			name: name,
			lastname: lastname,
			email: email,
			password: password,
			//roles: [], // <-- editar esta parte
		};

		let response = await actions.signup(userData);

		if (response.validation === 'ok') {
			alert(response.message);
			navigate('/login');
		} else {
			alert(response);
		}
	};

	return (
		<div>
			<div
				className="container d-flex justify-content-center align-items-center"
				style={{ minHeight: '40vw', maxHeight: '100%', marginTop: '5%' }}
			>
				<div
					className="card text-center border-0"
					style={{ minWidth: '50%', maxWidth: '100%', maxHeight: '100%' }}
				>
					<div className="card-header" style={{ width: '100%' }}>
						<h3>Sign-up</h3>
					</div>
					<div className="card-body" style={{ width: '100%' }}>
						<form onSubmit={(e) => signup(e)}>
							<div className=" d-flex flex-column bd-highlight mb-3">
								<div className="row d-flex my-3 me-0 justify-content-center">
									<label className="input-label">Name:</label>
									<div className="input-group justify-content-center">
										<input
											className="inputs col-5"
											name="name"
											placeholder="Name"
											type="string"
										/>
									</div>
								</div>
								<div className="row d-flex mb-3 me-0 justify-content-center">
									<label className="input-label">Lastname:</label>
									<div className="input-group justify-content-center">
										<input
											className="inputs col-5"
											name="last_name"
											placeholder="Lastname"
											type="string"
										/>
									</div>
								</div>
								<div className="row d-flex mb-3 me-0 justify-content-center">
									<label className="input-label">Email:</label>
									<div className="input-group justify-content-center">
										<input
											className="inputs col-5"
											name="email"
											placeholder="Email"
											type="email"
										/>
									</div>
								</div>
								<div className="row d-flex mb-3 me-0 justify-content-center">
									<label className="input-label">Password:</label>
									<div className="input-group justify-content-center">
										<input
											className="inputs col-5"
											name="password"
											placeholder="Password"
											type="password"
										/>
									</div>

									<div>
										<span id="passwordHelpInline" className="form-text">
											Must have 8-20 characters
										</span>
									</div>
								</div>
							</div>
							<button className="btn btn-primary" type="submit">
								Register
							</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};
