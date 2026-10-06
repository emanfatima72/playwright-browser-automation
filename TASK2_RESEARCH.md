# Task 2 – Browser Engine Research

## 1. Browser Lifecycle

The browser lifecycle describes the complete process of using a browser in Playwright:

1. Launch the browser.
2. Create a browser context.
3. Create a page.
4. Navigate to a URL.
5. Perform browser operations.
6. Close the page, context, and browser.

Properly closing browser resources prevents memory and process leaks.

## 2. Browser Launch Process

Playwright launches a browser using a browser engine such as Chromium, Firefox, or WebKit.

Example:

```typescript
const browser = await chromium.launch();