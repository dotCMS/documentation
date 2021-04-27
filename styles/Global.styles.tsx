import React, { ReactElement } from 'react';
import { createGlobalStyle } from 'styled-components';
import { Normalize } from 'styled-normalize';

const GlobalStyle = createGlobalStyle`
:root {
    --color-main: #0070f3;
    --color-text: #1d1d1f;
    --font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell,
        Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    --size-gap-half: 4px;
    --size-gap: 8px;
    --size-gap-double: 16px;
    --font-stack-monospace: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace;
    --color-ansi-selection: rgba(95, 126, 151, 0.48);
    --color-ansi-bg: #111111;
    --color-ansi-fg: #cccccc;
    --color-ansi-white: #777777;
    --color-ansi-black: #141414;
    --color-ansi-blue: #00aaff;
    --color-ansi-cyan: #88ddff;
    --color-ansi-green: #98ec65;
    --color-ansi-magenta: #aa88ff;
    --color-ansi-red: #ff5555;
    --color-ansi-yellow: #ffcc33;
    --color-ansi-bright-white: #ffffff;
    --color-ansi-bright-black: #777777;
    --color-ansi-bright-blue: #33bbff;
    --color-ansi-bright-cyan: #bbecff;
    --color-ansi-bright-green: #b6f292;
    --color-ansi-bright-magenta: #cebbff;
    --color-ansi-bright-red: #ff8888;
    --color-ansi-bright-yellow: #ffd966;
}

html,
body {
    -webkit-font-smoothing: antialiased;
    color: var(--color-text);
    font-family: var(--font-family);
    line-height: 1.5;
    margin: 0;
    padding: 0;
}

* {
    box-sizing: border-box;
}
`;

export default function Global(): ReactElement {
    return (
        <>
            <Normalize />
            <GlobalStyle />
        </>
    );
}
