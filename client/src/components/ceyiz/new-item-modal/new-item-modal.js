import Modal from 'antd/lib/modal';
import styles from './new-item-modal.module.scss';
import Button from '@mui/material/Button';
import HStack from 'components/common/hstack/hstack';
import Form from 'antd/lib/form';
import { useEffect, useState } from 'react';
import useHandleError from 'helpers/use-handle-error';
import CircularProgress from '@mui/material/CircularProgress';
import useHttp from 'helpers/use-http';
import ImageUpload from './image-upload/image-upload';
import showSuccessMessage from 'helpers/show-success-message';
import FormElements from './form-elements/form-elements';
import { useLocation } from 'react-router-dom';
import { useAppContext } from 'context/app-context/app-context';
import dayjs from 'dayjs';

const NewItemModal = ({ onCancel, open, activeCategory, setItems, editMode, item, setIsMemoryLoading }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [images, setImages] = useState();
    const [isImageChangedInEditMode, setIsImageChangedInEditMode] = useState(false);
    const [isImageDeletedInEditMode, setIsImageDeletedInEditMode] = useState(false);

    const [form] = Form.useForm();
    const handleError = useHandleError();
    const sendRequest = useHttp();
    const location = useLocation();
    const { user } = useAppContext();

    const decodedPathname = decodeURIComponent(location.pathname);

    const title = () => {
        let title = 'Yeni ';
        if (decodedPathname === '/ceyiz') {
            title += 'Çeyiz';
        }
        if (decodedPathname === '/anılar') {
            title += 'Anı';
        }
        if (decodedPathname === '/siir') {
            title += 'Şiir';
        }

        return title;
    };

    const handleModalClose = () => {
        onCancel();
        form.resetFields();
        setImages(null);
        setIsImageChangedInEditMode(false);
        setIsImageDeletedInEditMode(false);
    };

    const handleFinish = async () => {
        try {
            setIsMemoryLoading?.(true);
            setIsLoading(true);
            const fields = form.getFieldsValue();

            const formData = new FormData();
            for (const key in fields) {
                const value = fields[key];

                if (value) {
                    if (key === 'date') {
                        formData.append(key, value.format('YYYY-MM-DD'));
                    } else {
                        formData.append(key, value);
                    }
                }
            }

            if (editMode) {
                if (isImageChangedInEditMode) {
                    for (const file of images || []) {
                        if (file) {
                            formData.append('image', file);
                        }
                    }
                }
                formData.append('isDeleted', isImageDeletedInEditMode);
                formData.append('s3Keys', item.s3_paths || []);
            } else {
                formData.append('category_id', activeCategory);
                user?.full_name && formData.append('user', user?.full_name);

                for (const file of images || []) {
                    if (file) {
                        formData.append('image', file);
                    }
                }
            }

            let method = 'POST';
            let url = `${process.env.REACT_APP_BACKEND_URL}/api/ceyiz/item`;

            const isMemory = decodedPathname === '/anılar';
            const isPoem = decodedPathname === '/siir';

            if (isMemory) {
                url = `${process.env.REACT_APP_BACKEND_URL}/api/memory`;
            }

            if (isPoem) {
                url = `${process.env.REACT_APP_BACKEND_URL}/api/poem`;
            }

            if (editMode) {
                method = 'PUT';
                url += `/${item._id}`;
            }

            const responseData = await sendRequest(url, method, {}, formData);

            if (responseData.message) {
                showSuccessMessage({ message: responseData.message });
            }

            setItems(prev => {
                if (responseData.updatedItem) {
                    return prev.map(p => (p._id === responseData.updatedItem._id ? responseData.updatedItem : p));
                } else {
                    return [responseData.item, ...prev];
                }
            });
            setImages(null);
            handleModalClose();
        } catch (error) {
            handleError({ message: error.message });
        } finally {
            setIsLoading(false);
            setIsMemoryLoading?.(false);
        }
    };

    useEffect(() => {
        if (editMode && open) {
            const fields = { ...item };

            if (item.date) {
                fields.date = dayjs(item.date);
            }

            form.setFieldsValue(fields);
        }
    }, [editMode, item, open, form]);

    return (
        <Modal
            destroyOnClose
            title={title()}
            open={open}
            onCancel={handleModalClose}
            className={styles.modal}
            footer={false}
        >
            <Form layout='vertical' form={form} onFinish={handleFinish}>
                {decodedPathname !== '/siir' && (
                    <ImageUpload
                        open={open}
                        isDeleted={isImageDeletedInEditMode}
                        setIsDeleted={setIsImageDeletedInEditMode}
                        setIsChanged={setIsImageChangedInEditMode}
                        editMode={editMode}
                        setImages={setImages}
                        s3Paths={item?.s3_paths}
                    />
                )}
                <div style={{ height: '1em' }} />
                <FormElements Form={Form} />
                <HStack className={styles.footer}>
                    <Button color='error' variant='contained' onClick={handleModalClose}>
                        Cancel
                    </Button>
                    <Button
                        startIcon={isLoading ? <CircularProgress color='inherit' size={15} /> : null}
                        type='submit'
                        variant='contained'
                    >
                        {editMode ? 'Kaydet' : 'Ekle'}
                    </Button>
                </HStack>
            </Form>
        </Modal>
    );
};

export default NewItemModal;
