import React from 'react';
import { AppProps } from 'next/app';
import GlobalStyle from '@styles/Global.styles';
import '@styles/prismjs-theme-dotcms.css';

// Tailwind
import '@styles/globals.css';
import { Header } from '../components/header/Header';
import SideBar from '@components/SideBar';
import SideNav from '../components/SideNav';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
    return (
        <>
            <GlobalStyle />
            {pageProps.navDot ? (
                <div className="grid grid-cols-100 grid-rows-content min-h-screen">
                    <Header />
                    <div className="grid grid-cols-content">
                        <SideBar>
                            <SideNav data={pageProps.navDot[0]} />
                        </SideBar>
                        <div className="px-10">
                            <Component {...pageProps} />
                        </div>
                    </div>
                </div>
            ) : (
                <Component {...pageProps} />
            )}
        </>
    );
}

export default MyApp;
