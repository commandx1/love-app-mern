import HStack from 'components/common/hstack';
import logo from './logo.png';

import styles from './menu.module.scss';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton } from '@mui/material';
import PlayMusic from 'components/common/play-music/play-music';
import VStack from 'components/common/vstack/vstack';
import { CloseOutlined } from '@mui/icons-material';

const Menu = () => {
    const [isOpen, setIsOpen] = useState(false);

    const leftMenuItems = [{ title: 'Anasayfa' }, { title: 'Galeri' }, { title: 'Çeyizler', url: 'ceyiz' }];
    const rightMenuItems = [
        { title: 'Anılar', url: 'anılar' },
        { title: 'Şiirler' },
        { title: 'Blog' },
        { title: 'Çıkış', url: 'cikis' },
    ];

    useEffect(() => {
        const fixed = document.querySelector(`.${styles.fixed}`);
        const AppContent = document.querySelector('.AppMain_content');

        AppContent.addEventListener('scroll', e => {
            if (e.target.scrollTop > 36) {
                fixed.classList.add(styles.sticky);
                fixed.classList.remove(styles.nonSticky);
            } else if (fixed.classList.contains(styles.sticky)) {
                fixed.classList.add(styles.nonSticky);
                fixed.classList.remove(styles.sticky);
            }
        });
    }, []);

    return (
        <div className={styles.fixed}>
            <HStack className={styles.menu}>
                {leftMenuItems.map(item => (
                    <Link key={item.title} to={item.url || '/'}>
                        {item.title}
                    </Link>
                ))}
                <img src={logo} alt='logo' />
                {rightMenuItems.map(item => (
                    <Link key={item.title} to={item.url || '/'}>
                        {item.title}
                    </Link>
                ))}

                <IconButton className={styles.hamburger} onClick={() => setIsOpen(p => !p)}>
                    <CloseOutlined className={isOpen ? styles.active : ''} />
                    <MenuIcon className={!isOpen ? styles.active : ''} />
                </IconButton>
                <VStack className={[styles.mobileMenu, isOpen && styles.open].filter(Boolean).join(' ')}>
                    {[...leftMenuItems, ...rightMenuItems].map(item => (
                        <Link key={item.title} to={item.url || '/'}>
                            {item.title}
                        </Link>
                    ))}
                </VStack>

                <PlayMusic />
            </HStack>
        </div>
    );
};

export default Menu;
