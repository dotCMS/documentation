import React from 'react';
import { AppProps } from 'next/app';
import GlobalStyle from '@styles/Global.styles';
import '@styles/prismjs-theme-dotcms.css';
import styled from 'styled-components';

// Tailwind
import '@styles/globals.css';
import { Header } from '../components/header/Header';
import SideBar from '@components/SideBar';
import SideNav from '../components/SideNav';

const Grid = styled.div`
    display: grid;
    grid-template-columns: 18rem 1fr;
    grid-template-rows: max-content 1fr;
    min-height: 100vh;
`;
const HeaderWrapper = styled.div`
    grid-column: 1/-1;
`;

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
    return (
        <>
            <GlobalStyle />
            {pageProps.navDot ? (
                <Grid>
                    <HeaderWrapper>
                        <Header />
                    </HeaderWrapper>
                    <SideBar>
                        <SideNav data={pageProps.navDot[0]} />
                    </SideBar>
                    <main className="max-w-7xl justify-self-center mx-8">
                        <Component {...pageProps} />
                    </main>
                </Grid>
            ) : (
                <Component {...pageProps} />
            )}
        </>
    );
}

export default MyApp;
