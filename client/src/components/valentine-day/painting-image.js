import { useEffect, useMemo, useRef, useState } from 'react';
import './valentine-day.scss';
import VStack from 'components/common/vstack';
import SvgImage from './svg';
import tour from './tour.png';
import tour2 from './tour2.png';
import { Button, ColorPicker, Tour } from 'antd';
import { Typography } from '@mui/material';

const PaintingImage = ({ onFinish }) => {
    const ref1 = useRef(null);
    const ref2 = useRef(null);
    const ref3 = useRef(null);

    const [color, setColor] = useState('#1677ff');
    const [isTourOpen, setIsTourOpen] = useState(false);

    const bgColor = useMemo(() => (typeof color === 'string' ? color : color.toHexString()), [color]);
    const btnStyle = {
        backgroundColor: bgColor,
        fontSize: 24,
        height: 45,
        width: '100%',
    };

    useEffect(() => {
        setTimeout(() => {
            setIsTourOpen(true);
        }, 1500);
    }, []);

    useEffect(() => {
        document.querySelectorAll('#katman_2 path').forEach(p => {
            if (p.id !== 'fix') {
                p.addEventListener('click', e => {
                    e.target.style.fill = bgColor;
                });
            }
        });
    }, [bgColor]);

    return (
        <>
            <VStack>
                <div>
                    İpuçlarını görmek için{' '}
                    <span onClick={() => setIsTourOpen(true)} style={{ color: 'green', cursor: 'pointer' }}>
                        TIKLA
                    </span>
                </div>
                <div ref={ref1}>
                    <ColorPicker value={color} onChange={setColor}>
                        <Button type='primary' style={btnStyle}>
                            Renk Seçmek İçin Buraya Tıklayabilirsin Aşkım
                        </Button>
                    </ColorPicker>
                </div>

                <div ref={ref2}>
                    <SvgImage ref={ref2} />
                </div>

                <Button ref={ref3} onClick={onFinish}>
                    Puzzle'a İlerlemek İçin Tıkla ☺️
                </Button>
            </VStack>
            <Tour
                open={isTourOpen}
                onClose={() => setIsTourOpen(false)}
                steps={[
                    {
                        title: <Typography fontSize={24}>RENK SEÇME</Typography>,
                        description: (
                            <Typography fontSize={18}>
                                Bu butona tıkladığında resimdeki gibi bir renk paleti açılacak aşkım ve oradan istediğin
                                rengi seçebileceksin.
                            </Typography>
                        ),
                        cover: <img alt='tour.png' src={tour} />,
                        nextButtonProps: { children: 'Devam' },
                        mask: {
                            color: 'rgba(0, 0, 0, .8)',
                        },
                        target: () => ref1.current,
                    },
                    {
                        title: <Typography fontSize={24}>FİGÜRLERİ BOYAMA</Typography>,
                        cover: <img alt='tour2.png' src={tour2} />,
                        description: (
                            <Typography fontSize={18}>
                                Renk seçtikten sonra boyamak istediğin alanın üzerine gelip sol tıklayabilirsin. Mesela
                                yukarıdaki resimde saçlarının üzerine tıklayıp boyadığımı görebilirsin. Farklı bir
                                renkle boyamaya devam etmek için yukarıdaki butona tıklayıp yeniden renk seçmelisin.
                            </Typography>
                        ),
                        nextButtonProps: { children: 'Devam' },
                        prevButtonProps: { children: 'Geri' },
                        mask: {
                            color: 'rgba(0, 0, 0, .8)',
                        },
                        target: () => ref2.current,
                    },
                    {
                        title: <Typography fontSize={24}>BOYAMAYI BİTİRME</Typography>,
                        description: (
                            <Typography fontSize={18}>
                                Boyamayı bitirip puzzle'a geçmek için, işaret ettiğim butonu kullanabilirsin. Hadi kolay
                                gelsin 😘
                            </Typography>
                        ),
                        nextButtonProps: { children: 'Tamam' },
                        prevButtonProps: { children: 'Geri' },
                        mask: {
                            color: 'rgba(0, 0, 0, .8)',
                        },
                        target: () => ref3.current,
                    },
                ]}
            />
        </>
    );
};

export default PaintingImage;
