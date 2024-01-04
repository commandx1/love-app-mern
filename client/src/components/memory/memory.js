import VStack from 'components/common/vstack/vstack';
import Banner from 'components/common/banner/banner';
import { backendUrl, imageUrl } from 'helpers/process_env';
import Turn from 'components/common/turn/turn';
import styles from './memory.module.scss';
import { Container } from '@mui/material';
import { useEffect, useState } from 'react';
import MemoryPages from './memory-pages/memory-pages';
import $ from 'jquery';
import 'turn.js';
import Loader from 'components/loader';
import NewItemModal from 'components/ceyiz/new-item-modal';
import useHandleError from 'helpers/use-handle-error';
import useHttp from 'helpers/use-http';

const options = {};

const Memory = () => {
    const [isNewItemModalOpen, setIsNewItemModalOpen] = useState(false);
    const [memories, setMemories] = useState();
    const [isLoading, setIsLoading] = useState(false);

    const handleError = useHandleError();
    const sendRequest = useHttp();

    const lastPageNumber = (memories?.length || 0) + 2;

    const handleModalOpen = () => setIsNewItemModalOpen(true);
    const handleModalClose = () => setIsNewItemModalOpen(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const res = await sendRequest(`${backendUrl}/api/memory`);
                setMemories(res);
            } catch (error) {
                handleError({ message: error.message });
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <Loader loading={isLoading} />
            <NewItemModal
                setIsMemoryLoading={setIsLoading}
                open={isNewItemModalOpen}
                onCancel={handleModalClose}
                setItems={setMemories}
            />
            <VStack className={styles.wrapper}>
                <Banner imageSrc={`${imageUrl}/memory-banner.jpeg`} title='Anılarımız' />
                <Container className={styles.container}>
                    {!isLoading && (
                        <Turn options={options} className={styles.magazine}>
                            <VStack className={styles.startPage}>
                                <div style={{ flex: 1 }} />
                                Anılar
                                <span
                                    onClick={() => {
                                        var flipbookEL = document.getElementById('flipbook');
                                        $(flipbookEL).turn('page', lastPageNumber);
                                    }}
                                >
                                    Son Sayfaya İlerle
                                </span>
                                <div style={{ flex: 1 }} />
                                <div className={styles.addButton} onClick={handleModalOpen}>
                                    Yeni Anı Ekle
                                </div>
                            </VStack>
                            <MemoryPages
                                memories={memories}
                                lastPageNumber={lastPageNumber}
                                setMemories={setMemories}
                                setIsMemoryLoading={setIsLoading}
                            />
                            <VStack className={styles.startPage}>
                                Son
                                <span
                                    onClick={() => {
                                        var flipbookEL = document.getElementById('flipbook');
                                        $(flipbookEL).turn('page', 1);
                                    }}
                                >
                                    İlk Sayfaya Dön
                                </span>
                            </VStack>
                        </Turn>
                    )}
                </Container>
            </VStack>
        </>
    );
};

export default Memory;
