export function getApplicationInfoConfig() {
  return {
    name: process.env.APP_NAME,
    version: process.env.APP_VERSION,
    env: process.env.NODE_ENV,
  };
}
