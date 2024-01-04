import { useState } from 'react';
import styles from './login.module.scss';

const useMode = MODES => {
    const [mode, setMode] = useState(MODES.LOGIN);

    const title = mode === MODES.LOGIN ? 'Giriş Formu' : 'Kayıt Formu';

    const buttonText = mode === MODES.LOGIN ? 'Giriş Yap' : 'Kaydol';

    const helperText =
        mode === MODES.LOGIN ? (
            <div className={styles.signup}>
                veya hesabınız yoksa <span onClick={() => setMode(MODES.REGISTER)}>kaydolun</span>
            </div>
        ) : (
            <div className={styles.login}>
                zaten bir hesabınız varsa <span onClick={() => setMode(MODES.LOGIN)}>giriş</span> yapabilirsiniz.
            </div>
        );

    return { title, buttonText, helperText, mode };
};

export default useMode;
