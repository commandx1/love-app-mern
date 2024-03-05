import HomeImage from './home-image/home-image';
import VStack from 'components/common/vstack';
import Button from '@mui/material/Button';
import { useState } from 'react';
import Map from 'components/map';

const Home = () => {
    const [showMap, setShowMap] = useState(false);

    return (
        <VStack>
            <HomeImage />
            <Button onClick={() => setShowMap(true)}>Harita</Button>
            <Map open={showMap} onClose={() => setShowMap(false)} />
        </VStack>
    );
};

export default Home;
