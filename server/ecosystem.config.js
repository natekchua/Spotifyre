module.exports = {
  apps: [
    {
      name: 'spotifyre-api',
      script: 'ts-node',
      args: './src/index.ts',
      instances: '1',
      exec_mode: 'cluster',
      env_production: {
        NODE_ENV: 'production'
      }
    }
  ]
};
