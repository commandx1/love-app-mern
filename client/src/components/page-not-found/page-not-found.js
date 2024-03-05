import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './page-not-found.module.scss';
import Card from 'components/common/card';

const PageNotFound = () => {
    const navigate = useNavigate();

    return (
        <div className={styles.wrapper}>
            <Card className={styles.card}>
                <div className={styles.emoji}>🥺</div>
                <div>
                    Sayfa bulunamadı. Lütfen doğru adres girdiğinizden emin olunuz. <br />
                    Anasayfaya ilerlemek için <span onClick={() => navigate('/')}>tıklayınız</span>
                </div>
            </Card>
        </div>
    );
};

export default PageNotFound;
