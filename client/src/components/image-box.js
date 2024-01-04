import React, { useRef, useState, useEffect } from 'react';

const ImageBox = ({ imageSrc, altText }) => {
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const imageRef = useRef();

    useEffect(() => {
        const handleImageLoad = () => {
            setDimensions({
                width: imageRef.current.naturalWidth,
                height: imageRef.current.naturalHeight,
            });
        };

        imageRef.current.addEventListener('load', handleImageLoad);

        return () => {
            imageRef.current.removeEventListener('load', handleImageLoad);
        };
    }, []);

    const boxStyle = {
        position: 'relative',
        width: '200px', // Örneğin, sabit bir genişlik
        height: '200px', // Örneğin, sabit bir yükseklik
        overflow: 'hidden',
        margin: '10px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    };

    const imageStyle = {
        objectFit: 'cover',
        objectPosition: 'center',
        transition: 'transform 0.3s ease-in-out',
    };

    return (
        <div style={boxStyle}>
            <img
                ref={imageRef}
                src={imageSrc}
                alt={altText}
                style={imageStyle}
                onMouseOver={e => (e.currentTarget.style.transform = 'scale(1.1)')}
                onMouseOut={e => (e.currentTarget.style.transform = 'scale(1)')}
            />
        </div>
    );
};

export default ImageBox;
