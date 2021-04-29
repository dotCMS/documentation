import React from 'react';
import Image from 'next/image';
import styled from 'styled-components';

const ImageContainer = styled.div`
    width: 100%;
    position: relative;
    > div {
        position: unset !important;
    }
    .image {
        object-fit: contain;
        width: 100% !important;
        position: relative !important;
        height: unset !important;
        margin: auto !important;
    }
`;

const ImageMarkdown = (props: { src: string }): JSX.Element => {
    const myLoader = ({ src }) => src;
    return (
        <ImageContainer>
            <Image className="image" layout="fill" loader={myLoader} {...props} />
        </ImageContainer>
    );
};

export default ImageMarkdown;
