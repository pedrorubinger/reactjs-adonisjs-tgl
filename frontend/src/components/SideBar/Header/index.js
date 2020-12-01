import React, { useCallback, useEffect, useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';

import styles from './Header.module.css';
import Logo from './Logo';
import ArrowButton from '../../UI/Buttons/ArrowButton';

const Header = ({ setSideBar, items }) => {
    const [mobileMenu, setMobileMenu] = useState(window.innerWidth <= 590);
    const handleWidthChange = useCallback(() => {
        if(window.innerWidth > 590 && mobileMenu === true) setMobileMenu(false);
        if(window.innerWidth <= 590 && mobileMenu === false) setMobileMenu(true);
    }, [mobileMenu]);

    useEffect(() => {
        window.addEventListener('resize', handleWidthChange);

        return () => window.removeEventListener('resize', handleWidthChange);
    }, [handleWidthChange]);

    const showSideBar = () => setSideBar('block');

    return (
        <div className={styles.Container}>
            {
                !mobileMenu ? 
                    <div className={styles.MenuContainer}>
                        <Logo />

                        <nav className={styles.Nav}>
                            {
                                items.map(item => (
                                    <ArrowButton
                                        key={item.value}
                                        arrow={item.arrow}
                                        size="NormalButton"
                                        handleClick={item.callback}
                                    >
                                        {item.value}
                                    </ArrowButton>
                                ))
                            }
                        </nav>
                    </div>
                :
                    <div className={styles.MobileMenuContainer}>
                        <GiHamburgerMenu
                            className={styles.HamburgerIcon}
                            onClick={showSideBar}
                        />
                        <Logo />
                    </div>
            }
        </div>
    );
};

export default Header;