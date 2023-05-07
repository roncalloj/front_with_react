const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			token: '',
		},
		actions: {
			apiFetch: async (endpoint, metodo = 'GET', data = null) => {
				const store = getStore();
				let url = process.env.REACT_APP_BACKEND_URL;
				let headers = {
					'Content-Type': 'application/json',
					'Access-Control-Allow-Origin': '*',
				};
				if (store.token) {
					headers['Authorization'] = 'Bearer ' + store.token;
				}
				let request = {
					method: metodo,
					headers,
				};
				if (data) {
					request.body = JSON.stringify(data);
				}
				return await fetch(url + endpoint, request);
			},
			signup: async (data) => {
				for (const key in data) {
					if (data[key] === '') return 'Fill all the fields';
				}
				let password = data.password.replaceAll(/\s/g, '');
				if (password.length > 7) {
					try {
						let response = await getActions().apiFetch(
							'users/signup',
							'POST',
							data
						);
						if (response.ok) {
							let responseJson = await response.json();
							return {
								message:
									responseJson.message + '. User registered successfully',
								validation: 'ok',
							};
						} else {
							let responseJson = await response.json();
							if (responseJson !== undefined) return responseJson.message;
							else return 'Internal error';
						}
					} catch (error) {
						console.error({ error });
					}
				} else return 'Password must have at least 8 characters';
			},
			login: async (data) => {
				const store = getStore();
				try {
					let response = await getActions().apiFetch('login', 'POST', data);
					if (response.ok) {
						let responseJson = await response.json();
						setStore({
							token: responseJson.token,
							refresh_token: responseJson.refresh_token,
							loginDate: Date.now(),
						});
						let infoRequest = await getActions().apiFetch('checkout');
						if (infoRequest.ok) {
							let userInfo = await infoRequest.json();
							setStore({ ...store, user: userInfo.name }); //se añadela info del ususario al token
							return 'ok';
						} else return 'Access revoked';
					} else {
						let responseJson = await response.json();
						if (responseJson !== undefined) return responseJson.message;
						else return 'Internal error';
					}
				} catch (error) {
					console.error({ error });
				}
			},
			fetchProtegido: async (endpoint, data = undefined, metodo = 'GET') => {
				const store = getStore();
				let url = process.env.REACT_APP_BACKEND_URL;
				let encabezado = {
					method: metodo,
					headers: {
						'Content-Type': 'application/json',
						Authorization: 'Bearer ' + store.token,
					},
					body: data ? JSON.stringify(data) : undefined,
				};

				let response = await fetch(url + endpoint, encabezado);
				return response;
			},
		},
	};
};

export default getState;
