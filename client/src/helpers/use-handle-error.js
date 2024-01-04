import notification from 'antd/lib/notification';
import { useAppContext } from '../context/app-context/app-context';
import { useNavigate } from 'react-router-dom';

const useHandleError = () => {
    const { updateUser } = useAppContext();
    const navigate = useNavigate();

    const handleError = ({ message }) => {
        notification.error({ message });

        if (['Oturumunuzun süresi doldu. Yeniden giriş yapınız.', 'Token bulunamadı.'].includes(message)) {
            updateUser(null);
            localStorage.removeItem('token');
            navigate('/');
        }
    };

    return handleError;
};

export default useHandleError;
