module.exports = {
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
                destination: '/codeshare/topic/all/1'
            },
            {
                source: '/codeshare/topic',
                destination: '/codeshare/topic/all/1'
            }
        ];
    },
    future: {
        webpack5: true
    }
};
