module.exports = {
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
        if (!isServer) {
            config.node = {
                dns: 'empty',
                net: 'empty',
                tls: 'empty',
                fs: 'empty',
            };
        }

        return config
    },
}