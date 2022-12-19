import getCommand from './getCommand';

function generateReadme(ops :Record<string, any>) :string {
  const { projectName, packageManager } = ops;
  return `
  ## 项目名称：${projectName}
  ### 一、项目启动
  #### 1、开发
  \`\`\`sh
  ${getCommand(packageManager, 'dev')}
  \`\`\`

  #### 2、构建
  \`\`\`sh
  ${getCommand(packageManager, 'dist')}
  \`\`\`

  #### 3、构建压缩

  \`\`\`sh
  ${getCommand(packageManager, 'build')}
  \`\`\`

  ### 二、项目文件说明

  \`\`\`json
  + public  // 公共目录
  - src
  \t+ components // 全局组件目录
  \t+ global-css // 全局scss目录
  \t+ images // images目录
  \t+ store // redux目录
  \t+ index.tsx // 入口文件
  \t+ route.tsx // 路由
  \t+ App.tsx // App组件
  \t+ App.scss // App样式文件
  + .browserslistrc // 兼容文件
  + .eslintignore // eslint忽略文件
  + .eslintrc.js // eslintrc文件
  + .gitignore // git忽略文件
  + .stylelintrc.js // stylelintrc文件
  + config.js // 项目配置文件
  + globals.d.ts // 全局声明文件
  + rcapp.config.js // 项目构建配置文件
  + tsconfig.json // tsconfig
  \`\`\`
  `;
}

export default generateReadme;
