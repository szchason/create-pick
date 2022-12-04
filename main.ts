import fs from 'fs';
import path from 'path';
import minimist from 'minimist';
import prompts from 'prompts';
import chalk from 'chalk';
import logSymbols from 'log-symbols';
import { canSkipEmptying, emptyDir } from './helper/empty';

interface IResult {
  overwrite?: boolean;
  isCurrentDir?: boolean;
  needsTypeScript?: boolean;
  needsRouter?: boolean;
  needsToolkit?: boolean;
  needsEslint?: boolean;
  needsStylelint?: boolean;
}

function cancelExit(logText :string) :void {
  console.log();
  console.log(logText);
  console.log();
  process.exit();
}

async function init() :Promise<void> {
  console.log('\nTip: You are creating a new React application\n');
  const argv = minimist(process.argv.slice(2), {
    alias: {
      typescript: ['ts'],
    },
  });
  const { ts } = argv;
  const targetDir = argv._[0]; // 填写的项目名
  let result :IResult;
  try {
    result = await prompts(
      [
        {
          name: 'isCurrentDir',
          type: targetDir ? null : 'confirm',
          message: 'Create project under current directory?',
          initial: true,
        },
        {
          type: (isCurrentDir :boolean) => isCurrentDir ? null : !fs.existsSync(targetDir) || canSkipEmptying(targetDir) ? null : 'confirm',
          name: 'shouldOverwrite',
          initial: true,
          // eslint-disable-next-line no-mixed-operators
          message: () => targetDir && !fs.existsSync(targetDir) || canSkipEmptying(targetDir) ? 'Current directory' : `Target directory ${targetDir.toLowerCase()} is not empty. Remove existing files and continue?`,
        },
        {
          name: 'overwriteChecker',
          type: (shouldOverwrite :boolean) => {
            // 不进行重新写操作取消
            if (shouldOverwrite === false) {
              cancelExit(`${chalk.yellow(logSymbols.warning)} ${chalk.red('Operation cancelled')}`);
            }
            return null;
          },
        },
        {
          name: 'needsTypeScript',
          type: () => ts ? null : 'toggle',
          message: 'Add TypeScript for Application development?',
          initial: true,
          active: 'Yes',
          inactive: 'No',
        },
        {
          name: 'needsRouter',
          type: 'toggle',
          message: 'Add React Router for Application development?',
          initial: true,
          active: 'Yes',
          inactive: 'No',
        },
        {
          name: 'needsToolkit',
          type: 'toggle',
          message: 'Add Toolkit for Application development?',
          initial: true,
          active: 'Yes',
          inactive: 'No',
        },
        {
          name: 'needsEslint',
          type: 'toggle',
          message: 'Add ESLint for code quality?',
          initial: true,
          active: 'Yes',
          inactive: 'No',
        },
        {
          name: 'needsStyleLint',
          type: 'toggle',
          message: 'Add StyleLint for Scss code quality?',
          initial: true,
          active: 'Yes',
          inactive: 'No',
        },
      ],
      {
        onCancel: () => {
          cancelExit(`${chalk.red(logSymbols.error)} ${chalk.red('Operation cancelled')}`);
        },
      },
    );
  } catch (e :unknown) {
    console.log(e);
    process.exit(1);
  }
  const { overwrite, isCurrentDir } = result;
  const root = isCurrentDir ? process.cwd() : path.join(process.cwd(), targetDir.toLowerCase());
  if(overwrite) {
    emptyDir(root);
  } else if(!fs.existsSync(root)) {
    fs.mkdirSync(root, { recursive: true });
  }
  console.log();
  console.log(`Creating a new React app in ${chalk.green(root)}.`);
  console.log();
  process.chdir(root);
  const packageJson = {
    name: targetDir || 'React app',
    version: '0.0.1',
    description: 'React Project',
  };
  fs.writeFileSync(
    path.join(root, 'package.json'),
    JSON.stringify(packageJson, null, 2),
  );
}

init().catch((e :unknown) => {
  console.error(e);
});
