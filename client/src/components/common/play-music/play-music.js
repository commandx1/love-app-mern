import React from 'react';
import { useAppContext } from '../../../context/app-context/app-context';
import MusicNote from '@mui/icons-material/MusicNote';
import MusicOff from '@mui/icons-material/MusicOff';
import { IconButton } from '@mui/material';
import styles from './play-music.module.scss';

const PlayMusic = () => {
    const { pauseMusic, playMusic, isMusicPlaying } = useAppContext();

    return (
        <div
            onClick={() => {
                isMusicPlaying ? pauseMusic() : playMusic();
            }}
        >
            <IconButton className={styles.music}>{isMusicPlaying ? <MusicOff /> : <MusicNote />}</IconButton>
        </div>
    );
};

export default PlayMusic;
