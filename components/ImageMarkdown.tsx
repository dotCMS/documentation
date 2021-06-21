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
                    width={props.width}
                    {...props}
                />
            ) : (
                <img loading="lazy" src={props.src} />
            )}
        </>
    );
};
