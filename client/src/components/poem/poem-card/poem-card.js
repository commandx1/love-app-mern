import VStack from 'components/common/vstack/vstack';
import styles from './poem-card.module.scss';
import flower1 from './f1.png';
import ActionMenu from 'components/common/image-section/action-menu/action-menu';
import { useState } from 'react';

const PoemCard = ({ item, setItems }) => {
    const [anchorEl, setAnchorEl] = useState();

    const handleActionClick = event => setAnchorEl(event.currentTarget);
    const handleMenuClose = () => setAnchorEl(null);

    return (
        <>
            <ActionMenu anchorEl={anchorEl} handleMenuClose={handleMenuClose} item={item} setItems={setItems} />
            <div className={styles.wrapper}>
                <img src={flower1} alt='f1' onClick={handleActionClick} />
                <img src={flower1} alt='f2' onClick={handleActionClick} />
                <VStack className={styles.vstack}>
                    <div>{item.title}</div>
                    <div style={{ whiteSpace: 'pre-line' }}>{item.content}</div>
                    <div>{item.user}</div>
                </VStack>
            </div>
        </>
    );
};

export default PoemCard;
