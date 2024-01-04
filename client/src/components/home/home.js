import React, { useEffect } from 'react';
import PlayMusic from '../common/play-music/play-music';
import useHandleError from '../../helpers/use-handle-error';
import useHttp from '../../helpers/use-http';
import { useAppContext } from '../../context/app-context/app-context';
import showSuccessMessage from '../../helpers/show-success-message';
import { Paper, Typography } from '@mui/material';

const fetchData = async ({ token, updateUser, handleError, sendRequest }) => {
    try {
        const res = await sendRequest(process.env.REACT_APP_BACKEND_URL + '/api/gallery', 'GET', { token });

        if (res.message) {
            showSuccessMessage({ message: res.message });
        }
    } catch (error) {
        console.log(error);
        handleError({ message: error.message, updateUser });
    }
};

const Home = () => {
    const { user, updateUser } = useAppContext();
    const handleError = useHandleError();
    const sendRequest = useHttp();

    useEffect(() => {
        fetchData({ token: user?.token, updateUser, handleError, sendRequest });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user?.token]);
    return (
        <div>
            <Paper style={{ width: 'clamp(60%, 700px, 90vw)', margin: '2em auto', padding: '2em' }}>
                <PlayMusic />
                <Typography fontSize='var(--font-l)'>
                    Giriş sonrası içerik kısmına henüz başlamadım. Şifreyi güvenli kaydetme, oturum süresi tutma gibi
                    konular üzerine çalıştım ve giriş ekranını tamamladım aşkım. Oturum süren bir dakika olacak. Bir
                    dakika sonra sayfayı yenilediğinde otomatik olarak çıkış yapacak ve giriş ekranına
                    yönlendirileceksin. ❤️
                </Typography>
            </Paper>
        </div>
    );
};

export default Home;
