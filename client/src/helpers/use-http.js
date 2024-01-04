import { useAppContext } from '../context/app-context/app-context';

const useHttp = () => {
    const { user, customerDb } = useAppContext();

    const sendRequest = async (url = '', method = 'GET', query = {}, payload = {}, signal = null) => {
        let data = null;
        let queryString = '';

        const token = user?.token;
        const isFormData = payload instanceof FormData;

        if (customerDb) {
            query.customerDb = customerDb;
        }

        if (method !== 'GET' && !isFormData) {
            data = JSON.stringify(payload);
        }

        if (query && Object.keys(query).length > 0) {
            queryString = `?${new URLSearchParams(query).toString()}`;
        }

        const response = await fetch(`${url}${queryString}`, {
            method,
            signal,
            body: isFormData ? payload : data,
            headers: {
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
                ...(!isFormData && { 'Content-Type': 'application/json' }),
            },
        });

        const body = await response.json();

        if (!response.ok) {
            throw new Error(body.message);
        }

        return body;
    };

    return sendRequest;
};

export default useHttp;
