module.exports = {
  apps: [
    {
      name: 'spotifyre-api',
      script: 'ts-node',
      args: './src/index.ts',
      instances: '1',
      env_production: {
        NODE_ENV: 'production'
      }
    }
  ]
};
