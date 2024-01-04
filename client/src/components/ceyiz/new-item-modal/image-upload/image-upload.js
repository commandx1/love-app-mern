import { Button } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ButtonGroup from '@mui/material/ButtonGroup';
import { imageUrl } from 'helpers/process_env';
import Slider from 'components/common/slick/slick';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

const ImageUpload = ({ setImages, editMode, s3Paths, setIsChanged, setIsDeleted, open }) => {
    const [previewUrls, setPreviewUrls] = useState([]);

    const fileInputRef = useRef(null);

    const handleInputClick = () => fileInputRef.current.click();

    const handleImageDelete = () => {
        setImages(null);
        setPreviewUrls([]);

        if (editMode) {
            setIsDeleted(true);
        }
    };

    const handleImageUpload = async event => {
        let pickedFiles;
        setPreviewUrls([]);

        if (event.target.files?.length) {
            pickedFiles = event.target.files;
            setImages(pickedFiles);

            for (let i = 0; i < pickedFiles.length; i++) {
                const pickedFile = pickedFiles[i];
                const fileReader = new FileReader();
                fileReader.onload = () => {
                    setPreviewUrls(prev => [...prev, fileReader.result]);

                    if (editMode) {
                        setIsChanged(true);
                        setIsDeleted(false);
                    }
                };
                fileReader.readAsDataURL(pickedFile);
            }
        }
    };

    useEffect(() => {
        if (editMode && s3Paths?.length && open) {
            setPreviewUrls(s3Paths.map(s3Path => `${imageUrl}/${s3Path}`));
        }
    }, [editMode, s3Paths, open]);

    return (
        <>
            <input
                accept='.jpg,.png,.jpeg'
                ref={fileInputRef}
                style={{ display: 'none' }}
                multiple
                type='file'
                onChange={handleImageUpload}
            />

            {previewUrls?.length ? (
                <>
                    <Slider previewUrls={previewUrls} fullWidth />
                    <ButtonGroup
                        style={{ marginTop: '2em' }}
                        fullWidth
                        variant='contained'
                        aria-label='outlined primary button group'
                    >
                        <Button onClick={handleInputClick}>Yeniden Seç</Button>
                        <Button color='error' onClick={handleImageDelete}>
                            Resmi Sil
                        </Button>
                    </ButtonGroup>
                </>
            ) : (
                <Button fullWidth variant='contained' startIcon={<CloudUploadIcon />} onClick={handleInputClick}>
                    Resim Yükle
                    <VisuallyHiddenInput type='file' />
                </Button>
            )}
        </>
    );
};

export default ImageUpload;
