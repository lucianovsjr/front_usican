import { fetchUtils } from 'react-admin';
import drfProvider from 'ra-data-drf';

import { authVerify } from '../authProvider';

const httpClient = async (url, options = {}) => {
    await authVerify();
    const token = localStorage.getItem('token');

    if (!options.headers) {
        options.headers = new Headers({ Accept: 'application/json' });
    }

    if (token) {
        options.user = { authenticated: !!token, token: `Bearer ${token}` };
    }

    return fetchUtils.fetchJson(url, options);
}

export default drfProvider('http://localhost:8000/api', httpClient);
