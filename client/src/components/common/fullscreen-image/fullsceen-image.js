import { Backdrop } from '@mui/material';
import { useEffect } from 'react';
import Slider from 'react-slick';

const FullScreenImage = ({ previewUrls, onClose, open }) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    useEffect(() => {
        document.querySelectorAll('img[alt~="fullscreen-0"]').forEach(el => el.click());
        window.addEventListener('keydown', e => {
            if (e.code === 'Escape') {
                onClose();
            }
        });
    }, [onClose]);

    return (
        <Backdrop
            open={open}
            style={{ zIndex: 999999 }}
            onClick={e => {
                if (e.target instanceof HTMLImageElement || e.target instanceof HTMLButtonElement) {
                    return;
                }

                onClose();
            }}
        >
            <div
                style={{
                    width: '95%',
                }}
            >
                <Slider {...settings}>
                    {previewUrls?.map?.((previewUrl, index) => (
                        <div key={index}>
                            <img
                                style={{
                                    maxHeight: '80vh',
                                    maxWidth: '90vw',
                                    objectFit: 'contain',
                                    margin: 'auto',
                                }}
                                src={previewUrl}
                                alt={`fullscreen-${index}`}
                            />
                        </div>
                    ))}
                </Slider>
            </div>
        </Backdrop>
    );
};

export default FullScreenImage;
