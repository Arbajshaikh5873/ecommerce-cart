import { test, expect } from "@playwright/test";

test.describe("Cart Functionality", () => {
  test.beforeEach(async ({ page }) => {
    await page.context().clearCookies();
    // Clear localStorage before navigating
    await page.addInitScript(() => {
      Object.defineProperty(window, "localStorage", {
        value: {
          clear: () => {},
          getItem: () => null,
          setItem: () => {},
          removeItem: () => {},
        },
        writable: true,
      });
    });
    await page.goto("http://localhost:5173/");
  });

  test("should require login to add to cart", async ({ page }) => {
    // Wait for products to load
    await page.waitForSelector(".bg-white.rounded-xl");

    // Click first product's "Add to Cart" button
    await page.locator('button:has-text("Add to Cart")').first().click();

    // Should redirect to login
    await expect(page).toHaveURL(/.*login/);
  });

  test("should add product to cart after login", async ({ page }) => {
    // First sign in
    await page.goto("http://localhost:5173/signin");
    await page.fill('input[name="FullName"]', "Test User");
    await page.fill('input[name="email"]', "test@example.com");
    await page.fill('input[name="address"]', "Test Address");
    await page.fill('input[name="Password"]', "password123");
    await page.fill('input[name="confirmPassword"]', "password123");
    await page.fill('input[name="contact"]', "1234567890");
    await page.click('button[type="submit"]');

    // Go back to home
    await page.goto("http://localhost:5173/");

    // Wait for products to load
    await page.waitForSelector(".bg-white.rounded-xl");

    // Click first product's "Add to Cart" button
    await page.locator('button:has-text("Add to Cart")').first().click();

    // Check cart count in navbar
    await expect(page.locator(".absolute.-top-2.-right-2")).toHaveText("1");
  });

  test("should display product in cart", async ({ page }) => {
    // Sign in first
    await page.goto("http://localhost:5173/signin");
    await page.fill('input[name="FullName"]', "Test User");
    await page.fill('input[name="email"]', "test@example.com");
    await page.fill('input[name="address"]', "Test Address");
    await page.fill('input[name="Password"]', "password123");
    await page.fill('input[name="confirmPassword"]', "password123");
    await page.fill('input[name="contact"]', "1234567890");
    await page.click('button[type="submit"]');

    // Go back to home
    await page.goto("http://localhost:5173/");

    // Add product to cart
    await page.waitForSelector(".bg-white.rounded-xl");
    await page.locator('button:has-text("Add to Cart")').first().click();

    // Navigate to cart
    await page.locator('a[href="/cart"]').click();

    // Check if product is in cart
    await expect(page.locator('h1:has-text("Shopping Cart")')).toBeVisible();
    await expect(page.locator(".bg-white.rounded-lg")).toHaveCount(1);
  });

  test("should remove product from cart", async ({ page }) => {
    // Sign in first
    await page.goto("http://localhost:5173/signin");
    await page.fill('input[name="FullName"]', "Test User");
    await page.fill('input[name="email"]', "test@example.com");
    await page.fill('input[name="address"]', "Test Address");
    await page.fill('input[name="Password"]', "password123");
    await page.fill('input[name="confirmPassword"]', "password123");
    await page.fill('input[name="contact"]', "1234567890");
    await page.click('button[type="submit"]');

    // Go back to home
    await page.goto("http://localhost:5173/");

    // Add product to cart
    await page.waitForSelector(".bg-white.rounded-xl");
    await page.locator('button:has-text("Add to Cart")').first().click();

    // Navigate to cart
    await page.locator('a[href="/cart"]').click();

    // Remove product
    await page.locator('button:has-text("Remove")').click();

    // Check empty cart message
    await expect(
      page.locator('p:has-text("Your cart is empty")')
    ).toBeVisible();
  });

  test("should persist cart after page reload", async ({ page }) => {
    // Sign in first
    await page.goto("http://localhost:5173/signin");
    await page.fill('input[name="FullName"]', "Test User");
    await page.fill('input[name="email"]', "test@example.com");
    await page.fill('input[name="address"]', "Test Address");
    await page.fill('input[name="Password"]', "password123");
    await page.fill('input[name="confirmPassword"]', "password123");
    await page.fill('input[name="contact"]', "1234567890");
    await page.click('button[type="submit"]');

    // Go back to home
    await page.goto("http://localhost:5173/");

    // Add product to cart
    await page.waitForSelector(".bg-white.rounded-xl");
    await page.locator('button:has-text("Add to Cart")').first().click();

    // Reload page
    await page.reload();

    // Check cart count persists
    await expect(page.locator(".absolute.-top-2.-right-2")).toHaveText("1");
  });
});
