module.exports = {
    async rewrites() {
        return [
            {
                source: '/contentAsset/:path*',
                destination: 'https://dotcms.com/contentAsset/:path*'
            }
        ];
    },
    future: {
        webpack5: true
    }
};
