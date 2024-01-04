import MuiCard from '@mui/material/Card';
import styles from './card.module.scss';

const Card = ({ children, className, ...props }) => {
    return (
        <MuiCard {...props} className={[styles.card, className].filter(Boolean).join(' ')} raised>
            {children}
        </MuiCard>
    );
};

export default Card;
