module.exports = {
  // your existing config
  extends: ['eslint:recommended', 'next', 'next/core-web-vitals'],
  rules: {
    // your custom rules
  },
  ignoreDuringBuilds: process.env.CI === 'true', // 👈 disables failing on warnings in CI
};
