import React from 'react';
import { AppProps } from 'next/app';
import GlobalStyle from '@styles/Global.styles';

// Graphql
import { createClient, Provider } from 'urql';

const client = createClient({
    url: 'https://dotcms.com/api/v1/graphql'
});

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
    return (
        <>
            <Provider value={client}>
                <GlobalStyle />
                <Component {...pageProps} />
            </Provider>
        </>
    );
}

export default MyApp;
