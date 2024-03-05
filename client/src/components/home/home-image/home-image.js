import styles from './home-image.module.scss';

const text = 'SİNEMꨄSERHAT';

const HomeImage = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.image} />
            <div className={styles.overlay} />
            <div className={styles.title}>
                <div data-text={text} style={{ '--length': text.length }}>
                    {text}
                </div>
            </div>
        </div>
    );
};

export default HomeImage;
