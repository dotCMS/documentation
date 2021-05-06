import React, { useState } from 'react';
import { AppProps } from 'next/app';
import GlobalStyle from '@styles/Global.styles';
import '@styles/prismjs-theme-dotcms.css';
import styled from 'styled-components';

// Tailwind
import '@styles/globals.css';
import { Header } from '../components/header/Header';
import SideBar from '@components/SideBar';
import SideNav from '@components/SideNav';

const Grid = styled.div`
    display: grid;
    grid-template-columns: max-content 1fr;
    grid-template-rows: max-content 1fr;
    min-height: 100vh;
    transition: all 4s;
`;
const HeaderWrapper = styled.div`
    grid-column: 1/-1;
`;

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
    const [hide, updateHide] = useState(false);
    console.log(pageProps?.navDot);
    return (
        <>
            <GlobalStyle />
            <Grid>
                <HeaderWrapper>
                    <Header />
                </HeaderWrapper>
                <SideBar hide={hide} updateHide={updateHide}>
                    <SideNav data={pageProps?.navDot || []} />
                </SideBar>
                <main className="max-w-7xl justify-self-center mx-8">
                    <Component {...pageProps} />
                </main>
            </Grid>
        </>
    );
}

export default MyApp;
