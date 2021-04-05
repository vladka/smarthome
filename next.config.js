const fs = require('fs');
const environment = process.env.ENVIRONMENT || 'local';

const loadFirebaseConfig = (env) => {
  if (
    (env === 'dev' || env === 'local') &&
    fs.existsSync('./firebase.dev.config.js')
  )
    return require('./firebase.dev.config');
  else if (env === 'uat' && fs.existsSync('./firebase.uat.config.js'))
    return require('./firebase.uat.config');
  else if (
    env === 'production' &&
    fs.existsSync('./firebase.production.config.js')
  )
    return require('./firebase.production.config');
  else return require('./firebase.config');
};

const { firebaseAdminConfig, firebaseConfig } = loadFirebaseConfig(environment);

const appConfig = {
  serverRuntimeConfig: {
    anySecretServerVariable: 'ok',
    firebaseAdminConfig
    
  },
  publicRuntimeConfig: {
    anyVariableAvailableEverywhere: 'ok',
    firebaseConfig
    
  },
};

module.exports = {
  ...appConfig,
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.graphql$/,
      exclude: /node_modules/,
      use: [options.defaultLoaders.babel, { loader: 'graphql-let/loader' }],
    })

    config.module.rules.push({
      test: /\.graphqls$/,
      exclude: /node_modules/,
      use: ['graphql-let/schema/loader'],
    })

    config.module.rules.push({
      test: /\.ya?ml$/,
      type: 'json',
      use: 'yaml-loader',
    })

    return config
  },
}
