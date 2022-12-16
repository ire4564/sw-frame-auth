const path = require('path');

module.exports = {
    core: {
        builder: 'webpack5',
    },
    stories: ['../**/*.stories.mdx', '../**/*.stories.tsx'],
    addons: ['@storybook/addon-actions', '@storybook/addon-notes'],
    framework: '@storybook/react',
    webpackFinal: async config => {
        config.module.rules.push({
            test: /\.(ts|tsx)$/,
            use: ['ts-loader'],
            include: path.resolve(__dirname, '../src'),
            exclude: /node_modules/,
        });
        return config;
    },
};
