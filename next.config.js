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
            }
        ];
    }
    // future: {
    //     webpack5: true,
    // },
};
