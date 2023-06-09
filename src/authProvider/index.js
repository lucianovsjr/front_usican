import jwtDecode from 'jwt-decode';

const baseUrl = 'http://localhost:8000/api';

const authClean = () => {
	localStorage.removeItem('token');
    localStorage.removeItem('refresh');
    localStorage.removeItem('permission');
};

export const authVerify = async (refresh = true) => {
	const accessToken = localStorage.getItem('token');
	const request = new Request(`${baseUrl}/token/verify/`, {
		method: 'POST',
		body: JSON.stringify({token: accessToken}),
		headers: new Headers({
			'Content-Type': 'application/json',
		}),
	});

	const response = await fetch(request);
	if (response.status === 200) {
		return true;
	}

	if (refresh) {
		return await authRefresh();
	}
	return false;
}

export const authRefresh = async () => {
	const refreshToken = localStorage.getItem('refresh');
	const request = new Request(`${baseUrl}/token/refresh/`, {
		method: 'POST',
		body: JSON.stringify({refresh: refreshToken}),
		headers: new Headers({
			'Content-Type': 'application/json',
		}),
	});

	const response = await fetch(request);
	if (response.status === 200) {
		const { access, refresh } = await response.json()		
		if (access && refresh) {
			localStorage.setItem('token', access);
			localStorage.setItem('refresh', refresh);
			return true;
		}
	}
	return false;
};

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
				const decodedToken = jwtDecode(access);
				localStorage.setItem('token', access);
				localStorage.setItem('refresh', refresh);
				localStorage.setItem('permissions', JSON.stringify(decodedToken.permissions));
			});
	},
	checkError: async (error) => {
		const { status } = error;
		if (status === 401 || status === 403) {
            authClean();
            return Promise.reject();
        }
        return Promise.resolve();
	},
    checkAuth: async () => {
        return localStorage.getItem('token') && await authVerify() ? Promise.resolve() : Promise.reject();
    },
    logout: () => {
        authClean();
        return Promise.resolve();
    },
    getIdentity: () => { /* ... */ },
    getPermissions: () => {
        const permissions = localStorage.getItem('permissions');
		if (!permissions) {
			authClean();
            return Promise.reject();
		}
        return Promise.resolve(JSON.parse(permissions))
    }
};

export default authProvider;
