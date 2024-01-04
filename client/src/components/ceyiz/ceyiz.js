/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import useHandleError from '../../helpers/use-handle-error';
import useHttp from '../../helpers/use-http';
import styles from './ceyiz.module.scss';
import VStack from 'components/common/vstack/vstack';
import Banner from 'components/common/banner/banner';
import Loader from 'components/loader';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Tabs from 'antd/lib/tabs';
import categories from './categories';
import ImageSection from 'components/common/image-section';
import NewItemModal from './new-item-modal';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import ceyizBanner from './ceyiz_banner.jpeg';

const Ceyiz = () => {
    const [activeTab, setActiveTab] = useState('1');
    const [isNewItemModalOpen, setIsNewItemModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [items, setItems] = useState();

    const handleError = useHandleError();
    const sendRequest = useHttp();

    const handleModalOpen = () => setIsNewItemModalOpen(true);
    const handleModalClose = () => setIsNewItemModalOpen(false);

    const fetchItems = async () => {
        try {
            setIsLoading(true);

            let route = '/api/ceyiz/items';
            const query = { category_id: activeTab };

            if (activeTab === '_favourite_') {
                route += '/favourite';
                delete query.category_id;
            }

            const items = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}${route}`, 'GET', query);
            setItems(items);
        } catch (error) {
            handleError({ message: error.message });
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchItems();
    }, [activeTab]);

    return (
        <>
            <Loader loading={isLoading} />
            <NewItemModal
                open={isNewItemModalOpen}
                onCancel={handleModalClose}
                activeCategory={activeTab}
                setItems={setItems}
            />
            <VStack className={styles.ceyiz}>
                <Loader loading={false} />
                <Banner imageSrc={ceyizBanner} title='Çeyizlerimiz' />
                <Container className={styles.container}>
                    <Tabs
                        tabBarExtraContent={
                            <Button variant='contained' onClick={handleModalOpen}>
                                Eşya Ekle
                            </Button>
                        }
                        activeKey={activeTab}
                        onChange={setActiveTab}
                        items={categories}
                    />
                    <Row gutter={[16, 16]}>
                        {items?.map?.(item => (
                            <Col key={item._id} span={24} md={12} lg={8}>
                                <ImageSection item={item} setItems={setItems} activeTab={activeTab} />
                            </Col>
                        ))}
                    </Row>
                </Container>
            </VStack>
        </>
    );
};

export default Ceyiz;
