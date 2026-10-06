import { chromium, firefox, webkit, Browser, BrowserContext, Page } from '@playwright/test';

export class BrowserEngine {
  private browser: Browser | null = null;
  private context: BrowserContext | null = null;
  public page: Page | null = null;

  // Validate URL helper
  private isValidUrl(urlString: string): boolean {
    try {
      const url = new URL(urlString);
      return url.protocol === 'http:' || url.protocol === 'https:';
    } catch {
      return false;
    }
  }

  // 1. Browser Launch wid Error Handling
  async startBrowser(browserType: 'chromium' | 'firefox' | 'webkit' = 'chromium', headless: boolean = false) {
    try {
      console.log(`Starting ${browserType} browser...`);
      if (browserType === 'firefox') {
        this.browser = await firefox.launch({ headless });
      } else if (browserType === 'webkit') {
        this.browser = await webkit.launch({ headless });
      } else {
        this.browser = await chromium.launch({ headless });
      }

      this.context = await this.browser.newContext();
      this.page = await this.context.newPage();
      console.log('Browser launched and page created successfully.');
    } catch (error) {
      console.error(`[Browser Launch Failure]: Unable to start browser. Details:`, error);
      throw error;
    }
  }

  // 2. Navigation wid Invalid URL & Failure Handling
  async navigateTo(url: string): Promise<boolean> {
    if (!this.page) {
      console.error('[Navigation Failure]: No active page found. Launch browser first.');
      return false;
    }

    if (!this.isValidUrl(url)) {
      console.error(`[Invalid URL]: The URL "${url}" is malformed or invalid.`);
      return false;
    }

    try {
      console.log(`Navigating to: ${url}`);
      const response = await this.page.goto(url, { timeout: 10000, waitUntil: 'domcontentloaded' });
      
      if (response && response.ok()) {
        console.log(`Successfully reached ${url} (Status: ${response.status()})`);
        return true;
      } else {
        console.warn(`Reached ${url} with status: ${response?.status()}`);
        return true;
      }
    } catch (error) {
      console.error(`[Navigation Failure]: Could not load ${url}. Details:`, error);
      return false;
    }
  }

  // 3. Browser Shutdown Failure Handling
  async closeBrowser() {
    try {
      if (this.context) {
        await this.context.close();
      }
      if (this.browser) {
        await this.browser.close();
        console.log('Browser closed safely.');
      }
    } catch (error) {
      console.error(`[Browser Shutdown Failure]: Error closing browser. Details:`, error);
    } finally {
      this.browser = null;
      this.context = null;
      this.page = null;
    }
  }
}