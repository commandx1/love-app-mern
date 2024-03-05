import { Button, Container } from '@mui/material';
import NewItemModal from 'components/ceyiz/new-item-modal';
import Banner from 'components/common/banner/banner';
import VStack from 'components/common/vstack/vstack';
import Loader from 'components/loader';
import React, { useEffect, useState } from 'react';
import styles from './poem.module.scss';
import MoonGirlBoy from './moongirlboy.jpeg';
import { Col, Row } from 'antd';
import PoemCard from './poem-card/poem-card';
import useHttp from 'helpers/use-http';
import useHandleError from 'helpers/use-handle-error';

const Poem = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isNewItemModalOpen, setIsNewItemModalOpen] = useState(false);
    const [items, setItems] = useState([]);

    const sendRequest = useHttp();
    const handleError = useHandleError();

    const handleModalOpen = () => setIsNewItemModalOpen(true);
    const handleModalClose = () => setIsNewItemModalOpen(false);

    const fetchItems = async () => {
        try {
            setIsLoading(true);

            const items = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/api/poem`);
            setItems(items);
        } catch (error) {
            handleError({ message: error.message });
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchItems();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <Loader loading={isLoading} />
            <NewItemModal open={isNewItemModalOpen} onCancel={handleModalClose} setItems={setItems} />
            <VStack className={styles.poem}>
                <Loader loading={false} />
                <Banner imageSrc={MoonGirlBoy} title='Şiirlerimiz' />
                <Container className={styles.container}>
                    <Button variant='contained' onClick={handleModalOpen}>
                        Şiir Ekle
                    </Button>
                    <Row gutter={[16, 16]}>
                        {items?.map?.(item => (
                            <Col key={item._id} span={24} lg={12}>
                                <PoemCard item={item} setItems={setItems} />
                            </Col>
                        ))}
                    </Row>
                </Container>
            </VStack>
        </>
    );
};

export default Poem;
