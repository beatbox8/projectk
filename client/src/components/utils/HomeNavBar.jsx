import React from 'react'
import useScreenSize from './useScreenSize';
import HomeMobileNavBar from './HomeMobileNavBar';
import HomeNavDesktop from './HomeNavDesktop';
;

function HomeNavBar() {
    const isMobile = useScreenSize();
    return isMobile ? <HomeMobileNavBar /> : <HomeNavDesktop/>;
  
}

export default HomeNavBar