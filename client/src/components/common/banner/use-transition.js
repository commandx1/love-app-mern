import ChairIcon from '@mui/icons-material/Chair';
import BedIcon from '@mui/icons-material/Bed';
import KitchenIcon from '@mui/icons-material/Kitchen';
import MicrowaveIcon from '@mui/icons-material/Microwave';
import BlenderIcon from '@mui/icons-material/Blender';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import TvIcon from '@mui/icons-material/Tv';
import DiningIcon from '@mui/icons-material/Dining';
import WeekendIcon from '@mui/icons-material/Weekend';
import { useLayoutEffect, useState } from 'react';
import { Balloon } from './banner-svg';

const icons = [
    ChairIcon,
    BedIcon,
    KitchenIcon,
    MicrowaveIcon,
    WeekendIcon,
    DiningIcon,
    TvIcon,
    CheckroomIcon,
    BlenderIcon,
];

const createRandomNumber = () => Math.floor(Math.random() * (icons.length - 1) + 1);
const setState = (func, Icon, animationDuration = '6s') =>
    func(
        <Icon
            style={{
                animationDuration,
                left: `${Math.floor(Math.random() * (85 - 25 + 1)) + 25}vw`,
            }}
        />
    );

const createIcon = prev => {
    let randomNumber = createRandomNumber();

    while (prev === randomNumber) {
        randomNumber = Math.floor(Math.random() * (85 - 25 + 1));
    }

    return icons[randomNumber];
};

const useTransition = title => {
    const [element1, setElement1] = useState();
    const [element2, setElement2] = useState();
    const [element3, setElement3] = useState();
    const [element4, setElement4] = useState();

    useLayoutEffect(() => {
        let prev;

        if (title === 'Çeyizlerimiz') {
            setElement1(
                <TvIcon
                    style={{
                        left: `${Math.floor(Math.random() * (85 - 25 + 1)) + 25}vw`,
                    }}
                />
            );
            setInterval(() => {
                const Icon = createIcon(prev);
                setState(setElement1, Icon);
            }, 6000);

            setInterval(() => {
                const Icon = createIcon(prev);
                setState(setElement2, Icon, '4s');
            }, 4000);

            setInterval(() => {
                const Icon = createIcon(prev);
                setState(setElement3, Icon, '8s');
            }, 8000);

            setInterval(() => {
                const Icon = createIcon(prev);
                setState(setElement4, Icon, '3s');
            }, 3000);
        }

        if (title === 'Anılarımız') {
            setInterval(() => {
                setState(setElement1, Balloon);
            }, 6000);

            setInterval(() => {
                setState(setElement2, Balloon, '4s');
            }, 4000);
        }
    }, [title]);

    return { element1, element2, element3, element4 };
};

export default useTransition;
