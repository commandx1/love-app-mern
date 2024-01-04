import styles from './animated-border-card.module.scss';

const AnimatedBorderCard = props => {
    return (
        <div className={styles.box}>
            <div className={styles.content}>{props.children}</div>
        </div>
    );
};

export default AnimatedBorderCard;
