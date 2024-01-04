import styles from './vstack.module.scss';

const VStack = ({ children, className, ...props }) => {
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

export default VStack;
