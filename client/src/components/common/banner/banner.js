import styles from './banner.module.scss';
import useTransition from './use-transition';

const Banner = ({ imageSrc, title }) => {
    const { element1, element2, element3, element4 } = useTransition(title);
    return (
        <div
            style={{ backgroundImage: `url(${imageSrc})` }}
            className={[styles.banner, title === 'Anılarımız' && styles.animate2].filter(Boolean).join(' ')}
        >
            <div className={styles.title}>{title}</div>
            {element1}
            {element2}
            {element3}
            {element4}
        </div>
    );
};

export default Banner;
