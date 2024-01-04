import { useState } from 'react';
import useHandleError from '../helpers/use-handle-error';

const GeciciImage = () => {
    const [previewUrl, setPreviewUrl] = useState();
    const handleError = useHandleError();

    const handleImageUpload = async e => {
        try {
            e.preventDefault();
            const file = e.target.files[0];
            const res = await fetch('http://localhost:3001/api/image/new');
            const data = await res.json();

            if (data?.error) {
                throw data.error;
            }

            await fetch(data, {
                method: 'PUT',
                headers: { 'Content-Type': 'multipart/form-data' },
                body: file,
            });
            setPreviewUrl(data.split('?')[0]);
        } catch (error) {
            handleError(error);
        }
    };

    return (
        <>
            <input type='file' onChange={handleImageUpload} />
            {previewUrl && (
                <div style={{ width: 300, height: 300, border: '1px solid red' }}>
                    <img src={previewUrl} alt='test' style={{ objectFit: 'contain', width: '100%', height: '100%' }} />
                </div>
            )}
        </>
    );
};

export default GeciciImage;
