import React, { useLayoutEffect } from 'react';
import $ from 'jquery';
import 'turn.js';

const Turn = ({ style, className, children }) => {
    useLayoutEffect(() => {
        var flipbookEL = document.getElementById('flipbook');

        window.addEventListener('resize', function (e) {
            flipbookEL.style.width = '';
            flipbookEL.style.height = '';
            $(flipbookEL).turn('size', flipbookEL.clientWidth, flipbookEL.clientHeight);
        });

        $(flipbookEL).turn({
            autoCenter: true,
        });
    }, []);

    return (
        <div id='flipbook' className={className} style={Object.assign({}, style)}>
            {children}
        </div>
    );
};

export default Turn;
