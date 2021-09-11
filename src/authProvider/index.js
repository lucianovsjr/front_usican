const baseUrl = 'http://localhost:8000/api';

const authClean = () => {
	localStorage.removeItem('token');
    localStorage.removeItem('refresh');
};

// const authRefresh = () => {
// 	const refresh = localStorage.getItem('refresh');
// 	const request = new Request(`${baseUrl}/token/refresh/`, {
// 		method: 'POST',
// 		body: JSON.stringify({refresh}),
// 		headers: new Headers({
// 			'Content-Type': 'application/json',
// 		}),
// 	});

// 	fetch(request)
// 		.then(response => {
// 			if (response.status < 200 || response.status >= 300) {
// 				throw new Error(response.statusText);
// 			}
// 			return response.json();
// 		})
// 		.then(({ access }) => {
// 			localStorage.setItem('token', access);
// 		});
// };

const authProvider = {
	login: ({ username, password }) => {
		const request = new Request(`${baseUrl}/token/`, {
			method: 'POST',
			body: JSON.stringify({
				username, password,
			}),
			headers: new Headers({
				'Content-Type': 'application/json',
			}),
		});
		return fetch(request)
		.then(response => {
			if (response.status < 200 || response.status >= 300) {
				throw new Error(response.statusText);
			}
			return response.json();
		})
		.then(({ refresh, access }) => {
			localStorage.setItem('token', access);
			localStorage.setItem('refresh', refresh);
			// localStorage.setItem('permissions', decodedToken.permissions);
		});
	},
	checkError: (error) => {
		const { status } = error;
		if (status === 401 || status === 403) {
            authClean();
            return Promise.reject();
        }
        return Promise.resolve();
	},
    checkAuth: () => {
        return localStorage.getItem('token') ? Promise.resolve() : Promise.reject();
    },
    logout: () => {
        authClean();
        // localStorage.removeItem('permissions');
        return Promise.resolve();
    },
    getIdentity: () => { /* ... */ },
    getPermissions: () => {
        // const role = localStorage.getItem('permissions');
        // return role ? Promise.resolve(role) : Promise.reject();
		return Promise.resolve();
    }
};

export default authProvider;
