import React, { useState, useEffect } from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import GlobalStyle from '@styles/Global.styles';
import '@styles/prismjs-theme-dotcms.css';
import styled from 'styled-components';

// Tailwind
import '@styles/globals.css';
import { Header } from '@components/header/Header';
import { Footer } from '@components/Footer';
import { SideBar } from '@components/sidebar/SideBar';
import { SideNav } from '@components/sidebar/SideNav';
import { useRouter } from 'next/router';
import { searchBreadCrumb } from '@helpers/searchBreadCrump';

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
    const { pageTitle, navDot, toc } = pageProps;
    // States
    const [showSidebar, setShowSidebar] = useState(true);
    const [showSideToc, setShowSideToc] = useState(false);
    const [breadCrumb, setBreadcrumb] = useState([]);
    // Const
    const title = pageTitle || 'Documentation';
    const navData = navDot ? navDot[0] : [];
    const sideNav = navDot;
    const showTocButton = !!toc?.length;
    // Router
    const router = useRouter();
    const docPage = router.asPath.split('/')[1] || '';
    useEffect(() => {
        setBreadcrumb(searchBreadCrumb(navData.dotcmsdocumentationchildren, docPage));
    }, [docPage]);
    return (
        <>
            <Head>
                <title>{title}</title>
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
                            showSideBar={showSidebar}
                            showSideButton={sideNav}
                            showTocButton={showTocButton}
                        />
                    </HeaderWrapper>
                    <SideBar setShowSidebar={setShowSidebar} showSidebar={showSidebar}>
                        <SideNav breadCrumb={breadCrumb} data={navData} />
                    </SideBar>
                    <Component showSideToc={showSideToc} {...pageProps} />
                </Grid>
            ) : (
                <Grid codeShare={true}>
                    <HeaderWrapper>
                        <Header
                            setShowSideToc={setShowSideToc}
                            setShowSidebar={setShowSidebar}
                            showSideBar={showSidebar}
                            showSideButton={sideNav}
                            showTocButton={showTocButton}
                        />
                    </HeaderWrapper>
                    <div className="flex flex-col overflow-auto">
                        <Component {...pageProps} />
                        <Footer />
                    </div>
                </Grid>
            )}
        </>
    );
}

export default MyApp;
