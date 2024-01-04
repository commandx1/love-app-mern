import Slider from 'react-slick';
import styles from './slick.module.scss';
import { CardMedia } from '@mui/material';
import FullScreenImage from '../fullscreen-image/fullsceen-image';
import { useState } from 'react';
import { createPortal } from 'react-dom';

const Slick = ({ previewUrls, fullWidth }) => {
    const [isFullWidthOpen, setIsFullWidthOpen] = useState(false);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        className: [styles.slick, fullWidth && styles.fullWidth].filter(Boolean).join(' '),
    };

    return (
        <>
            {createPortal(
                <FullScreenImage
                    previewUrls={previewUrls}
                    open={isFullWidthOpen}
                    onClose={() => setIsFullWidthOpen(false)}
                />,
                document.body
            )}
            <Slider {...settings}>
                {previewUrls.map((previewUrl, index) => (
                    <CardMedia
                        onClick={() => setIsFullWidthOpen(true)}
                        key={index}
                        component='img'
                        height='250'
                        image={previewUrl}
                        alt='new_item'
                    />
                ))}
            </Slider>
        </>
    );
};

export default Slick;
