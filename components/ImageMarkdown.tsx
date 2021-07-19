import React from 'react';
import NextImage from 'next/image';

export const ImageMarkdown = (props: {
    src: string;
    width?: string;
    height?: string;
}): JSX.Element => {
    const myLoader = ({ src }) => src;
    return (
        <>
            {props.width && props.height ? (
                <NextImage
                    height={props.height}
                    layout="intrinsic"
                    loader={myLoader}
                    src={props.height}
                    width={props.width}
                />
            ) : (
                <img loading="lazy" src={props.src} />
            )}
        </>
    );
};
