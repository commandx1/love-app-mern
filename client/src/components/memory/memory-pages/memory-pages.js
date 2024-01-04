import VStack from 'components/common/vstack/vstack';
import styles from './memories-pages.module.scss';
import HStack from 'components/common/hstack/hstack';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import { useState } from 'react';
import ActionMenu from 'components/common/image-section/action-menu/action-menu';
import Slider from 'components/common/slick/slick';
import logo from 'components/menu/logo.png';

dayjs.extend(utc);

const Memory = ({ memory, isEven, index, lastPageNumber, setMemories, setIsMemoryLoading }) => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleActionClick = event => setAnchorEl(event.currentTarget);
    const handleMenuClose = () => setAnchorEl(null);

    return (
        <>
            <ActionMenu
                anchorEl={anchorEl}
                handleMenuClose={handleMenuClose}
                item={memory}
                setItems={setMemories}
                setIsMemoryLoading={setIsMemoryLoading}
                lastPageNumber={lastPageNumber}
                isEven={isEven}
            />
            <VStack key={memory._id} className={styles.page} style={isEven ? { borderLeft: '1px solid #000' } : {}}>
                <HStack className={styles.pageNumberStack} style={isEven ? { flexDirection: 'row-reverse' } : {}}>
                    <div className={styles.pageNumber}>{index + 1}</div>
                    <IconButton
                        aria-label='settings'
                        id='settings'
                        aria-controls={Boolean(anchorEl) ? 'basic-menu' : undefined}
                        aria-haspopup='true'
                        aria-expanded={Boolean(anchorEl) ? 'true' : undefined}
                        onClick={handleActionClick}
                    >
                        <MoreVertIcon />
                    </IconButton>
                </HStack>
                <Slider
                    previewUrls={memory?.s3_paths?.map?.(s3_path => `${process.env.REACT_APP_IMAGE_URL}/${s3_path}`)}
                />
                <VStack className={styles.header}>
                    <div className={styles.title}>{memory.title}</div>
                    <div className={styles.date}>{memory.date ? dayjs.utc(memory.date).format('DD/MM/YYYY') : ''}</div>
                </VStack>
                <div className={styles.description}>{memory.content}</div>
                <div className={styles.writer}>{memory.user}</div>
                <img src={logo} alt='' width={30} />
            </VStack>
        </>
    );
};

const MemoryPages = ({ memories, lastPageNumber, setMemories, setIsMemoryLoading }) => {
    return memories?.map?.((m, i) => (
        <Memory
            key={i}
            lastPageNumber={lastPageNumber}
            memory={m}
            isEven={(i + 1) % 2 === 0}
            index={i}
            setIsMemoryLoading={setIsMemoryLoading}
            setMemories={setMemories}
        />
    ));
};

export default MemoryPages;
