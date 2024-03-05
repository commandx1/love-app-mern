import { MapContainer, GeoJSON } from 'react-leaflet';
import mapData from './countries.json';
import { cities } from './cities';
import 'leaflet/dist/leaflet.css';
import './map.scss';
import { useEffect, useRef, useState } from 'react';
import Overlay from 'components/overlay/overlay';
import useHttp from 'helpers/use-http';
import useHandleError from 'helpers/use-handle-error';
import { backendUrl } from 'helpers/process_env';
import Loader from 'components/loader';
import { Button, CircularProgress } from '@mui/material';
import CheckIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/UndoOutlined';
import showSuccessMessage from 'helpers/show-success-message';

const defaultCountryStyle = {
    fillColor: 'red',
    fillOpacity: 1,
    color: 'black',
    weight: 1,
};

const selectedStyle = {
    fillColor: '#ffff00',
    fillOpacity: 1,
    color: 'green',
    weight: 1,
};

const MyMap = ({ open, onClose }) => {
    const selectedCountries = useRef();
    const [isLoading, setIsLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    const sendRequest = useHttp();
    const handleError = useHandleError();

    const onEachCountry = (country, layer) => {
        const countryName = country.properties.ADMIN;
        layer.bindPopup(countryName);

        if (selectedCountries.current.includes(countryName)) {
            layer.setStyle(selectedStyle);
        } else {
            layer.setStyle(defaultCountryStyle);
            layer.options.fillOpacity = 0.3 + Math.random() * 0.7;
        }

        layer.on({
            click: () => handleCountryClick(countryName, layer),
        });
    };

    const handleCountryClick = (countryName, layer) => {
        if (selectedCountries.current.includes(countryName)) {
            selectedCountries.current = selectedCountries.current.filter(c => c !== countryName);
            layer.options.fillOpacity = Math.random(); //0-1 (0.1, 0.2, 0.3)
            return layer.setStyle(defaultCountryStyle);
        }

        layer.setStyle(selectedStyle);

        selectedCountries.current = [...selectedCountries.current, countryName];
    };

    const savePlaces = async () => {
        try {
            setIsSaving(true);
            const res = await sendRequest(`${backendUrl}/api/place`, 'PATCH', {}, { names: selectedCountries.current });

            if (res?.message) {
                showSuccessMessage({ message: res.message });
            }
        } catch (error) {
            handleError({ message: error.message });
        } finally {
            setIsSaving(false);
        }
    };

    useEffect(() => {
        const fetchPlaces = async () => {
            try {
                setIsLoading(true);
                const res = await sendRequest(`${backendUrl}/api/place`);
                selectedCountries.current = res.places || [];
            } catch (error) {
                handleError({ message: error.message });
            } finally {
                setIsLoading(false);
            }
        };

        fetchPlaces();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Overlay visible={open} className='map-overlay'>
            <Button variant='contained' className='close-button' onClick={onClose}>
                <CloseIcon /> Geri Dön
            </Button>
            <Loader loading={isLoading} />
            <MapContainer style={{ height: '100vh', width: '100vw' }} zoom={6} center={[40, 36]}>
                {!isLoading && (
                    <GeoJSON data={[...mapData.features, ...cities.features]} onEachFeature={onEachCountry} />
                )}
            </MapContainer>
            <Button onClick={savePlaces} variant='contained' className='save-button'>
                {isSaving ? <CircularProgress size={12} style={{ color: '#fff' }} /> : <CheckIcon />} Kaydet
            </Button>
        </Overlay>
    );
};

export default MyMap;
