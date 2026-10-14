const { test, expect } = require('@playwright/test');
const registerUserData = require('../../fixtures/registerUser.json');
test.describe('Register User', () => {
    test.beforeEach(async ({ page })=>{
        await page.goto('/');
        await expect(page).toHaveURL('/');
        await page.getByRole('link', { name: ' Signup / Login' }).click();
        await expect(page).toHaveURL('/login');
        await expect(page.getByRole('heading', { name: 'New User Signup!' })).toBeVisible();
    })
    test('should register a new user successfully', async ({ page }) => {
        const email = `user${Date.now()}@example.com`;
        await page.getByPlaceholder('Name').fill('John Doe');
        await page.locator('[data-qa="signup-email"]').fill(email);
        await page.getByRole('button', { name: 'Signup' }).click();
        await expect(page).toHaveURL(/\/signup/);
        await expect(page.getByRole('heading', { name: 'Enter Account Information' })).toBeVisible();
        await page.locator('#id_gender1').check();
        await expect(page.locator('#name')).toHaveValue('John Doe');
        await expect(page.locator('#email')).toHaveValue(email);
        await page.locator('#password').fill(registerUserData.Password);
        await page.locator('#days').selectOption('1');
        await page.locator('#months').selectOption('January');
        await page.locator('#years').selectOption('2000');
        await page.locator('#newsletter').check();
        await page.locator('#optin').check();
        await page.locator('#first_name').fill('John');
        await page.locator('#last_name').fill('Doe');
        await page.locator('#company').fill('Example Inc.');
        await page.locator('#address1').fill('123 Main St');
        await page.locator('#address2').fill('Apt 4B');
        await page.locator('#country').selectOption('United States');
        await page.locator('#state').fill('California');
        await page.locator('#city').fill('Los Angeles');
        await page.locator('#zipcode').fill('90001');
        await page.locator('#mobile_number').fill('+1234567890');
        await page.getByRole('button', { name: 'Create Account' }).click();
        await expect(page.getByRole('heading', { name: 'Account Created!' })).toBeVisible();
        await page.getByRole('link', { name: 'Continue' }).click();
        await expect(page.getByText('Logged in as John Doe' )).toBeVisible();
        await page.getByRole('link', { name: 'Delete Account' }).click();
        await expect(page.getByText('ACCOUNT DELETED!')).toBeVisible();
    })
    test("should not register user with existing email", async ({ page }) => {
      await expect(
        page.getByRole("heading", { name: "New User Signup!" }),
      ).toBeVisible();
      await page
        .getByRole("textbox", { name: "Name" })
        .fill(registerUserData.Name);
      await page
        .locator("form")
        .filter({ hasText: "Signup" })
        .getByPlaceholder("Email Address")
        .fill(process.env.APP_EMAIL);
      await expect(page.getByRole("button", { name: "Signup" })).toBeVisible();
      await page.getByRole("button", { name: "Signup" }).click();
      await expect(
        page.getByText("Email Address already exist!"),
      ).toBeVisible();
    });
})