const userAgent = process.env.npm_config_user_agent ?? '';
export default () => /pnpm/.test(userAgent) ? 'pnpm' : /yarn/.test(userAgent) ? 'yarn' : 'npm';
