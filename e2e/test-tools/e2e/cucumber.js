const common = {
    requireModule: ['ts-node/register'],
    require: ['features/support/steps.js', 'features/**/*.ts'],
    format: ['progress-bar'],
    //"retry": 1,
    // "retryTagFilter": "@flaky",
    publishQuiet: true,
    paths: ['../../*/e2e', '../../*/features', './features', '../../test-features/*/features', '../../../node_modules/@prg-cube/*/features'],
};

module.exports = {
    default: {
        ...common,
        worldParameters: {
            headless: false,
        },
    },
    browser: {
        ...common,
        worldParameters: {
            headless: false,
            electron: false,
        },
    },
    'electron:playwright': {
        ...common,
        worldParameters: {
            headless: false,
            electron: true,
            playwright: true,
        },
    },
    ci: {
        ...common,
        parallel: 3,
        worldParameters: {
            headless: true,
        },
    },
    'test:smoke:browser': {
        ...common,
        worldParameters: {
            headless: true,
        },
    },
};
