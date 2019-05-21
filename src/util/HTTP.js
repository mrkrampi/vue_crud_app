import axios from 'axios';

export const HTTP = axios.create({
    /*baseURL: 'http://localhost:9000',*/
    headers: {'Content-Type': 'application/json'}
});

function getTokenFromStorage() {
    return localStorage.getItem("ACCESS_TOKEN");
}

HTTP.interceptors.request.use(request => {
        request.headers = {
            ...request.headers,
        };
        const fullUrl = request.baseURL + request.url;
        if (fullUrl.indexOf('/signin') === -1) {
            const token = getTokenFromStorage();
            if (token) {
                request.headers = {
                    ...request.headers,
                    'Authorization': `Bearer ${token}`
                };
            } else {
                return Promise.reject();
            }
        }
        return request;
    },
    error => Promise.reject(error)
);

HTTP.interceptors.response.use(response => {
    if (response.config.url.indexOf('signin') !== -1) {
        const token = response.data.accessToken;
        localStorage.setItem("ACCESS_TOKEN", token);
        const roles = response.data.role.map(item => item.name);
        localStorage.setItem("role", roles);
    } else {
        return response;
    }
});
