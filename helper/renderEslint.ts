import path from 'node:path';
import fs from 'fs';
import sortDependencies from './sortDependencies';
import deepMerge from './deepMerge';
import { stringify } from 'javascript-stringify';
import { devDependencies as eslintDeps } from '../package.json' assert { type: 'json' };

function stringifyJS(value) {
  return stringify(value, (val, indent, nextStringify) => {
    if(val === 'path.join(__dirname, "src")') {
      return val.replace(/'/g, '');
    }
    return nextStringify(val);
  }, 2);
}

function createESLintConfig({
  needsTypescript,
}) {
  const pkg = { devDependencies: {} };
  const addDependency = (name) => {
    pkg.devDependencies[name] = eslintDeps[name];
  };

  if(needsTypescript) {
    addDependency('@typescript-eslint/eslint-plugin');
    addDependency('@typescript-eslint/parser');
  }

  const defaultExtend = ['@szchason/eslint-config-react'];
  const defaultExtensions = [ '.js', '.jsx' ];
  const eslintConfig = {
    root: true,
    globals: {
      GLOBAL: true,
    },
    env: {
      browser: true,
    },
    excludedFiles: ['./config.js'],
    extend: needsTypescript ? defaultExtend.concat(['@szchason/eslint-config-typescript']) : defaultExtend,
    settings: {
      'import/resolver': {
        alias: {
          map: [[ '@', 'path.join(__dirname, "src")' ]],
          extensions: needsTypescript
            ? defaultExtensions.concat([ '.tsx', '.ts' ])
            : defaultExtensions,
        },
      },
    },
    rules: {},
  };
  return {
    pkg, eslintConfig,
  };
}

function renderEslint(rootDir, { needsTypescript }) {
  const { pkg, eslintConfig } = createESLintConfig({ needsTypescript });
  const packageJsonPath = path.resolve(rootDir, 'package.json');
  const eslintPath = path.resolve(rootDir, '.eslintrc.js');
  const existingPkg = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  const updatedPkg = sortDependencies(deepMerge(existingPkg, pkg));
  fs.writeFileSync(packageJsonPath, `${JSON.stringify(updatedPkg, null, 2)}\n`, 'utf-8');
  const content = `module.export = ${stringifyJS(eslintConfig)}`;
  const fileTitle = 'const path = require(\'path\');\n\n';
  fs.writeFileSync(eslintPath, fileTitle + content, 'utf-8');
}

export default renderEslint;