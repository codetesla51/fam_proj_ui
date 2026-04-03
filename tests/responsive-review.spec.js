const { test, expect, devices } = require('@playwright/test');

const BASE_URL = 'http://localhost:5173';

// Define test screen sizes
const screenSizes = [
  { name: 'iPhone SE', width: 375, height: 667 },
  { name: 'Samsung Galaxy S20', width: 360, height: 800 },
  { name: 'iPhone 12 Pro', width: 390, height: 844 },
  { name: 'iPad Mini', width: 768, height: 1024 },
  { name: 'iPad Pro', width: 1024, height: 1366 },
  { name: 'Desktop HD', width: 1280, height: 720 },
  { name: 'Desktop Full HD', width: 1920, height: 1080 },
];

test.describe('Responsiveness Review - Login Page', () => {
  for (const size of screenSizes) {
    test(`Login page - ${size.name} (${size.width}x${size.height})`, async ({ page }) => {
      await page.setViewportSize({ width: size.width, height: size.height });
      await page.goto(`${BASE_URL}/login`);
      await page.waitForLoadState('networkidle');

      // Take screenshot
      await page.screenshot({
        path: `screenshots/responsive-login-${size.width}x${size.height}.png`,
        fullPage: true
      });

      // Check critical elements are visible
      const nameInput = page.locator('#login-name');
      const passwordInput = page.locator('#login-password');
      const submitBtn = page.locator('#login-btn');

      await expect(nameInput).toBeVisible();
      await expect(passwordInput).toBeVisible();
      await expect(submitBtn).toBeVisible();

      // Check input field sizes
      const nameBox = await nameInput.boundingBox();
      const passwordBox = await passwordInput.boundingBox();
      const btnBox = await submitBtn.boundingBox();

      // Inputs should be at least 44px height (Apple's recommended touch target)
      expect(nameBox.height).toBeGreaterThanOrEqual(44);
      expect(passwordBox.height).toBeGreaterThanOrEqual(44);
      expect(btnBox.height).toBeGreaterThanOrEqual(44);

      // Check for horizontal overflow
      const body = await page.locator('body').boundingBox();
      const html = await page.locator('html').boundingBox();

      // No overflow
      expect(body.width).toBeLessThanOrEqual(size.width + 1);
      expect(html.width).toBeLessThanOrEqual(size.width + 1);
    });
  }
});

test.describe('Responsiveness Review - Register Page', () => {
  for (const size of screenSizes) {
    test(`Register page - ${size.name} (${size.width}x${size.height})`, async ({ page }) => {
      await page.setViewportSize({ width: size.width, height: size.height });
      await page.goto(`${BASE_URL}/register`);
      await page.waitForLoadState('networkidle');

      // Take screenshot
      await page.screenshot({
        path: `screenshots/responsive-register-${size.width}x${size.height}.png`,
        fullPage: true
      });

      // Check critical elements are visible
      const nameInput = page.locator('#reg-name');
      const passwordInput = page.locator('#reg-password');
      const confirmInput = page.locator('#reg-confirm');
      const amountInput = page.locator('#reg-amount');
      const submitBtn = page.locator('#reg-btn');

      await expect(nameInput).toBeVisible();
      await expect(passwordInput).toBeVisible();
      await expect(confirmInput).toBeVisible();
      await expect(amountInput).toBeVisible();
      await expect(submitBtn).toBeVisible();

      // Check input field sizes
      const nameBox = await nameInput.boundingBox();
      const passwordBox = await passwordInput.boundingBox();
      const btnBox = await submitBtn.boundingBox();

      // Inputs should be at least 44px height
      expect(nameBox.height).toBeGreaterThanOrEqual(44);
      expect(passwordBox.height).toBeGreaterThanOrEqual(44);
      expect(btnBox.height).toBeGreaterThanOrEqual(44);

      // Check for horizontal overflow
      const body = await page.locator('body').boundingBox();
      expect(body.width).toBeLessThanOrEqual(size.width + 1);
    });
  }
});

test.describe('Zoom and Text Size Tests', () => {
  test('Login page - 200% zoom', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(`${BASE_URL}/login`);

    // Simulate 200% zoom by changing zoom level
    await page.evaluate(() => {
      document.body.style.zoom = '2.0';
    });

    await page.waitForTimeout(500);
    await page.screenshot({
      path: 'screenshots/login-zoom-200.png',
      fullPage: true
    });

    // Check inputs still visible and functional
    const nameInput = page.locator('#login-name');
    await expect(nameInput).toBeVisible();
  });

  test('Register page - 200% zoom', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(`${BASE_URL}/register`);

    // Simulate 200% zoom
    await page.evaluate(() => {
      document.body.style.zoom = '2.0';
    });

    await page.waitForTimeout(500);
    await page.screenshot({
      path: 'screenshots/register-zoom-200.png',
      fullPage: true
    });

    const nameInput = page.locator('#reg-name');
    await expect(nameInput).toBeVisible();
  });
});

test.describe('Touch Interaction Tests', () => {
  test('All interactive elements on login page have adequate touch targets', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(`${BASE_URL}/login`);
    await page.waitForLoadState('networkidle');

    // Check all buttons and inputs
    const buttons = await page.locator('button, a[role="button"], input[type="submit"]').all();

    for (const button of buttons) {
      const box = await button.boundingBox();
      if (box) {
        // Apple and Android recommend minimum 44x44px touch targets
        expect(box.height).toBeGreaterThanOrEqual(44);
        expect(box.width).toBeGreaterThanOrEqual(44);
      }
    }
  });

  test('All interactive elements on register page have adequate touch targets', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(`${BASE_URL}/register`);
    await page.waitForLoadState('networkidle');

    const buttons = await page.locator('button, a[role="button"], input[type="submit"]').all();

    for (const button of buttons) {
      const box = await button.boundingBox();
      if (box) {
        expect(box.height).toBeGreaterThanOrEqual(44);
        expect(box.width).toBeGreaterThanOrEqual(44);
      }
    }
  });
});

test.describe('Font Size and Readability', () => {
  test('Login page - text is readable on small screens', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(`${BASE_URL}/login`);

    // Check minimum font sizes
    const inputs = await page.locator('input').all();

    for (const input of inputs) {
      const fontSize = await input.evaluate(el => window.getComputedStyle(el).fontSize);
      const fontSizeNum = parseInt(fontSize);

      // iOS will zoom if font size is less than 16px
      expect(fontSizeNum).toBeGreaterThanOrEqual(16);
    }
  });
});
