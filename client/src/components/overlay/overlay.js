import React, { useEffect, useRef, useState } from 'react';

export default function Overlay({ visible, children, ...props }) {
    const timer = useRef();
    const [hidden, setHidden] = useState(true);
    const [position, setPosition] = useState(0);

    useEffect(() => {
        clearTimeout(timer.current);

        if (visible) {
            setHidden(false);
            timer.current = setTimeout(() => {
                setPosition(1);
            }, 0);
        }
        else {
            setPosition(0);
            timer.current = setTimeout(() => {
                setHidden(true);
            }, 400);
        }
    }, [visible]);

    if (hidden) {
        return null;
    }

    const style = {
        display: 'flex',
        alignItems: 'stretch',
        justifyContent: 'stretch',
        position: 'absolute',
        top: '0px',
        left: position === 0 ? '100%' : '0px',
        width: '100%',
        height: '100%',
        zIndex: 999999999999,
        transition: 'left 0.4s'
    };

    return (
        <div style={style} {...props}>
            {children}
        </div>
    );
}
