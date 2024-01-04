import styles from './hstack.module.scss';

const HStack = ({ children, className, ...props }) => {
    const classes = [styles.hstack];

    if (className) {
        classes.push(className);
    }

    return (
        <div className={classes.join(' ')} {...props}>
            {children}
        </div>
    );
};

export default HStack;
