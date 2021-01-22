import path from 'path';
import fs from 'fs';
import { promisify } from 'util';
import { exec as execCb } from 'child_process';
import yargs from 'yargs';
import nodemon from 'nodemon';

const exec = promisify(execCb);

const { argv } = yargs
  .scriptName('spotify-server-run')
  .options({
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
  const { env } = argv;

  // inject current env to NODE_ENV
  process.env.NODE_ENV = env;
  // flag USE_DOCKER as false by default
  process.env.USE_DOCKER = 'false';

  if (env === 'development') {
    try {
      // detect if docker is running and set USE_DOCKER to true
      const dockerExec = await exec('docker container ps --format "{{.Names}}"');
      if (!dockerExec.stderr && dockerExec.stdout) {
        const names = dockerExec.stdout.split('\n').filter(name => !!name);
        const dockerRunning = names.some(name => /spotifyre-db/g.test(name));
        process.env.USE_DOCKER = String(dockerRunning);
      }
    } catch {
      console.warn('⚠ docker continer hasn\'t been detected');
    } finally {
      startNodemon();
    }
  } else {
    throw new Error(`Unknown environment: '${env}'`);
  }
}

main().catch(err => {
  console.error('Error occurred while running the run script', err);
  process.exit(1);
});
