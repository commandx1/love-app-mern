import { IconButton } from '@mui/material';
import { backendUrl } from 'helpers/process_env';
import showSuccessMessage from 'helpers/show-success-message';
import useHandleError from 'helpers/use-handle-error';
import useHttp from 'helpers/use-http';
import FavoriteIcon from '@mui/icons-material/Favorite';

const FavouriteIcon = ({ ceyizItemId, isFavourite, setItems, activeTab }) => {
    const sendRequest = useHttp();
    const handleError = useHandleError();

    const handleFavouriteClick = async () => {
        try {
            const res = await sendRequest(
                `${backendUrl}/api/ceyiz/item/${ceyizItemId}/status`,
                'PUT',
                {},
                { bool: !isFavourite }
            );

            if (res.message) {
                showSuccessMessage({ message: res.message });
            }

            setItems(prev =>
                activeTab === '_favourite_'
                    ? prev.filter(p => p._id !== ceyizItemId)
                    : prev.map(p => (p._id === ceyizItemId ? { ...p, is_favourite: !p.is_favourite } : p))
            );
        } catch (error) {
            handleError({ message: error.message });
        }
    };
    return (
        <IconButton aria-label='add to favorites' onClick={handleFavouriteClick}>
            <FavoriteIcon color={isFavourite ? 'error' : 'inherit'} />
        </IconButton>
    );
};

export default FavouriteIcon;
