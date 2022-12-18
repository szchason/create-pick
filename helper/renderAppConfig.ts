import fs from 'node:fs';
import path from 'path';
import { stringify } from 'javascript-stringify';

function stringifyJS(value) :string {
  return stringify(value, null, 2);
}

function renderAppConfig(fullPath, ops :Record<string, any>) :void {
  const { isNeedTs } = ops;
  const appDefaultConfig = {
    serverPort: 9527,
    copyFile: ['./config.js'],
    html: [
      {
        name: 'index',
        title: 'React App',
        entry: `./src/index.${isNeedTs ? 'tsx' : 'jsx'}`,
        template: './public/index.html',
        favicon: './public/favicon.ico',
      },
    ],
  };
  const content = `module.exports = ${stringifyJS(appDefaultConfig)}`;
  fs.writeFileSync(path.resolve(fullPath, 'rcapp.config.js'), content, 'utf-8');
}

export default renderAppConfig;
