export const config = {
  browser: 'chromium' as 'chromium' | 'firefox' | 'webkit',

  headless: true,

  baseUrl: 'https://chromium.com',

  viewport: {
    width: 1280,
    height: 720,
  },

  timeout: 30000,
};