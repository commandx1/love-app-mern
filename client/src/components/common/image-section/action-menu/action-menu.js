import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Loader from 'components/loader';
import showSuccessMessage from 'helpers/show-success-message';
import useHandleError from 'helpers/use-handle-error';
import useHttp from 'helpers/use-http';
import { useState } from 'react';
import modal from 'antd/lib/modal';
import NewItemModal from 'components/ceyiz/new-item-modal';
import { useLocation } from 'react-router-dom';
import $ from 'jquery';
import 'turn.js';

const ActionMenu = ({ anchorEl, handleMenuClose, item, setItems, setIsMemoryLoading, lastPageNumber, isEven }) => {
    const [isDeleting, setIsDeleting] = useState(false);
    const [isFormVisible, setIsFormVisible] = useState(false);

    const handleError = useHandleError();
    const sendRequest = useHttp();
    const location = useLocation();

    const handleModalOpen = () => setIsFormVisible(true);
    const handleModalClose = () => setIsFormVisible(false);

    const renderMove = () => {
        if (!setIsMemoryLoading) {
            return;
        }

        if (isEven) {
            return (
                <MenuItem
                    onClick={() => {
                        var flipbookEL = document.getElementById('flipbook');
                        $(flipbookEL).turn('page', lastPageNumber);
                    }}
                >
                    Son Sayfaya Git
                </MenuItem>
            );
        }

        return (
            <MenuItem
                onClick={() => {
                    var flipbookEL = document.getElementById('flipbook');
                    $(flipbookEL).turn('page', 1);
                }}
            >
                İlk Sayfaya Dön
            </MenuItem>
        );
    };

    const handleDeleteClick = async () => {
        try {
            setIsDeleting(true);
            setIsMemoryLoading?.(true);

            const decodedPathname = decodeURIComponent(location.pathname);
            const isMemory = decodedPathname === '/anılar';

            let path = '/api/ceyiz/item/';

            if (isMemory) {
                path = '/api/memory/';
            }

            const res = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}${path}${item._id}`, 'DELETE');

            if (res.message) {
                showSuccessMessage({ message: res.message });
            }

            setItems(prev => prev.filter(p => p._id !== item._id));
        } catch (error) {
            handleError({ message: error.message });
        } finally {
            setIsDeleting(false);
            setIsMemoryLoading?.(false);
        }
    };

    return (
        <>
            {!setIsMemoryLoading && <Loader loading={isDeleting} />}
            <NewItemModal
                open={isFormVisible}
                onCancel={handleModalClose}
                activeCategory={item.category_id}
                setItems={setItems}
                editMode={true}
                item={item}
                setIsMemoryLoading={setIsMemoryLoading}
            />
            <Menu
                id='basic-menu'
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                MenuListProps={{
                    'aria-labelledby': 'settings',
                }}
                transformOrigin={{ horizontal: 'left', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'left', vertical: 'center' }}
            >
                <MenuItem onClick={handleModalOpen}>Düzenle</MenuItem>
                <MenuItem
                    onClick={() =>
                        modal.confirm({
                            content: 'Eşyayı silmek istediğinize emin misiniz?',
                            onOk: handleDeleteClick,
                            cancelText: 'İptal',
                        })
                    }
                >
                    Sil
                </MenuItem>
                {renderMove()}
            </Menu>
        </>
    );
};

export default ActionMenu;
