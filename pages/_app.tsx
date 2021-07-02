import React, { useState } from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import GlobalStyle from '@styles/Global.styles';
import '@styles/prismjs-theme-dotcms.css';
import styled from 'styled-components';

// Tailwind
import '@styles/globals.css';
import { Header } from '@components/header/Header';
import { FeedBack } from '@components/FeedBack';
import { Footer } from '@components/Footer';
import { SideBar } from '@components/SideBar';
import { SideNav } from '@components/SideNav';

const Grid = styled.div`
    display: grid;
    grid-template-columns: ${(props) => (props.codeShare ? '100vw max-content' : '0 100vw 0')};
    grid-template-rows: max-content 1fr;
    min-height: 100vh;
    max-height: 100vh;
    @media screen and (min-width: 1024px) {
        grid-template-columns: ${(props) =>
            props.codeShare ? '1fr max-content' : 'max-content 1fr max-content'};
    }
`;
const HeaderWrapper = styled.div`
    grid-column: 1/-1;
`;

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
    const pageTitle = pageProps.pageTitle || 'Documentation';
    const [showSidebar, setShowSidebar] = useState(true);
    const [showSideToc, setShowSideToc] = useState(false);
    return (
        <>
            <Head>
                <title>{pageTitle}</title>
                <meta
                    content="width=device-width, initial-scale=1.0, user-scalable=0"
                    name="viewport"
                />
            </Head>
            <GlobalStyle />
            {pageProps.navDot ? (
                <Grid>
                    <HeaderWrapper>
                        <Header
                            setShowSideToc={setShowSideToc}
                            setShowSidebar={setShowSidebar}
                            showSidebar={showSidebar}
                        />
                    </HeaderWrapper>
                    <SideBar setShowSidebar={setShowSidebar} showSidebar={showSidebar}>
                        <SideNav data={pageProps.navDot[0]} />
                    </SideBar>
                    <Component showSideToc={showSideToc} {...pageProps} />
                </Grid>
            ) : (
                <Grid codeShare={true}>
                    <HeaderWrapper>
                        <Header
                            setShowSideToc={setShowSideToc}
                            setShowSidebar={setShowSidebar}
                            showSidebar={showSidebar}
                        />
                    </HeaderWrapper>
                    <div className="flex flex-col overflow-auto">
                        <Component {...pageProps} />
                        <div>
                            <FeedBack />
                            <Footer />
                        </div>
                    </div>
                </Grid>
            )}
        </>
    );
}

export default MyApp;
