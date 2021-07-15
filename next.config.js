module.exports = {
    images: {
        loader: 'imgix',
        path: 'https://noop/'
    },
    async rewrites() {
        return [
            {
                source: '/contentAsset/:path*',
                destination: 'https://dotcms.com/contentAsset/:path*'
            },
            {
                source: '/dA/:path*',
                destination: 'https://dotcms.com/dA/:path*'
            },
            {
                source: '/codeshare',
                destination: '/codeshare/topic/all'
            },
            {
                source: '/codeshare/topic',
                destination: '/codeshare/topic/all'
            }
        ];
    },
    future: {
        webpack5: true
    }
};
