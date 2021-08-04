module.exports = {
    basePath: process.env.BASE_PATH,
    images: {
        loader: 'cloudinary',
        path: ''
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
            },
            {
                source: '/download/:path*',
                destination: 'https://dotcms.com/donwload/:path*'
            }
        ];
    },
    future: {
        webpack5: true
    }
};
