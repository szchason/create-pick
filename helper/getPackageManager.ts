const userAgent = process.env.npm_config_user_agent ?? '';
export default () :string => {
  if(/pnpm/.test(userAgent)) {
    return 'pnpm';
  }
  return /yarn/.test(userAgent) ? 'yarn' : 'npm';
};
