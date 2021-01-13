import path from 'path';
import fs from 'fs';
import { promisify } from 'util';
import { exec } from 'child_process';
import yargs from 'yargs';
import nodemon from 'nodemon';

const { argv } = yargs
  .scriptName('spotify-server-run')
  .options({
    docker: {
      type: 'boolean',
      default: false,
      description: 'Use docker image instead of connecting to remote database (currently used in development only)'
    },
    env: {
      alias: 'e',
      choices: ['development', 'production'] as Environment[],
      default: 'production' as Environment,
      description: 'Specify the current environment'
    }
  }).help();

function startNodemon () {
  const nodemonConfigPath = path.resolve(process.cwd(), 'nodemon.json');
  if (!fs.existsSync(nodemonConfigPath)) {
    console.error(new Error(`Please ensure nodemon config exists at '${nodemonConfigPath}'`));
    process.exit(1);
  }

  const config = JSON.parse(fs.readFileSync(nodemonConfigPath).toString()) as nodemon.Settings;
  nodemon(config)
    .on('log', (msg) => {
      console.log(msg.colour);
    })
    .on('quit', () => {
      console.log('✅ Done');
      process.exit();
    });
}

async function main () {
  const { docker, env } = argv;

  // inject current env to NODE_ENV
  process.env.NODE_ENV = env;
  process.env.USE_DOCKER = String(docker);

  if (env === 'development') {
    if (docker) {
      const { stderr, stdout } = await promisify(exec)('docker-compose up -d');

      if (stderr && !stderr.includes('spotifyre_db_1 is up-to-date')) {
        const err = new Error(`Failed to spin up docker image: ${stderr}`);
        console.error(err);
        throw err;
      }

      console.log(stdout);
    }

    startNodemon();
  }
}

main().catch(err => {
  console.error('Error occurred while running the run script', err);
  process.exit(1);
});
