const { test, expect } = require('@playwright/test');
const registerUserData = require('../../fixtures/registerUser.json');
test.describe("Login User", () => {
  test.beforeEach(async ({ page })=>{
    await page.goto("/");
    await expect(page).toHaveURL("/");
    await page.getByRole("link", { name: " Signup / Login" }).click();
    await expect(page).toHaveURL("/login");
    await expect(
      page.getByRole("heading", { name: "Login to your account" }),
    ).toBeVisible();
  })
  test("Login User with correct email and password", async ({ page }) => {
    await page
      .locator("form")
      .filter({ hasText: "Login" })
      .getByPlaceholder("Email Address")
      .fill(registerUserData.Email);
    await page
      .getByRole("textbox", { name: "Password" })
      .fill(registerUserData.LoginPassword);
    await page.getByRole("button", { name: "Login" }).click();
    await expect(page.getByText("Logged in as Sushmitha S")).toBeVisible();
    // Logout User
    await page.getByRole("link", { name: " Logout" }).click();
    await expect(page).toHaveURL("/login");
  });
  test("Login User with incorrect email and password", async ({ page }) => {
    await page
      .locator("form")
      .filter({ hasText: "Login" })
      .getByPlaceholder("Email Address")
      .fill(registerUserData.invalidEmail);
    await page
      .getByRole("textbox", { name: "Password" })
      .fill(registerUserData.invalidPassword);
    await page.getByRole("button", { name: "Login" }).click();
    await expect(page.getByText("Your email or password is incorrect!")).toBeVisible();
  });
  
});
