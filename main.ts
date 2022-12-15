import fs from 'fs';
import path from 'path';
import minimist from 'minimist';
import prompts from 'prompts';
import logSymbols from 'log-symbols';
import { red, green, bold } from 'kolorist';
import { canSkipEmptying, emptyDir } from './helper/empty';
import { directoryExist, projectDirExist } from './helper/hintWords';
import getCommand from './helper/getCommand';
import getPackageManager from './helper/getPackageManager';
import renderTemplate from './helper/renderTemplate';
import renderAppConfig from './helper/renderAppConfig';
import renderEslint from './helper/renderEslint';

interface IResult {
  shouldOverwrite?: boolean;
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
  let result :IResult;
  const rootCwd = process.cwd();
  const appDir = argv._[0];
  const rootDir = appDir ? path.resolve(rootCwd, appDir) : rootCwd;
  try {
    result = await prompts(
      [
        {
          name: 'isCurrentDir',
          type: appDir ? null : 'confirm',
          message: 'Create project under current directory?',
          initial: true,
        },
        {
          name: 'shouldOverwrite',
          type: () => canSkipEmptying(rootDir) ? null : 'confirm',
          message: () => canSkipEmptying(rootDir) ? 'Current directory' : appDir ? projectDirExist(appDir) : directoryExist,
          initial: true,
        },
        {
          name: 'overwriteChecker',
          type: (shouldOverwrite :boolean) => {
          // 不进行重新写操作取消
            if (shouldOverwrite === false) {
              cancelExit(`${red(logSymbols.warning)} ${red('Operation cancelled')}`);
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
          name: 'needsStylelint',
          type: 'toggle',
          message: 'Add StyleLint for Scss code quality?',
          initial: true,
          active: 'Yes',
          inactive: 'No',
        },
      ],
      {
        onCancel: () => {
          cancelExit(`${red(logSymbols.error)} ${red('Operation cancelled')}`);
        },
      },
    );
  } catch (e :unknown) {
    console.log(e);
    process.exit(1);
  }
  const {
    shouldOverwrite,
    isCurrentDir,
    needsTypeScript,
    needsRouter,
    needsStylelint,
    needsEslint,
    needsToolkit,
  } = result;
  const appName = isCurrentDir ? path.basename(rootCwd) : appDir;
  if(shouldOverwrite) {
    emptyDir(rootDir);
  } else if(!fs.existsSync(rootDir)) {
    fs.mkdirSync(rootDir, { recursive: true });
  }
  console.log();
  console.log(`Creating a new React app in ${green(rootDir)}.`);
  console.log();
  process.chdir(rootDir);
  const packageManager = getPackageManager();
  const packageJson = {
    name: appName || 'React app',
    version: '0.0.1',
    description: 'React Project',
  };
  fs.writeFileSync(
    path.join(rootDir, 'package.json'),
    JSON.stringify(packageJson, null, 2),
  );
  const templateRoot = path.resolve(__dirname, 'template');
  const isNeedTs = ts || needsTypeScript;
  const render = function render(templateName, nextDir = '/') {
    const templateDir = path.resolve(templateRoot, templateName);
    renderTemplate(templateDir, `${rootDir}/${nextDir}`);
  };

  const templateSign = isNeedTs ? 'tsx' : 'jsx';

  render('base');
  render('code/default', '/src');
  renderAppConfig(rootDir, { isNeedTs });

  if(needsRouter && needsToolkit) {
    render(`code/${templateSign}-toolkit-router`, '/src');
  }

  if(needsRouter && !needsToolkit) {
    render(`code/${templateSign}-router`, '/src');
  }

  if(!needsRouter && needsToolkit) {
    render(`code/${templateSign}-toolkit`, '/src');
  }

  if(!needsRouter && !needsToolkit) {
    render(`code/${templateSign}`, '/src');
  }

  if(isNeedTs) {
    render('tsconfig');
  }

  if(needsEslint) {
    renderEslint(rootDir, { needsTypescript: isNeedTs });
    render('eslint');
  }

  if(needsStylelint) {
    render('stylelint');
  }

  console.log('\nDone. Now run:\n');
  if (rootDir !== rootCwd) {
    console.log(`${bold(green(`cd ${path.relative(rootCwd, rootDir)}`))}`);
  }
  console.log(`  ${bold(green(getCommand(packageManager, 'install')))}`);
  console.log(`  ${bold(green(getCommand(packageManager, 'dev')))}`);
  console.log();
}

init().catch((e :unknown) => {
  console.error(e);
});
