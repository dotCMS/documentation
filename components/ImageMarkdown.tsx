import React, { useState, useEffect } from 'react';
import NextImage from 'next/image';

const ImageMarkdown = (props: { src: string; width?: string; height?: string }): JSX.Element => {
    const [width, setWidth] = useState(null);
    const [height, setHeight] = useState(null);
    const [loaded, setLoaded] = useState(false);
    if (props.width && props.height) {
        setWidth(props.width);
        setHeight(props.height);
        setLoaded(true);
    }
    useEffect(() => {
        if (!loaded) {
            const img = new Image();
            img.src = 'https://dotcms.com' + props.src;
            img.addEventListener('load', () => {
                setWidth(img.width);
                setHeight(img.height);
                setLoaded(true);
            });
        }
    }, []);
    const myLoader = ({ src }) => src;
    return (
        <>
            {loaded && (
                <div className="flex justify-center">
                    <NextImage
                        height={height}
                        layout="intrinsic"
                        loader={myLoader}
                        width={width}
                        {...props}
                    />
                </div>
            )}
        </>
    );
};

export default ImageMarkdown;
