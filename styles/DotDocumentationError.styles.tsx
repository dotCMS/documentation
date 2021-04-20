import styled from 'styled-components';

const DocumentationErrors = styled.div`
    border-radius: var(--size-gap-half);
    background-color: var(--color-ansi-bg);
    color: var(--color-ansi-fg);

    &::selection,
    *::selection {
        background-color: var(--color-ansi-selection);
    }

    * {
        color: inherit;
        background-color: transparent;
        font-family: var(--font-stack-monospace);
    }

    & > * {
        margin: 0;
        padding: calc(var(--size-gap) + var(--size-gap-half))
            calc(var(--size-gap-double) + var(--size-gap-half));
    }

    pre {
        white-space: pre-wrap;
        word-break: break-word;
    }
`;

export default DocumentationErrors;
