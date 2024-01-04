import HStack from '../common/hstack';
import VStack from '../common/vstack';
import Form from 'antd/lib/form';
import Input from '../common/input/input';
import Button from '@mui/material/Button';
import styles from './login.module.scss';
import useMode from './useMode';
import useHttp from '../../helpers/use-http';
import useHandleError from '../../helpers/use-handle-error';
import showSuccessMessage from '../../helpers/show-success-message';
import { useAppContext } from '../../context/app-context/app-context';
import PlayMusic from '../common/play-music/play-music';
import { Divider } from '@mui/material';
import AnimatedBorderCard from '../common/animated-border-card/animated-border-card';
import Loader from '../loader';
import { useState } from 'react';

const MODES = { LOGIN: 'LOGIN', REGISTER: 'REGISTER' };

const Login = () => {
    const [loading, setLoading] = useState(false);

    const { updateUser, customerDb, updateCustomerDb } = useAppContext();
    const handleError = useHandleError();
    const sendRequest = useHttp();
    const [form] = Form.useForm();
    const { title, buttonText, helperText, mode } = useMode(MODES);

    const handleFinish = async () => {
        try {
            setLoading(true);
            const fields = form.getFieldsValue();
            fields.full_name = fields.fullName;

            const url = mode === MODES.LOGIN ? '/api/user/login' : '/api/user';
            const res = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}${url}`, 'POST', {}, fields);

            if (res.message) {
                showSuccessMessage({ message: res.message });
            }
            localStorage.setItem('token', res.user.token);
            localStorage.setItem('full_name', res.user.full_name);
            updateUser(res.user);
            //navigate('/');
        } catch (error) {
            handleError({ message: error.message });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Loader loading={loading} />
            <div className={styles.overlay} />
            <div className={styles.wrapper}>
                <div className={styles.blur} />
                <div className={styles.container}>
                    <AnimatedBorderCard>
                        <HStack className={styles.content}>
                            <div className={styles.image} />
                            <VStack className={styles.form}>
                                <HStack className={styles.header}>
                                    <div className={styles.title}>{title}</div>
                                    <PlayMusic />
                                </HStack>
                                <Divider />
                                <Form form={form} onFinish={handleFinish} layout='vertical'>
                                    {mode === MODES.REGISTER && (
                                        <Form.Item
                                            label='Ad Soyad'
                                            name='full_name'
                                            rules={[
                                                { required: true, message: 'Lütfen adınızı ve soyadınızı giriniz.' },
                                            ]}
                                        >
                                            <Input />
                                        </Form.Item>
                                    )}
                                    <Form.Item
                                        label='Kullanıcı Adı'
                                        name='username'
                                        rules={[{ required: true, message: 'Lütfen kullanıcı adınızı giriniz.' }]}
                                    >
                                        <Input />
                                    </Form.Item>
                                    <Form.Item
                                        label='Şifre'
                                        name='password'
                                        rules={[
                                            {
                                                required: true,
                                                min: 6,
                                                message: 'Şifreniz en az altı haneli olmalıdır.',
                                            },
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                    <Button fullWidth color='info' variant='contained' type='submit'>
                                        {buttonText}
                                    </Button>
                                    {helperText}
                                </Form>
                                <div className={styles.exitFromApp} onClick={() => updateCustomerDb(null)}>{customerDb} uygulamasından çık</div>
                            </VStack>
                        </HStack>
                    </AnimatedBorderCard>
                </div>
            </div>
        </>
    );
};

export default Login;
