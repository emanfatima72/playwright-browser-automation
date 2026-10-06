import { test, expect } from '@playwright/test';
import { BrowserEngine } from '../src/browser';

test.describe('Task 5 - Error Handling Tests', () => {
  let engine: BrowserEngine;

  test.beforeEach(async () => {
    engine = new BrowserEngine();
  });

  test.afterEach(async () => {
    await engine.closeBrowser();
  });

  test('Should open valid URL and launch browser', async () => {
    await engine.startBrowser('chromium', false);
    const success = await engine.navigateTo('https://www.google.com');
    expect(success).toBe(true);
  });

  test('Should gracefully handle invalid URL', async () => {
    await engine.startBrowser('chromium', false);
    const success = await engine.navigateTo('invalid-url');
    expect(success).toBe(false);
  });
});