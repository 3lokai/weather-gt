// tests/a11y.spec.ts
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('home has no a11y violations', async ({ page }) => {
  await page.goto('http://localhost:3000');
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});
